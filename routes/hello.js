var restify = require('restify');

exports.send = function(req, res, next){
	res.send("Testing " + req.params.name);
	return next();
}

exports.post = function(req, res, next){
	res.send(201, req.params.name + "'s random String is: " + Math.random().toString(36).substr(3,8));
	return next();
}

exports.del = function(req, res, next){
	res.send(req.params.name + " is now gone... deleted");
	return next();
}