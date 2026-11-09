/* 知行侧栏扩展：标记页面、隐藏网页内面板、桥接 side panel 与用户脚本。 */
(function () {
  'use strict';

  function mark() {
    try {
      if (document.documentElement) document.documentElement.setAttribute('data-zx-ext', '1');
    } catch (_) { }
  }
  mark();
  if (!document.documentElement) {
    document.addEventListener('DOMContentLoaded', mark, { once: true });
  }

  var hideCss = [
    'html[data-zx-ext="1"] body #ne-21box.zx421-sidebar,',
    'html[data-zx-ext="1"] body #ne-21box,',
    'html[data-zx-ext="1"] body #ne21Ball,',
    'html[data-zx-ext="1"] body #zx421Divider {',
    '  display:none !important;',
    '  visibility:hidden !important;',
    '}'
  ].join('\n');

  function ensureStyle() {
    try {
      mark();
      if (document.getElementById('zx-ext-hide-panel')) return;
      var style = document.createElement('style');
      style.id = 'zx-ext-hide-panel';
      style.textContent = hideCss;
      (document.head || document.documentElement).appendChild(style);
    } catch (_) { }
  }
  ensureStyle();
  setInterval(ensureStyle, 1500);

  var pending = new Map();
  var seq = 0;

  function makeId() {
    seq += 1;
    return 'zx' + Date.now().toString(36) + '-' + seq;
  }

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (!msg || msg.source !== 'zx-sidepanel') return;
    var id = msg.id || makeId();
    var timer = setTimeout(function () {
      if (!pending.has(id)) return;
      pending.delete(id);
      try { sendResponse({ ok: false, error: '页面脚本没有响应。请确认已安装 4.2.7 用户脚本并刷新页面。' }); } catch (_) { }
    }, 3500);
    pending.set(id, function (result) {
      clearTimeout(timer);
      pending.delete(id);
      try { sendResponse(result); } catch (_) { }
    });
    try {
      window.postMessage({ __zxExt: true, source: 'zx-sidepanel', id: id, cmd: msg.cmd, payload: msg.payload }, '*');
    } catch (e) {
      clearTimeout(timer);
      pending.delete(id);
      try { sendResponse({ ok: false, error: '无法向页面脚本发送消息' }); } catch (_) { }
    }
    return true;
  });

  window.addEventListener('message', function (ev) {
    var d = ev.data;
    if (!d || d.__zxExt !== true || d.source !== 'zx-page') return;
    var done = pending.get(d.id);
    if (done) done(d);
  });
})();
