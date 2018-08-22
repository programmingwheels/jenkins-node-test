const email = require('emailjs/email');
const Promise = require('bluebird');
const server 	= email.server.connect({
    user:    "sandtiger010101@gmail.com", 
    password:"Lenin@123", 
    host:    "smtp.gmail.com", 
    ssl:     true
 });

 function sendMail(to,subject,text) {
    server.send({
        text:    text, 
        from:    "sandtiger010101@gmail.com", 
        to:      to,
        subject: subject
     }, function(err, message) { 
         if(err){
             Promise.reject(err)
         }
         Promise.resolve(message);
      });
 }
 module.exports = {
     sendMail
 }