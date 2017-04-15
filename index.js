var restify = require('restify');
var server = restify.createServer();
var port = 8088;

function send(req, res, next){
	res.send("Testing " + req.params.test);
	return next;
}

server.get('/', send);
server.get('/hello/:test', send);
server.put('/hello/:test', send);
server.del('/hello/:test', function(req, res, next){
	res.send(204);
	return next();
})

server.listen(port, function(){
	console.log('%s listening at %s', server.name, port);
});