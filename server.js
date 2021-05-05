// dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "Super secret secret",
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

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, "assets")));

app.use(routes);

app.get("/", function (req, res) {
    res.render("main.handlebars");
});

app.post("/calendar", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/pages/calendar.html"));
});

app.get("/appointments", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/pages/appointments.html"));
});

app.post("/credentials", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/pages/creds.html"));
});

app.get("/list", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/pages/list.html"));
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
