//REQUIRE PACKAGES
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

//REQUIRE CONTROLLERS
var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var productsController = require('./controllers/products.js')

//LOADS EXTRA ENVIRONMENT VARIABLES FROM LOCAL .env FILE
require('dotenv').config()

//START SERVER INSTANCE
var app = express();

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/ecommerce-app';
mongoose.connect(mongoURI)

var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB or success message if successful connection made
db.on('error', function(err){
  console.log(err);
});

db.once('open', function(){
  console.log('Database connected!');
});

//CONFIGURE MIDDLEWARE/PACKAGES
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({
  secret: process.env.APPSECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 60000 }
}))

//SET ROUTES TO HIT CONTROLLERS
app.use('/users', usersController);
app.use('/products', productsController)
app.use('/sessions', sessionsController)

//CONNECT SERVER TO WORLD!
app.listen(process.env.PORT || 4000, function(){
  console.log('Server listening on 4000!')
})
