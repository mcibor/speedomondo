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

  document.getElementById("speedp").innerHTML = "Average speed: " + avgspeed.toFixed(1) + " km/h";
  document.getElementById("timep").innerHTML = "Time: " + convertSecondsToHHMMSS(time);
  document.getElementById("distp").innerHTML = "Distance: " + distance.toFixed(2) + " km";
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

function convertHHMMSStoSeconds(timeString) {
  var tmp = timeString.split(":").reverse();
  var time = parseInt(tmp[0].match(/\d/g).join(""));
  time += parseInt(tmp[1].match(/\d/g).join("")) * 60;
  if (tmp.length == 3)
    time += parseInt(tmp[2].match(/\d/g).join("")) * 3600;

  return time;
}

function convertSecondsToHHMMSS(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor((time - (hours * 3600)) / 60);
  var seconds = time - (hours * 3600) - (minutes * 60);

  if (minutes < 10 && hours > 0) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  var timeString = "";
  if (hours > 0)
    timeString += hours + "h:";

  return timeString + minutes + "m:" + seconds+"s";
}

function calculateSpeed(start, end) {
  var startTime = start[0].split(" ")[1];
  startTime = convertHHMMSStoSeconds(startTime);
  var endTime = end[0].split(" ")[1];
  endTime = convertHHMMSStoSeconds(endTime);
  var totalTime = Math.abs(endTime - startTime);

  var startDist = start[1].split(" ")[1];
  startDist = parseFloat(startDist);
  var endDist = end[1].split(" ")[1];
  endDist = parseFloat(endDist);
  var totalDist = Math.abs(endDist - startDist);

  var avgspeed = totalDist / totalTime * 3600;
  return { avgspeed: avgspeed, duration: totalTime, distance: totalDist };
}

// Data from endomondo tooltip: [duration,distance,speed,altitude]
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
    var data = calculateSpeed(startData, getData());
    showData(data.avgspeed, data.duration, data.distance);

  }
}
