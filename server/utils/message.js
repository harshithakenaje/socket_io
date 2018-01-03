var moment = require('moment');
var time= moment();
var generateMessage = (from,text)=>{
    return { 
        from,
        text,
        createdAt: time.valueOf()
    };
};

var generateLocationMessage = (from,latitude,longitude)=>{
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: time.valueOf()
    };
};

module.exports = {generateMessage,generateLocationMessage};