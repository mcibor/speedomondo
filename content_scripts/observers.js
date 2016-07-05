/// </// <reference path="data_functions.js" />

// function getSvg(){
//   return document.getElementsByClassName("highcharts-container")[0].firstChild;
// }
function getAnalysisNavtab() {
  return document.getElementsByClassName("nav")[0].getElementsByTagName("li")[0];
}

var svgObserver = new MutationObserver(function (mutations) {
  console.log({ svg: mutations });
});

var navtabObserver = new MutationObserver(function (mutations) {
  console.log({ tab: mutations });
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