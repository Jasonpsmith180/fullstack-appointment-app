const router = require("express").Router();
const { User, Post } = require("../../models");
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const app = express();

// const initializePassport = require('../../config/passport');
// initializePassport(
//   passport, 
//   router.post("/", (req, res) => {
//     User.findOne({
//           where: {
//             email: req.body.email
//           }
//     });
//   email => users.find(user => user.email === email)
// ))


// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "created_at"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
      where: {
          email: req.body.email
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(400).json({ message: 'No user found with this email address' });
          return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = dbUserData.id,
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json({ user: dbUserData, message: 'You are now logged in' });
      });
  });
});

// router.post("/login", passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true,
//   })
// )

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
