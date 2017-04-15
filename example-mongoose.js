var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/enron');
var db = mongoose.connection;
var restify = require('restify');
var server = restify.createServer();

db.on('error', function(msg){
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
	console.log('Mongoose connection established')
});

server.listen('8088', function(){
	console.log("Success... connected and running");
});