var restify = require('restify');
var server = restify.createServer();
var port = 8088;
var fs = require('fs');

var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/enron');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var schema = new Schema({
	_id: Schema.Types.ObjectId,
	sender: String,
	recipients: [],
	cc: [],
	text: String,
	mid: String,
	fpath: String,
	bcc: [],
	to: [],
	replyto: Schema.Types.Mixed,
	ctype: String,
	fname: String,
	date: Date,
	subject: String
});
var Emails = mongoose.model('emails', schema);


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

function getEmails(req, res, next){
	Emails.find().exec(function(err,data){
		if(err){res.send('Error');}
		else {
			res.json(data);
		}
	});
	return next();
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
server.get('/hello/:name', send);
server.put('/hello/:name', send);
server.post('/hello/:name', function(req, res, next){
	res.send(201, req.params.stuff + ";s random String is: " + 
		Math.random().toString(36).substr(3,8));
	return next();
});
server.del('/hello/:name', function(req, res, next){
	res.send(req.params.name + " is now gone... deleted");
	return next();
})

server.listen(port, function(){
	console.log('%s listening at %s', server.name, port);
});