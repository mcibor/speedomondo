/// <reference path="data_functions.js" />
/// <reference path="events_listeners.js" />

function getAnalysisNavtab() {
  return document.getElementsByClassName("nav")[0].getElementsByTagName("li")[0];
}

var svgObserver = new MutationObserver(function (mutations) {
  //console.log({ svg: mutations });
  var button = null;
  for (var i = 0; i < mutations[0].addedNodes.length; i++) {
    var element = mutations[0].addedNodes[i];
    var classAtt = element.attributes["class"];
    if (classAtt && classAtt.value === "highcharts-button") {
      button = element;
      break;
    }
  }

  if (button === null)
    return;

  button.addEventListener("click", function (e) {
    hideData();
  });
});

var navtabObserver = new MutationObserver(function (mutations) {
  //console.log({ tab: mutations });
  var classAtt = mutations[0].target.attributes["class"];
  if(classAtt){
    if(/active/.test(classAtt.value)){
      addListeners();
    } else {
      removeListeners();
    }
  }
});

function initObservers(svg, navtab) {
  var svgObserverConfig = { childList: true };
  var navtabObserverConfig = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["class"]
  }

  svgObserver.observe(svg, svgObserverConfig);
  navtabObserver.observe(navtab || getAnalysisNavtab(), navtabObserverConfig);
}

function disconnectObservers() {
  svgObserver.disconnect();
  navtabObserver.disconnect();
}