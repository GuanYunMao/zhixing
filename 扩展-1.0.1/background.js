chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.windowId) return;
  try {
    await chrome.sidePanel.open({ windowId: tab.windowId });
  } catch (e) {
    console.error('[知行侧栏] 打开失败', e);
  }
});
