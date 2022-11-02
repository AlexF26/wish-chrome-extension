chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, object) {
  console.log(changeInfo);
});
