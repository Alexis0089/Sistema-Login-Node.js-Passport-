//const express = require('express');
const router = require('express', 'express-session').Router();
const passport = require('passport');



//INICIO
router.get('/',(req, res, next) => {
    res.render('index');
});

//SIGN UP
router.get('/signup', (req, res, next) => {
    res.render('signup');

});

/* router.post('/signup', (req, res, next) => {
    console.log(req.body);
    res.send('recivido')
}); */
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


//SIGN IN
router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

//Ejecuta el metodo de autenticación solo una vez antes de la siguiente linea de código
/* router.use((req, res, next) =>{
    isAuthenticated(req, res, next);
    next();
}) */

//Profile
//Perfil, una vez adentro...
router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});

//LOGOUT
router.get('/logout', (req, res, next) => {
    // remove the req.user property and clear the login session
    // req.logout();
    // destroy session data
    req.session.destroy();
    // redirect to homepage
    res.redirect('/');
    
}); 


//Función isAuthenticated, valida si el perfil está activo
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  } 

module.exports = router;