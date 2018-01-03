var expect = require('expect');

var {generateMessage,generateLocationMessage}= require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = 'jen';
        var text = 'some text';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from = 'abhi';
        var latitude = 12;
        var longitude = 77; 
        var url = 'https://www.google.com/maps?q=12,77';
        var location = generateLocationMessage(from,latitude,longitude);

        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({from,url});
    });
});