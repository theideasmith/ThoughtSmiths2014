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
register('fist');

io.on('error', function(data) {
	console.log(data);
});


io.on('connect', function(socket) {
	
})


function register(name) {
	controller.on(name, function(data) {
		io.emit(name, data);
	});
}