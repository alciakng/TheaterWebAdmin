
/**
 * Module dependencies.
 */

global.controllers = function(name) {
    return require(__dirname + '/controllers/' + name);
}
global.config = function(name) {
    return require(__dirname + '/config/' + name);
}

global.envConfig = config('envConfig.json');

var express = require('express')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , flash = require('connect-flash')
  , swig = require('swig')
  , paypal = require('paypal-rest-sdk')
  , viewHelper = require('view-helpers')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
app.set('port', process.env.PORT || 4938);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.configure(function() {
	app.use(express.cookieParser('keyboard cat'));
	app.use(express.session({ cookie: { maxAge: 36000000}}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(viewHelper());
});


//router set
config('router.js')(app);
//db set
config('dbconfig');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
