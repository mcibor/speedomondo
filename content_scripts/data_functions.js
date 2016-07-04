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