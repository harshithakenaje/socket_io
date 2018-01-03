var moment = require('moment');

// var date= new Date();
// console.log(date.getMonth());
var createdAt =1234;
var date = moment(createdAt);
console.log(date.format('hh:mm a'));