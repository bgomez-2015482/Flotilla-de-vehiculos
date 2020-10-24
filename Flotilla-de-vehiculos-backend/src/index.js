'use strict'

const express = require('express');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require ('express-session');
const mysqlStore = require ('express-mysql-session');

const { database } = require('./keys');

//INITIALIZATION

const app = express();

//SETTINGS

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expresshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handelbars')
}));

app.set('view engine', '.hbs');

//MIDDLEWARES

app.use(session({
    secret: 'fastMysql',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//GLOBAL VARIABLES

app.use(((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
}));

//ROUTES

app.use(require('./routes'));
app.use(require('./routes/authenticated'));
app.use('/links', require('./routes/links'));

//PUBLIC

app.use(express.static(path.join(__dirname, 'public')));

//STARTING THE SERVER

app.listen(app.get('port'), () => {
    console.log('Server running on port: ', app.get('port'));
})