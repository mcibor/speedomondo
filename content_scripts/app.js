chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.request) {
      switch (request.request) {
        case config.request.newWorkout:
          addListeners();
          hideData();
          break;
        case config.request.home:
          removeListeners();
          hideData();
          break;
      }
    }
  }
)

var port = chrome.runtime.connect(config.port);
port.postMessage({ msg: config.request.checkUrl });
port.onMessage.addListener(function (msg) {
  if (msg.response) {
    switch (msg.response) {
      case config.response.workout:
        addListeners();
        break;
      case config.response.home:
        removeListeners();
        break;
    }
  }
});

window.addEventListener("resize", windowResizeListener, true);