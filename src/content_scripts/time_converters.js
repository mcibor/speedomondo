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

  return timeString + minutes + "m:" + seconds + "s";
}