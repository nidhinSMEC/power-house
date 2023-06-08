const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');


const app = express();
app.use(cors());
const server =http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000' ,
        method: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A new client is connectd');
    socket.on('submitForm', (formData) => {
        console.log(formData);
        socket.broadcast.emit('formSubmission', formData);
    })

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
})

server.listen(3001, () => {
    console.log('Socket.IO server running on port 3001');
  });