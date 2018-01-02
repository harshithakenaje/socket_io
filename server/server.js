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

    socket.emit('newMessage',{
        from: 'admin',
        text: 'welcome to chat app',
        createdAt: new Date().getTime()
    });
        socket.broadcast.emit('newMessage',{
            from: 'Admin',
            text: 'New user joined',
            createdAt: new Date().getTime()
        });
    socket.on('createMessage',(newMessage)=>{
        console.log('create message:',newMessage);
        io.emit('newMessage',{
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
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
