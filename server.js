// dependencies
const dotenv = require('dotenv').config();
const path = require("path");
const express = require("express");

const exphbs = require('express-handlebars');
const routes = require("./controllers");
const sequelize = require("./config/connection");
const passport = require('./config/passport')

>>const app = express();
const PORT = process.env.PORT || 3001;

const session = require("express-session");

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
    });
};

app.use(session(sess));


const hbs = exphbs.create({});

app.engine("handlebars", exphbs());


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);



app.get("/", function (req, res) {
  res.render("main.handlebars");
});


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
