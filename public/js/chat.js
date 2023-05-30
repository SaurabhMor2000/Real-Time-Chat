
// Connect to the Socket.io server
const socket = io();

// Handle the chat form submission
const form = document.querySelector('#chat-form');

const name = prompt("Enter your name");


const append = (mess,position) =>{
const messages = document.querySelector('#messages');
  const li = document.createElement('div');
  li.innerText = mess;
  li.classList.add("message");
  li.classList.add(position);
  messages.appendChild(li);
};


 socket.emit('new-User',name);

 socket.on('user-join',name=>{
    append(`${name} joined chat` , 'left')
 });

 socket.on('receive',message =>{
    append(`${message.name}: ${message.message}`,'left')
 })


 socket.on('left',name =>{
    append(`${name} left chat room`,'left');
 })



 form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const input = document.querySelector('#chat-input');
  const message = input.value;
  input.value = '';
   append(`you:${message}`,'right');

  // Send the message to the server
  socket.emit('send', message);
});
