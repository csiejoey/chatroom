var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const express = require('express');

var usernames = {};
var rooms = ['room1', 'room2'];

// var fs = require('fs');
var emoji = '<img src="diss.png">';
var emoji2 = '<img src="smiley1.png">';
app.use(express.static('image'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('addroom1user', function(username) {
		socket.username = username;
		socket.room = 'room1';
		usernames[username] = username;
		socket.join('room1');
		socket.emit('updaterooms', rooms, 'room1');
	});

	socket.on('addroom2user', function(username) {
		socket.username = username;
		socket.room = 'room2';
		usernames[username] = username;
		socket.join('room2');
		socket.emit('updaterooms', rooms, 'room2');
	});

	socket.on('sendchat', function(data){
		if (data === 'B-)') {
			data = '<img src="glasses.gif">';
		} else if (data === '=))') {
			data = '<img src="lol.gif">';
		} else if (data === ':-h') {
			data = '<img src="bye.gif">';
		} else if (data === ':-S') {
			data = '<img src="worry.gif">';
		} else if (data === '=D>') {
			data = '<img src="applause.gif">';
		} 
		else if (data === 'https://www.youtube.com/watch?v=YnS0ROlloxA') {
			data = '<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/YnS0ROlloxA?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>';
		}
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('send pic', function(){
		io.sockets.in(socket.room).emit('updatechat', socket.username, emoji)
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
