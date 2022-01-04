var mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//CONNECTION



var mongoDB = `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rpuy3.mongodb.net/Store?retryWrites=true&w=majority`;

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Stablished connection to MongoDB!');
  }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTERS: 

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const packsRouter = require('./routes/packs');

//routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/packs', packsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
