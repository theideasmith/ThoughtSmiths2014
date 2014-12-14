var Myo = require("Myo");
var io  = require('socket.io')(9000);
var controller = Myo.create();

register('connect');
register('disconnect');
register('arm_recognized');
register('arm_lost');
register('imu');
register('lock');
register('unlock');

io.on('error', function(data) {
	console.log(data);
});


io.on('connect', function(socket) {
	socket.on('vibrate', function() {
		controller.vibrate();
		console.log('test');
	});
})


function register(name) {
	controller.on(name, function(data) {
		io.emit(name, data);
	});
}