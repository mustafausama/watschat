var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var users = [];

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

io.emit('some event', { for: 'everyone' });

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});