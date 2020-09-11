const express = require("express"), server = express();
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

// SETTINGS
server.set('port', process.env.PORT || 3000);
server.set('views', path.join(`${__dirname}\\..\\src\\`, `views`));
server.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
})).set('view engine', '.hbs');

// MIDDLEWARES
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));

// ROUTES
server.use(require('./routes/index'));

// STATIC FILES
server.use(express.static(path.join(`${__dirname}\\..\\src\\`, 'public')));

module.exports = server;