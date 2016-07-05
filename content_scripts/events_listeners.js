/// <reference path="observers.js" />

var startData = null;
var mousemoved = false;
function mouseDownListener(e) {
  mousemoved = false;
  var svg = e.path.find(function (e) { return e.nodeName == "svg"; }); 
  if (svg !== undefined) {
    startData = getData();
    initObservers(svg);
  }
}

function mouseMoveListener(e) {
  if (e.buttons > 0 && e.path.find(function (e) { return e.nodeName == "svg"; })) {
    mousemoved = true;
  }
}

function mouseUpListener(e) {
  if (mousemoved && e.path.find(function (e) { return e.nodeName == "svg"; })) {
    mousemoved = false;
    if (startData) {
      var data = calculateSpeed(startData, getData());
      showData(data.avgspeed, data.duration, data.distance);
    }
  }
}

function addListeners() {
  document.addEventListener("mouseup", mouseUpListener);
  document.addEventListener("mousedown", mouseDownListener);
  document.addEventListener("mousemove", mouseMoveListener);
}

function removeListeners() {
  document.removeEventListener("mouseup", mouseUpListener);
  document.removeEventListener("mousedown", mouseDownListener);
  document.removeEventListener("mousemove", mouseMoveListener);
}

function windowResizeListener(e) {
  var speed = document.getElementById("speed");
  if (speed) {
    var charts = document.getElementsByClassName("highcharts-container")[0];
    var coords = getCoords(charts);
    speed.style.top = coords.top + "px";
    speed.style.left = (coords.left + charts.clientWidth) + "px";
  }
}