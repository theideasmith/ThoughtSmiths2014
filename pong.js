var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){window.setTimeout(callback,1000/60)};

var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');


var render = function() {
 context.fillStyle = "#69D2E7";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

function Paddle(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
};

Paddle.prototype.render = function(){
	context.fillStyle = "#0000FF";
	context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
	this.paddle = new Paddle(175, 580, 50, 10);
};

function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10);
};

Player.prototype.render = function(){
	this.paddle.render();
};

Computer.prototype.render = function(){
	this.paddle.render;
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
};

var update = function() {
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);



var step = function(){
	update();
	render();
	animate(step);
};

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};




// Change Philip Hue Color
var changeHueColor = function(ip, lightNumber, sat, bri, hue) {
  var formData = new FormData();
  formData.append("on", true);
  formData.append("sat", sat);
  formData.append("bri", bri);
  formData.append("hue", hue);

  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://" + ip + "/api/newdeveloper/lights/" + lightNumber + "/state");
  xhr.send(formData);
};

// Change Philip Hue Color
var changeHueColor = function(ip, lightNumber, sat, bri, hue) {
  var formData = new FormData();
  var params = "sat=" + sat + "&bri=" + bri + "&hue=" + hue;
  formData.append("on", true);
  formData.append("sat", sat);
  formData.append("bri", bri);
  formData.append("hue", hue);

  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://" + ip + "/api/newdeveloper/lights/" + lightNumber + "/state", true);
  xhr.send(params);
};

// Change Philip Hue Color
var changeHueColor = function(ip, lightNumber, sat, bri, hue) {
  var formData = new FormData();
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://" + ip + "/api/newdeveloper/lights/" + lightNumber + "/state", true);
  xhr.send(JSON.stringify({on: true, sat: sat, bri : bri, hue :hue }));
};
