/* 知行侧栏扩展：side panel UI controller */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var seq = 0;
  var currentTab = null;
  var connected = false;
  var lastState = null;
  var lastStats = null;
  var apiLoaded = false;
  var pollTimer = null;
  var statsTimer = null;

  function setConn(text, cls) {
    var el = $('conn');
    if (!el) return;
    el.textContent = text;
    el.className = 'pill ' + (cls || 'pill-muted');
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text == null ? '' : String(text);
  }

  async function getActiveTab() {
    try {
      var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      currentTab = tabs && tabs[0] ? tabs[0] : null;
      return currentTab;
    } catch (_) {
      currentTab = null;
      return null;
    }
  }

  function call(cmd, payload) {
    return new Promise(async function (resolve, reject) {
      var tab = currentTab || await getActiveTab();
      if (!tab || !tab.id) { reject(new Error('找不到当前标签页')); return; }
      if (!/^https?:/i.test(tab.url || '')) { reject(new Error('当前标签页不是网页')); return; }
      var id = 'sp' + Date.now().toString(36) + '-' + (++seq);
      try {
        chrome.tabs.sendMessage(tab.id, { source: 'zx-sidepanel', id: id, cmd: cmd, payload: payload }, function (resp) {
          var err = chrome.runtime.lastError;
          if (err) { reject(new Error('页面脚本未连接（' + err.message + '）')); return; }
          if (!resp) { reject(new Error('页面脚本未响应')); return; }
          if (!resp.ok) { reject(new Error(resp.error || '命令失败')); return; }
          resolve(resp.data);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  function setButtonsDisabled(disabled) {
    var main = $('mainBtn'), review = $('reviewBtn');
    if (disabled) {
      if (main) main.disabled = true;
      if (review) review.disabled = true;
    }
  }

  function renderStatus(s) {
    lastState = s;
    connected = true;
    setConn('已连接', 'pill-ok');
    if (!s) return;
    setText('state', s.state || '待启动');
    setText('pageTitle', s.title || s.url || '当前页面');
    var kind = s.examPreview ? '考试预览' : (String(s.url || '').indexOf('/mycourse/') !== -1 ? '课程页' : '网页');
    setText('pageKind', kind);
    var review = s.review || { busy: false, paused: false, count: 0, total: 0 };
    var main = $('mainBtn');
    if (main) {
      main.disabled = !!review.busy;
      if (review.busy) main.textContent = '核对运行中';
      else if (s.paused) main.textContent = '▶ 继续当前任务';
      else if (s.started) main.textContent = 'Ⅱ 暂停当前任务';
      else main.textContent = '▶ 开始当前任务';
    }
    var rb = $('reviewBtn');
    if (rb) {
      rb.disabled = !s.examPreview;
      rb.textContent = review.busy ? '■ 停止核对' : '◎ 只读核对整卷';
    }
    var total = Number(review.total || 0);
    var count = Number(review.count || 0);
    var bar = $('bar');
    if (bar) bar.style.width = total ? Math.max(0, Math.min(100, count / total * 100)) + '%' : '0%';
    setText('progressText', total ? (count + ' / ' + total + ' 题') : '核对尚未开始');
    setText('reviewBadge', review.busy ? (review.paused ? '核对已暂停' : '核对进行中') : '');
    setText('mediaLine', s.media || '当前页面未检测到视频/音频');
    var rate = $('rate');
    if (rate && s.rate) { try { if (rate.value !== String(s.rate)) rate.value = String(s.rate); } catch (_) { } }
    var log = $('log');
    if (log) log.textContent = s.log || '暂无日志';
    var dot = $('logDot');
    if (dot) dot.className = 'dot' + (s.started && !s.paused ? ' live' : '');
    if (s.started) {
      var mc = $('mainBtn');
      if (mc && !review.busy && !s.paused) mc.disabled = false;
    }
  }

  async function refreshStatus() {
    try {
      await getActiveTab();
      var s = await call('status');
      renderStatus(s);
      if (!apiLoaded) loadApi();
    } catch (e) {
      connected = false;
      setConn('未连接', 'pill-bad');
      setButtonsDisabled(true);
      setText('state', '无法连接');
      setText('pageTitle', e && e.message ? e.message : String(e));
      setText('pageKind', '—');
      var main = $('mainBtn');
      if (main) main.textContent = '▶ 开始当前任务';
      var rb = $('reviewBtn');
      if (rb) rb.disabled = true;
      setText('statsHint', '请确认已安装 4.2.7 用户脚本，并刷新学习通页面。');
    }
  }

  function renderStats(s) {
    lastStats = s || {};
    setText('mSame', s && s.same || 0);
    setText('mDiff', s && s.different || 0);
    setText('mPending', s && s.pending || 0);
    setText('mUnanswered', s && s.unanswered || 0);
    if (!s || !s.total) setText('statsHint', '核对后这里会显示统计。');
    else setText('statsHint', '当前试卷共 ' + s.total + ' 道题，按题号保留最新记录。');
  }

  async function refreshStats() {
    try {
      var s = await call('reviewStats');
      renderStats(s);
    } catch (_) {
      setText('statsHint', '暂时读不到核对记录。');
    }
  }

  function renderApi(a) {
    apiLoaded = true;
    if (!a) return;
    var base = $('baseUrl'), model = $('model'), auth = $('authStyle'), vision = $('vision');
    try { if (base && !base.value) base.value = a.baseUrl || ''; } catch (_) { }
    try { if (model && !model.value) model.value = a.model || ''; } catch (_) { }
    try { if (auth && a.authStyle) auth.value = a.authStyle; } catch (_) { }
    try { if (vision) vision.checked = a.vision !== false; } catch (_) { }
    var st = $('apiState');
    if (st) {
      st.textContent = a.hasKey ? '已配置' : '未配置';
      st.className = 'pill ' + (a.hasKey ? 'pill-ok' : 'pill-warn');
    }
  }

  async function loadApi() {
    try {
      var a = await call('apiGet');
      renderApi(a);
    } catch (_) { }
  }

  async function toggleRun() {
    var btn = $('mainBtn');
    if (btn) btn.disabled = true;
    try {
      await call('toggle');
      await refreshStatus();
    } catch (e) {
      setText('pageTitle', e.message || String(e));
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  async function reviewAction() {
    var rb = $('reviewBtn');
    if (!rb) return;
    var busy = lastState && lastState.review && lastState.review.busy;
    rb.disabled = true;
    try {
      await call(busy ? 'reviewStop' : 'reviewStart');
      await refreshStatus();
      setTimeout(refreshStats, 500);
    } catch (e) {
      setText('statsHint', e.message || String(e));
    } finally {
      rb.disabled = !(lastState && lastState.examPreview);
    }
  }

  async function saveApi() {
    var payload = {
      baseUrl: String(($('baseUrl') || {}).value || '').trim(),
      apiKey: String(($('apiKey') || {}).value || '').trim(),
      model: String(($('model') || {}).value || '').trim(),
      authStyle: String(($('authStyle') || {}).value || 'bearer'),
      vision: !!($('vision') && $('vision').checked)
    };
    if (!payload.baseUrl) { setText('apiMsg', '先填 API 地址。'); return; }
    if (!payload.model) { setText('apiMsg', '模型名不能为空。'); return; }
    setText('apiMsg', '正在保存并测试…');
    try {
      var a = await call('apiSet', payload);
      renderApi(a);
      var key = $('apiKey'); if (key) key.value = '';
      setText('apiMsg', '已保存。页面会异步测试连接，看日志。');
      await refreshStatus();
    } catch (e) {
      setText('apiMsg', e.message || String(e));
    }
  }

  function bind() {
    var main = $('mainBtn');
    if (main) main.addEventListener('click', toggleRun);
    var rb = $('reviewBtn');
    if (rb) rb.addEventListener('click', reviewAction);
    var rs = $('refreshStats');
    if (rs) rs.addEventListener('click', refreshStats);
    var rate = $('rate');
    if (rate) rate.addEventListener('change', async function () {
      try { await call('setRate', { rate: rate.value }); } catch (_) { }
    });
    var save = $('saveApi');
    if (save) save.addEventListener('click', saveApi);
    var show = $('showKey');
    if (show) show.addEventListener('click', function () {
      var k = $('apiKey');
      if (!k) return;
      var text = k.type === 'password';
      k.type = text ? 'text' : 'password';
      show.textContent = text ? '隐藏' : '显示';
    });
    chrome.tabs.onActivated.addListener(function () {
      apiLoaded = false;
      refreshStatus();
      refreshStats();
    });
    chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
      if (info.status === 'complete' && tab.active) {
        apiLoaded = false;
        refreshStatus();
      }
    });
  }

  async function start() {
    bind();
    setConn('连接中', 'pill-muted');
    await refreshStatus();
    try { renderStats(await call('reviewStats')); } catch (_) { }
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(refreshStatus, 1500);
    if (statsTimer) clearInterval(statsTimer);
    statsTimer = setInterval(function () {
      if (lastState && (lastState.started || (lastState.review && lastState.review.busy))) refreshStats();
    }, 6000);
  }

  start();
})();
