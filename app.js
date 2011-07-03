
/**
 * Module dependencies.
 */

var express = require('express');
var sanitizer = require('sanitizer');
var msg = require('./models/msg.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

var messages = new msg.List();

app.get('/', function(req, res){
  res.render('index', {
    title: 'Kebetu',
    messages: messages.getList()
  });
});

app.post('/kebetu', function(req, res) {
	var req_msg = sanitizer.sanitize(req.param('message'));
	if (req_msg) {
		messages.add(new msg.Message(req_msg));
		console.log("Added message %s to the array (now has %d elements)", req_msg, messages.getLength());
	}
	
	res.redirect('/');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
