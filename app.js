var express = require('express')
, load = require('express-load')
, app = express()
, error = require('./middleware/error');


//stack of configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//use control session and cookies
app.use(express.cookieParser('ntalk'));
app.use(express.session());

//responsable for create objects JSON from form HTML
app.use(express.json());
app.use(express.urlencoded());

//Override method in http form
app.use(express.methodOverride());

//manage application's routes allows implement all page erros
app.use(app.router);

//set static files to access http://localhost:3000/css/style.css
app.use(express.static(__dirname + '/public'));

//load middleware page error
app.use(error.notFound);
app.use(error.serverError);

/*
app.use(function(req, res, next) {
	res.status(404);
	res.render('not-found');
});

app.use(function(error, req, res, next) {
	res.status(500);
	res.render('server-error', error);
});
*/

//load mvc layers
load('models')
.then('controllers')
.then('routes')
.into(app);

//start server
app.listen(3000, function(){
	console.log("NodeJS-Socket-IO is running ...");
});