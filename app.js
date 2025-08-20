var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var usersRouter = require('./routes/users');
const productRouter = require('./routes/product');


var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
 

mongoose.connect('mongodb://localhost:27017/Shopping-API').then(() => {
  console.log('MongoDB connection established successfully');
}).catch((err) => {
  // Handle connection error
  console.error('MongoDB connection error:', err);
});
  

app.use('/users', usersRouter);
app.use('/products', productRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});
 

module.exports = app;
