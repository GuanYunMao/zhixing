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
  var refreshing = false;
  var failures = 0;
  var generation = 0;
  var probeTimer;
  var runBusy = false;
  var lastAutoAttempt = 0;

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

  function call(cmd, payload, tab = currentTab) {
    return new Promise(function (resolve, reject) {
      if (!tab || !tab.id) { reject(new Error('找不到当前标签页')); return; }
      if (!/^https?:/i.test(tab.url || '')) { reject(new Error('当前标签页不是网页')); return; }
      var id = 'sp' + Date.now().toString(36) + '-' + (++seq);
      try {
        chrome.tabs.sendMessage(tab.id, { source: 'zx-sidepanel', id: id, cmd: cmd, payload: payload }, { frameId: 0 }, function (resp) {
          var err = chrome.runtime.lastError;
          if (err) { reject(new Error('页面脚本未连接（' + err.message + '）')); return; }
          if (!resp) { reject(new Error('页面脚本未响应')); return; }
          if (!resp.ok) { reject(new Error(resp.error || (resp.data && resp.data.error) || '命令失败')); return; }
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
      ['autoContinue', 'examTurn', 'rate', 'saveApi', 'refreshStats'].forEach(function (id) { $(id).disabled = true; });
    }
  }

  function renderStatus(s) {
    lastState = s;
    connected = true;
    failures = 0;
    setConn('已连接', 'pill-ok');
    $('retryConn').hidden = true;
    setText('connHint', s.bridgeVersion ? '' : '请手动覆盖安装本次的 4.2.7 脚本，以启用跨题继续。');
    $('autoContinue').disabled = !s.examTask || runBusy;
    $('autoContinue').checked = !!s.autoContinue;
    $('examTurnRow').hidden = !s.singleQuestion;
    $('examTurn').disabled = !s.singleQuestion || runBusy;
    $('examTurn').checked = !!s.examTurn;
    ['rate', 'saveApi', 'refreshStats'].forEach(function (id) { $(id).disabled = false; });
    if (!s) return;
    setText('state', s.state || '待启动');
    setText('pageTitle', s.title || s.url || '当前页面');
    var kind = s.examPreview ? '考试预览' : (s.examTask ? '逐题考试' : (String(s.url || '').indexOf('/mycourse/') !== -1 ? '课程页' : '网页'));
    setText('pageKind', kind);
    var review = s.review || { busy: false, paused: false, count: 0, total: 0 };
    var main = $('mainBtn');
    if (main) {
      main.disabled = !!review.busy || runBusy || s.ready === false;
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
  }

  async function refreshStatus() {
    if (refreshing || runBusy) return;
    refreshing = true;
    var epoch = generation;
    try {
      var tab = await getActiveTab();
      if (epoch !== generation) return;
      var s = await call('status', null, tab);
      if (epoch !== generation) return;
      if (!s) throw new Error('页面状态为空');
      var wasConnected = connected;
      renderStatus(s);
      if (!wasConnected) refreshStats();
      if (!apiLoaded) loadApi();
      if (s.autoContinue && s.ready && !s.started && !s.paused && !(s.review && s.review.busy) &&
          (!lastAutoAttempt || lastAutoAttempt.documentId !== s.documentId || Date.now() - lastAutoAttempt.time >= 6500)) {
        lastAutoAttempt = { documentId: s.documentId, time: Date.now() };
        try {
          var resumed = await call('resumeExam', { documentId: s.documentId }, tab);
          if (epoch === generation && resumed) renderStatus(resumed);
        } catch (e) {
          if (epoch === generation) setText('connHint', e.message);
        }
      }
    } catch (e) {
      if (epoch !== generation) return;
      connected = false;
      failures += 1;
      setConn(failures >= 4 ? '未连接' : '重连中…', failures >= 4 ? 'pill-bad' : 'pill-warn');
      setButtonsDisabled(true);
      $('retryConn').hidden = false;
      setText('connHint', failures >= 4 ? e.message : '正在等待页面脚本响应。');
    } finally {
      refreshing = false;
      if (epoch !== generation) scheduleProbe();
    }
  }

  function scheduleProbe() {
    clearTimeout(probeTimer);
    probeTimer = setTimeout(refreshStatus, 350);
  }

  function reconnect() {
    generation += 1;
    failures = 0;
    connected = false;
    apiLoaded = false;
    lastAutoAttempt = 0;
    setButtonsDisabled(true);
    setConn('重连中…', 'pill-warn');
    scheduleProbe();
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
    if (!connected) return;
    var epoch = generation;
    try {
      var s = await call('reviewStats');
      if (epoch === generation) renderStats(s);
    } catch (_) {
      if (epoch === generation) setText('statsHint', '暂时读不到核对记录。');
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
    var epoch = generation;
    try {
      var a = await call('apiGet');
      if (epoch === generation) renderApi(a);
    } catch (_) { }
  }

  async function runCommand(cmd, payload) {
    if (!connected || runBusy) return;
    var epoch = generation;
    runBusy = true;
    var btn = $('mainBtn');
    btn.disabled = true;
    $('autoContinue').disabled = true;
    $('examTurn').disabled = true;
    try {
      var s = await call(cmd, payload);
      if (epoch === generation && s && s.state) renderStatus(s);
    } catch (e) {
      if (epoch === generation) setText('connHint', e.message);
    } finally {
      runBusy = false;
      if (connected && epoch === generation) {
        btn.disabled = !!(lastState.review && lastState.review.busy) || lastState.ready === false;
        $('autoContinue').disabled = !lastState.examTask;
        $('autoContinue').checked = !!lastState.autoContinue;
        $('examTurn').disabled = !lastState.singleQuestion;
        $('examTurn').checked = !!lastState.examTurn;
      }
      scheduleProbe();
    }
  }

  function toggleRun() {
    var s = lastState;
    if (s) runCommand('toggle', s.documentId ? { documentId: s.documentId, started: s.started, paused: s.paused } : null);
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
      rb.disabled = !connected || !(lastState && lastState.examPreview);
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
    $('retryConn').addEventListener('click', function () {
      reconnect();
      refreshStatus();
    });
    $('autoContinue').addEventListener('change', function (event) {
      runCommand('setContinue', { documentId: lastState.documentId, enabled: event.target.checked });
    });
    $('examTurn').addEventListener('change', function (event) {
      runCommand('setExamTurn', { documentId: lastState.documentId, enabled: event.target.checked });
    });
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
    chrome.tabs.onActivated.addListener(reconnect);
    chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
      if (tab.active && (!currentTab || tabId === currentTab.id) &&
          (info.status === 'loading' || info.status === 'complete' || info.url)) reconnect();
    });
  }

  async function start() {
    bind();
    setConn('连接中', 'pill-muted');
    await refreshStatus();
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(refreshStatus, 1500);
    if (statsTimer) clearInterval(statsTimer);
    statsTimer = setInterval(function () {
      if (lastState && (lastState.started || (lastState.review && lastState.review.busy))) refreshStats();
    }, 6000);
  }

  start();
})();
