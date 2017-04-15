var restify = require('restify');
var hello = require('./routes/hello');
var server = restify.createServer();
var port = 8088;
var fs = require('fs');

var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/enron');
var db = mongoose.connection;

var Emails = require('./models/emails');


db.on('error', function(msg){
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
	console.log('Mongoose connection established')
});

function send(req, res, next){
	res.send("Testing " + req.params.test);
	return next;
}


server.get('/', function(req, res, next) {
	fs.readFile('index.html', function(err,data){
		if(err){ 
			console.log("Cannot read file index.html");
			res.send(404);
		} else {
			var body = data.toString();
			res.writeHead(200, {
				'Content-Length' : Buffer.byteLength(body),
				'Content-Type' : 'text/html'
			});
			res.write(body);
			res.end();
		}
		return next();
	});
});

server.get('/emails', getEmails);
server.get('/hello/:name', hello.send);
server.put('/hello/:name', hello.send);
server.post('/hello/:name', hello.post);
server.del('/hello/:name', hello.del);
	
server.listen(port, function(){
	console.log('%s listening at %s', server.name, port);
});