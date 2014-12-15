var Myo = require("Myo");
var io  = require('socket.io')(9000);

var play1 = 12345;
var play2 = 678910;

var controller = Myo.create();

register('connect');
register('disconnect');
register('arm_recognized');
register('arm_lost');
register('imu');
register('lock');
register('unlock');
register('fist');
register('wave_out');
io.on('error', function(data) {
	console.log(data);
});



function register(name) {
	controller.on(name, function(data) {
		io.emit(name, data);
	});
}
