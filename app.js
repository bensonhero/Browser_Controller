
const express = require('express');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, { wsEngine: 'ws' });

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
// app.use( express.static(__dirname + '/client'));

var devices = {};
var gamesocket;
io.sockets.on('connection', function(socket){
	console.log('socket connection');

	socket.on('uncaughtException', function (exception) {
	  // handle or ignore error
	  console.log("error");
	});

	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});

	socket.on('hello', (data) =>{
		console.log(data);
		devices[data.reason] = socket;
	});

	socket.on('game', (data) =>{
		gamesocket = socket;
	});

	socket.on('adduser', (data) =>{
		console.log(data);
		if(gamesocket != null){
			gamesocket.emit('adduser', data);
		}else{
			console.log('game not exist');
		}
	});

	socket.on('command', (data) => {
		console.log(data);
		if(gamesocket != null){
			gamesocket.emit('command', data);
		}else{
			console.log('game not exist');
		}
	});

	socket.on('movement', (data) => {
		console.log(data);
		if(gamesocket != null){
			gamesocket.emit('movement', data);
		}else{
			console.log('game not exist');
		}
	});
});

serv.listen(2000,() => {console.log("browser controller server program started");
});

