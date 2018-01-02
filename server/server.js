const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    socket.on('createMessage',(newMessage,callback)=>{
        console.log('create message:',newMessage);
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        // callback('This is from the server');
        // {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
        // socket.broadcast.emit('newMessage',{
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });
    socket.on('disconnect',(socket)=>{
        console.log('User disconnected');
    });
});
// var io = socketIO.listen(server);
server.listen(port,()=>{
console.log(`Server at port ${port}`);
});
