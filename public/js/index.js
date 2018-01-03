var socket = io();

        socket.on('connect',function() {
            console.log('connected to server');
            // socket.emit('createEmail',{
            //     to: 'jack@example.ocm',
            //     text: 'How are you'
            // });
        });

        socket.on('disconnect',function(){
            console.log('Disconnected from server');
        });
        // socket.on('newEmail',function(email){
        //     console.log('New email',email);
        // });
        socket.on('newMessage',function(message){
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var template = jQuery('#message-template').html();
            var html = Mustache.render(template,{
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });

            jQuery('#messages').append(html);
        });
        socket.on('newLocationMessage',function(message){
            var formattedTime = moment(message.createdAt).format('h:mm a');

            var template = jQuery('#location-message-template').html();
            var html = Mustache.render(template,{
                url: message.url,
                from: message.from,
                createdAt: formattedTime
            });
            // var li = jQuery('<li></li>');
            // var a = jQuery('<a target = "_blank">My current location</a>');
            // li.text(`${message.from} ${formattedTime}: `);
            // a.attr('href', message.url);
            // li.append(a);
             jQuery('#messages').append(html);
        })


        jQuery('#message-form').on('submit',function(e){
            e.preventDefault();
            var messageTextBox = jQuery('[name=message]');
            socket.emit('createMessage',{
                from: 'User',
                text: messageTextBox.val()
            },function(){
               messageTextBox.val('');
            });
        });

        var locationButton = jQuery('#send-location');
        locationButton.on('click',function(){
            if(!navigator.geolocation){
                return alert('Geolocation is not supported by the server');
            }

            locationButton.attr('disabled','disabled').text('Sending location...');
            navigator.geolocation.getCurrentPosition(function (position){
                locationButton.removeAttr('disabled').text('Send Location');
                socket.emit('createLocationMessage',{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },function(){
                locationButton.removeAttr('disabled').text('Send location');
                return alert('Unable to fetch');
            })
        });
    