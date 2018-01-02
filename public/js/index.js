var socket = io();

        socket.on('connect',function() {
            console.log('connected to server');
            // socket.emit('createEmail',{
            //     to: 'jack@example.ocm',
            //     text: 'How are you'
            // });
            socket.emit('createMessage',{
                from: 'jans@gmail.com',
                text: 'Hello'
            });
        });

        socket.on('disconnect',function(){
            console.log('Disconnected from server');
        });
        // socket.on('newEmail',function(email){
        //     console.log('New email',email);
        // });
        socket.on('newMessage',function(message){
            console.log('New message', message);
        });
    