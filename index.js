var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const express = require('express');

var usernames = {};
var rooms = ['room1', 'room2'];

// var fs = require('fs');
app.use(express.static('image'));
app.use(express.static('css'));
app.use(express.static('js'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/login.html');
});

app.get('/friends', function(req, res) {
	res.sendFile(__dirname + '/friends.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('addroom1user', function(username) {
		socket.username = username;
		socket.room = 'room1';
		usernames[username] = username;
		socket.join('room1');
	});

	socket.on('addroom2user', function(username) {
		socket.username = username;
		socket.room = 'room2';
		usernames[username] = username;
		socket.join('room2');
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
		} else if (data.indexOf('http') > -1) {
			data = '<a href="' + data + '">' + data + '</a>';
		} else if (data === '叮咚，有人在家嗎～～～～') {
			data = '<span style="color: red; font-weight: bold">叮咚，有人在家嗎～～～～</span>';
		} // 字體顏色
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
