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

app.get('/history', function(req, res) {
	res.sendFile(__dirname + '/history.html');
});

app.get('/offline', function(req, res) {
	res.sendFile(__dirname + '/offline.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('addroom1user', function(username) {
		socket.username = username;
		socket.room = 'room1';
		usernames[username] = username;
		socket.join('room1');
		// setting profile picture and account name
		let yahPic = '<img id="opponentPic" src="yah.jpg">';
		socket.emit('setpic', yahPic);
		let yahAccount = '雅君 (cuteyah38)';
		socket.emit('setaccount', yahAccount);
	});

	socket.on('addroom2user', function(username) {
		socket.username = username;
		socket.room = 'room2';
		usernames[username] = username;
		socket.join('room2');

		let joeyPic = '<img id="opponentPic" src="joey.jpg">';
		socket.emit('setpic', joeyPic);
		let joeyAccount = '就已 (hjoey0607)';
		socket.emit('setaccount', joeyAccount);
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
		} else if (data === 'diss') {
			data = '<img src="diss2.gif">';
		} else if (data === '叮咚，有人在家嗎～～～～') {
			data = '<span style="color: red; font-weight: bold">叮咚，有人在家嗎～～～～</span>';
		} else if (data.indexOf('status') > -1) {
			function splitString(stringToSplit, separator) {
				arrayOfStrings = stringToSplit.split(separator);
				let statusType = arrayOfStrings[1];
				let opponentName = arrayOfStrings[2];
				let statusWord = arrayOfStrings[3];
				let blueOrNot = arrayOfStrings[4];
				io.sockets.in(socket.room).emit('changestatus', statusType, opponentName, statusWord, blueOrNot);
			}
			splitString(data, ' ');
			return;
		} else if (data.indexOf('offlineTxt') > -1) {
			function splitString(stringToSplit, separator) {
				arrayOfStrings = stringToSplit.split(separator);
				let offlineName = arrayOfStrings[1];
				io.sockets.in(socket.room).emit('setofflinetxt', offlineName);
			}
			splitString(data, ' ');
			return;
		}

		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
