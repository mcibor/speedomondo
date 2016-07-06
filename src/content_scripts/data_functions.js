// Data from endomondo tooltip: [duration,distance,speed,altitude]

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
  var speed = document.getElementById("speed");
  if (speed)
    speed.parentNode.removeChild(speed);
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

function calculateSpeed(start, end) {
  var tmp = start[0].split(" ");
  var startTime = tmp[tmp.length - 1];
  startTime = convertHHMMSStoSeconds(startTime);
  tmp = end[0].split(" ");
  var endTime = tmp[tmp.length - 1];
  endTime = convertHHMMSStoSeconds(endTime);
  var totalTime = Math.abs(endTime - startTime);

  tmp = start[1].split(" ");
  var startDist = tmp[tmp.length - 2];
  startDist = parseFloat(startDist);
  tmp = end[1].split(" ");
  var endDist = tmp[tmp.length - 2];
  endDist = parseFloat(endDist);
  var totalDist = Math.abs(endDist - startDist);

  var avgspeed = totalDist / totalTime * 3600;
  return { avgspeed: avgspeed, duration: totalTime, distance: totalDist };
}