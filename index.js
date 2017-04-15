var restify = require('restify');
var server = restify.createServer();
var port = 8088;

server.get('/', function(req, res, next){
	res.send("Hello World");
	next();
});

server.get('/hello/:name', function(req, res, next){
	res.send('Hello ' + req.params.name);
	next();
});

server.listen(port, function(){
	console.log('%s listening at %s', server.name, port);
});