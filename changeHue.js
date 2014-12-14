// Change Philip Hue Color
var changeHueColor = function(ip, lightNumber, sat, bri, hue) {
  var formData = new FormData();
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://" + ip + "/api/newdeveloper/lights/" + lightNumber + "/state", true);
  xhr.send(JSON.stringify({on: true, sat: sat, bri : bri, hue :hue }));
};