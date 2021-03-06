// dependencies
const dotenv = require('dotenv').config();
const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');
const routes = require("./controllers");
const sequelize = require("./config/connection");
const passport = require('passport');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 3001;

const session = require("express-session");
const flash = require('express-flash');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        expires: 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
