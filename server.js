const express = require("express"), server = express();
const path = require('path');
const morgan = require('morgan');

// SETTINGS
server.set('port', process.env.PORT || 8080);
server.set('views', path.join(__dirname, `views`));
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'ejs');           

// MIDDLEWARES
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));

// ROUTES
server.use(require('./server/routes/index'));

// STATIC FILES
server.use(express.static(path.join(__dirname, 'public')));

module.exports = server;