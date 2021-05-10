const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models');

module.exports = function(passport) {
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findOne({where: { id: id }})
        .then(user => done(null, user))
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        },
        function(req, email, password, done) {
        console.log(email, password);
        User.findOne({ email: email })
        .then(user => 
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    
                    return done(null, user);
                } else {
                    return done(null, false)
                }
            })
        )
    }))
}
