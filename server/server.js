const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');


var app = express();
var server = http.createServer(app);
 var io = socketIO(server);
// var server=app.listen(port);
// var io= require('socket.io').listen(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from:'mike@example.com',
    //     text: 'Hey What is going on',
    //     createdAt: 123
    // });
    // socket.on('createEmail',(newEmail)=>{
    //     console.log('create email:',newEmail);
    // });
    socket.emit('newMessage',{
        from: 'hani@example.com',
        text: 'Hey',
        createdAt: 123
    });
    socket.on('createMessage',(newMessage)=>{
        console.log('create message:',newMessage);
    })
    socket.on('disconnect',(socket)=>{
        console.log('User disconnected');
    });
});
// var io = socketIO.listen(server);
server.listen(port,()=>{
console.log(`Server at port ${port}`);
});
