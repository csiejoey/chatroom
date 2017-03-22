//this server listen to 3002

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const express = require('express');

var fs = require('fs');

app.use(express.static('image'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('add user', function(msg){
		socket.username = msg;
		console.log("new user: " + msg + " logged in.");
		io.emit('add user', {
			username: socket.username
		});
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', {
			username: socket.username,
			usermsg: msg
		});
	});
});

var emoji = '<img src="diss.png">';
var emoji2 = '<img src="smiley1.png">';

io.on('connection', function(socket){
	socket.on('send pic', function(){
		io.emit('send pic', {
			username: socket.username,
			useremoji: emoji
		});
	});
});

io.on('connection', function(socket){
	socket.on('send pic2', function(){
		io.emit('send pic2', {
			username: socket.username,
			useremoji: emoji2
		});
	});
});


http.listen(3002, function(){
  console.log('listening on *:3002');
});
