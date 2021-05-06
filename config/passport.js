const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const express = require('express');


function initialize(passport, getUserByEmail) {
    
    const authenticateUser = async (email, password, done) => {
        
        const user = getUserByEmail(email)
        if ( user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try{
            const pass = await bcrypt.compare(password, user.password)
            if (pass) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password' })
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, 
    authenticateUser))
    // passport.serializeUser((user, done) => { })
    // passport.deserializeUser((id, done) => { })
}

module.exports = initialize;