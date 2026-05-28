// Core helpers for GCE extensions (client-side only)
// Loaded by vscode.html
(function(global){
  'use strict';

  function createExt({id, name, desc, cat, icon, enabled, activate, deactivate}){
    return {
      id:id,
      name:name,
      desc:desc,
      cat:cat,
      icon:icon,
      enabled:!!enabled,
      activate:activate||function(){},
      deactivate:deactivate||function(){},
    };
  }

  // Expose factory
  global.GCE_Extensions = global.GCE_Extensions || {};
  global.GCE_Extensions.createExt = createExt;
})(window);

