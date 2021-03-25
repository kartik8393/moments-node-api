var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors')
const mongoose = require('mongoose')
const verify = require('./middleware/verify')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var momentRouter = require('./routes/moment');

var app = express();
app.use('/uploads',express.static('./upload'))
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({limit: '50mb'}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/moment',verify, momentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


mongoose.connect('mongodb://localhost:27017/moment')
  .then(()=>console.log("Connected to MongoDB..."))
  .catch(err=>console.log("Could not connect to mongodb"))

module.exports = app;
