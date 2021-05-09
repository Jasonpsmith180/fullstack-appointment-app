const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models');

// module.exports = function(passport) {
//     passport.use(new LocalStrategy(function(username, password, done) {
//         console.log(username, password);
//         User.findOne({ username: username })
//         .then(user => 
//             bcrypt.compare(password, user.password, (err, same) => {
//                 if (same) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false)
//                 }
//             })
//             )
//     }))
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//       });
      


//       passport.deserializeUser(function(id, done) {
//         User.findOne({where: { id: id }})
//         .then(user => done(null, user))
//       });
// }




      




// function initialize(passport, getUserByEmail) {
    
//     const authenticateUser = async (email, password, done) => {
        
//         const user = getUserByEmail(email)
//         if ( user == null) {
//             return done(null, false, { message: 'No user with that email' })
//         }

//         try{
//             const pass = await bcrypt.compare(password, user.password)
//             if (pass) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: 'Incorrect password' })
//             }
//         } catch (err) {
//             return done(err)
//         }
//     }

//     passport.use(new LocalStrategy({ usernameField: 'email' }, 
//     authenticateUser))
//     // passport.serializeUser((user, done) => { })
//     // passport.deserializeUser((id, done) => { })
// }

// module.exports = initialize;