// Claude API CORS proxy — run with: node proxy.js
// Listens on http://localhost:3001 and forwards /claude to api.anthropic.com
const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3001;
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key, anthropic-version',
};

http.createServer(function (req, res) {
  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/claude') {
    res.writeHead(404, CORS_HEADERS);
    res.end('Not found');
    return;
  }

  var body = [];
  req.on('data', function (chunk) { body.push(chunk); });
  req.on('end', function () {
    var opts = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': req.headers['x-api-key'] || '',
        'anthropic-version': req.headers['anthropic-version'] || '2023-06-01',
      },
    };

    var proxy = https.request(opts, function (apiRes) {
      var headers = Object.assign({}, CORS_HEADERS, {
        'Content-Type': apiRes.headers['content-type'] || 'application/json',
      });
      res.writeHead(apiRes.statusCode, headers);
      apiRes.pipe(res);
    });

    proxy.on('error', function (err) {
      res.writeHead(502, CORS_HEADERS);
      res.end(JSON.stringify({ error: err.message }));
    });

    proxy.write(Buffer.concat(body));
    proxy.end();
  });
}).listen(PORT, '0.0.0.0', function () {
  console.log('Claude proxy listening on http://localhost:' + PORT + '/claude');
  console.log('Press Ctrl+C to stop.');
});
