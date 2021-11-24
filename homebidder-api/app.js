const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors= require("cors");

const usersRouter = require('./routes/users');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const propertyRouter = require('./routes/properties');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use (cors())
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/properties', propertyRouter(dbHelpers));

module.exports = app;
