const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the "public" directory
app.use('/public', express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
const users ={};

// Socket.io connection handler
io.on('connection', (socket) => {

  console.log('A user connected');
  socket.on('new-User',name =>{
    users[socket.id] = name;
    socket.broadcast.emit('user-join',name);
  });


  socket.on('send',message =>{
    socket.broadcast.emit('receive',{message : message,name:users[socket.id] })
  });



  // Listen for chat messages
  // socket.on('chat message', (msg) => {
  //   console.log('Received message:', msg);
  //   io.emit('chat message', msg); // Broadcast the message to all connected clients
  // });

  // Handle disconnection


  socket.on('disconnect', () => {
    console.log('A user disconnected');
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];

  });


});

// Start the server
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
