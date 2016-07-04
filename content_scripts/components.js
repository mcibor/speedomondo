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