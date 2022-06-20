//index.js Servidor
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


//Initializations
const app = express();
require('./database')
require('./passport/local-auth')

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
//Flash y passport deben ir después de las sesiones
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    // Validación, si existe el usuario mostrar pestañas correctas
    app.locals.user = req.user;
    console.log(app.locals);
    next();
});


//Routes 
app.use('/', require('./routes/index'));

// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});