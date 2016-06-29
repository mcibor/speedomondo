function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

function createElement(tag, id) {
  var newElement = document.createElement(tag);
  if (id)
    newElement.id = id;
  return newElement;
}

function createSpeed() {
  var highchartsDiv = document.getElementsByClassName("highcharts-container")[0];
  var coords = getCoords(highchartsDiv);
  var speed = document.createElement("div");
  speed.id = "speed";
  speed.style = "position: absolute; top: " + coords.top + "px; left: " + (coords.left + highchartsDiv.clientWidth) +
    "px; border-left: 6px solid green;";
  speed.insertAdjacentElement("beforeEnd", createElement("div", "speedp"));
  speed.insertAdjacentElement("beforeEnd", createElement("div", "timep"));
  speed.insertAdjacentElement("beforeEnd", createElement("div", "distp"));
  return speed;
}

function showData(avgspeed, time, distance) {
  var speed = document.getElementById("speed");
  if (speed == null) {
    document.body.insertAdjacentElement("afterBegin", createSpeed());
  }

  document.getElementById("speedp").innerHTML = "Speed: " + avgspeed;
  document.getElementById("timep").innerHTML = "Time: " + time;
  document.getElementById("distp").innerHTML = "Distance: " + distance;
}

function hideData() {

}

function getData() {
  var highchartsContainerSvg = document.getElementsByClassName("highcharts-container")[0];
  var tooltipText = highchartsContainerSvg.getElementsByClassName("highcharts-tooltip")[0].getElementsByTagName("text")[0];
  var data = [];
  tooltipText.childNodes.forEach(function (element) {
    data.push(element.innerHTML);
  }, this);
  return data;
}

// Data from endomondo toopltip: [duration,distance,speed,altitude]
var startData = null;
var mousemoved = false;
document.onmousedown = function (e) {
  mousemoved = false;
  if (e.path.find(function (e) { return e.nodeName == "svg" })) {
    startData = getData();
  }
}
document.onmousemove = function (e) {
  mousemoved = true;
}

document.onmouseup = function (e) {
  if (e.path.find(function (e) { return e.nodeName == "svg" }) && mousemoved) {
    mousemoved = false;
    var endData = getData();
    showData(startData[2] + " " + endData[2], startData[0] + " " + endData[0], startData[1] + " " + endData[1]);
    
  }
}
