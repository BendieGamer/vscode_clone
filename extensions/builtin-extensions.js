// Built-in extensions used by this clone.
// Note: these are separate JS modules (not inlined inside vscode.html).
(function(global){
  'use strict';

  var E = global.GCE_Extensions;
  if(!E) throw new Error('GCE_Extensions.createExt not found. Load extensions/core.js first.');

  // Minimal set. Keep activation logic inside functions so it can call host globals.
  global.GCE_BUILTIN_EXTENSIONS = {
    'theme-vscode':E.createExt({
      id:'theme-vscode',
      name:'Dark+ (Default)',
      desc:'The classic VS Code dark theme',
      cat:'Themes',
      icon:'🎨',
      enabled:true,
      activate:function(){ if(global.changeTheme) global.changeTheme('vsc'); },
      deactivate:function(){ if(global.changeTheme) global.changeTheme('vsc'); }
    }),

    'keymap-vim':E.createExt({
      id:'keymap-vim',
      name:'Vim',
      desc:'Full Vim modal editing.',
      cat:'Keymaps',
      icon:'⌨️',
      enabled:false,
      activate:function(){
        if(!global.loadScript) return;
        global.loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/keymap/vim.min.js',function(){
          if(global.cm) global.cm.setOption('keyMap','vim');
          if(global.settings) {global.settings.keyMap='vim';}
          if(global.$) {
            var el=global.$('sb-ext-mode');
            if(el) el.style.display='flex';
            var kb=global.$('sb-keymap');
            if(kb) kb.textContent='VIM';
          }
          if(global.saveSession) global.saveSession();
        });
      },
      deactivate:function(){
        if(global.cm) global.cm.setOption('keyMap','default');
        if(global.settings) global.settings.keyMap='default';
        if(global.$){
          var el=global.$('sb-ext-mode');
          if(el) el.style.display='none';
        }
        if(global.saveSession) global.saveSession();
      }
    }),

    'word-wrap':E.createExt({
      id:'word-wrap',
      name:'Word Wrap',
      desc:'Toggle soft line wrapping. Shortcut: Alt+Z',
      cat:'Features',
      icon:'↵',
      enabled:false,
      activate:function(){
        if(global.settings){global.settings.wordWrap=true;}
        if(global.cm) global.cm.setOption('lineWrapping',true);
        if(global.saveSession) global.saveSession();
      },
      deactivate:function(){
        if(global.settings){global.settings.wordWrap=false;}
        if(global.cm) global.cm.setOption('lineWrapping',false);
        if(global.saveSession) global.saveSession();
      }
    }),

    'prettier':E.createExt({
      id:'prettier',
      name:'Prettier — Code Formatter',
      desc:'Client-side formatter using Prettier standalone',
      cat:'Features',
      icon:'✨',
      enabled:false,
      activate:function(){
        if(!global.loadScript) return;
        if(global.settings) global.settings.prettier=true;
        global.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prettier/2.8.8/standalone.js',function(){
          global.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prettier/2.8.8/plugins/babel.js',function(){
            global.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prettier/2.8.8/plugins/postcss.js',function(){
              global.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prettier/2.8.8/plugins/html.js',function(){
                global.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prettier/2.8.8/plugins/markdown.js',function(){
                  if(global.setSt) global.setSt('Prettier ready');
                });
              });
            });
          });
        });
      },
      deactivate:function(){ if(global.settings) global.settings.prettier=false; }
    })
  };
})(window);

