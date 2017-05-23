var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Set Route variables
var indexRoutes = require('./routes/index');
var tasksRoutes = require('./routes/tasks');

// Initialize node express app
var app = express();

// Connect Mongoose to Mongodb client on port 27017
mongoose.connect('localhost:27017/ng-app');

// View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Cookie Parser
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Set Headers
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

///////////// Connect Routes //////////////

app.use('/message', tasksRoutes);
app.use('/', indexRoutes);


// Set and listen on port

var port = 3000;
app.listen(port, function(){
  console.log('Server started on port ' + port);
});

module.exports = app;
