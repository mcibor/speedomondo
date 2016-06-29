//var highcharts_container_svg = null;
var start = null;
var end = null;

function getData() {
  var highchartsContainerSvg = document.getElementsByClassName("highcharts-container")[0];
  var tooltipText = highchartsContainerSvg.getElementsByClassName("highcharts-tooltip")[0].getElementsByTagName("text")[0];
  var data = [];
  tooltipText.childNodes.forEach(function (element) {
    data.push(element.innerHTML);
  }, this);
  return data;
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.newWorkout)

//     sendResponse();
// });

document.onmousedown = function (e) {
  if (e.srcElement.nodeName == "path" || e.srcElement.nodeName == "rect") {
    var data = getData();
    console.log(data);
  }
}

document.onmouseup = function (e) {
  if (e.srcElement.nodeName == "rect") {
    var data = getData();
    console.log(data);
  }
}
