var socket = io();
    function scrollToBottom(){
        var message = jQuery('#messages');
        var newMessage = message.children('li:last-child')

        var clientHeight = message.prop('clientHeight');
        var scrollTop = message.prop('scrollTop');
        var scrollHeight = message.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();

        if((scrollTop + clientHeight + newMessageHeight + lastMessageHeight)>= scrollHeight){
            message.scrollTop(scrollHeight);
        }
    }
        socket.on('connect',function() {
            var params = jQuery.deparam(window.location.search);

            socket.emit('join',params, function(err){
                if(err){
                    alert(err);
                    window.location.href ='/';
                }
                else{
                    console.log('no error');
                }
            });
        });

        socket.on('disconnect',function(){
            console.log('Disconnected from server');
        });
       
       socket.on('updateUserList',function(users) {
        // console.log('Users List',users);
        var ol = jQuery('<ol></ol>');

        users.forEach(function(user){
            ol.append(jQuery('<li></li>').text(user));

        });
        jQuery('#users').html(ol);
       }
       )
        socket.on('newMessage',function(message){
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var template = jQuery('#message-template').html();
            var html = Mustache.render(template,{
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });

            jQuery('#messages').append(html);
            scrollToBottom();
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
             scrollToBottom();
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
    