function sendMsg(tabId, url) {
  var msg = {}
  if (config.patt.workout.test(url))
    msg.request = config.request.newWorkout;
  else if (config.patt.home.test(url))
    msg.request = config.request.home;

  if (msg.request) {
    chrome.tabs.sendMessage(tabId, msg);
  }
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url)
    sendMsg(tabId, changeInfo.url);
});

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === config.port.name);
  port.onMessage.addListener(function (msg) {
    if (msg.msg === config.request.checkUrl) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var msg = {
          response: config.patt.workout.test(tabs[0].url) ?
            config.response.workout :
            config.response.home
        }
        port.postMessage(msg);
      });
    }
  });
});
