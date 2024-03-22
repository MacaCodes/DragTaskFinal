
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory where the views are stored
app.set('views', path.join(__dirname, 'views'));

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1', require('./src/v1/routes'));


module.exports = app;