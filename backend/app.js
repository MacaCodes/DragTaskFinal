const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Import connectDB from your database configuration file
const connectDB = require('./config/database');


const boardsRouter = require('./routes/boardRoutes');
const cardsRouter = require('./routes/cardRoutes');
const listsRouter = require('./routes/listRoutes');

const app = express();
console.log('express app created');

// Call connectDB to initiate the database connection
connectDB();
console.log('Database connected');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('api/v1' , require('./routes'));

// Define route for /ws
console.log('Defining /ws route');
app.get('/ws', function(req, res) {
  console.log('Handling /ws request');
  res.send('WS endpoint response');
});
console.log('/ws route defined');

module.exports = app;
