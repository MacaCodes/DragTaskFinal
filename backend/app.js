var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

// Import connectDB from your database configuration file
const connectDB = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Call connectDB to initiate the database connection
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
