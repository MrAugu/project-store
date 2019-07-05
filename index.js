const express = require("express");
const app = express();
const path = require("path");
const dataDir = path.resolve(`${process.cwd()}${path.sep}`);
const config = require("./config.js");
const templateDir = path.resolve(`${dataDir}${path.sep}views`);
const bodyParser = require("body-parser");
const ejs = require("ejs");
const helmet = require("helmet");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true
});

app.use("/assets", express.static(path.resolve(`${dataDir}${path.sep}assets`)));
app.use("/public", express.static(path.join(__dirname, 'public'))); //public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs"); // changed html -> ejs
app.set("views", path.join(__dirname, './app_server/views')); //views scope
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
  
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new LocalStrategy(function(username, password, done) {
  // To return authenticated: return done(null, { user_data: "MrAugu" });
  // To return failed: return done(null, false);
  if (!username) return done(null, false);
  if (!password) return done(null, false);
  
  // Query a search to DB and compare.
}));

app.get("/login", (req, res) => routeFile("get", "login")(req, res, renderTemplate));
app.post("/login", passport.authenticate("local", { failureRedirect: '/login' }), (req, res) => routeFile("post", "login")(req, res, renderTemplate));
app.listen(config.port, null, null, () => console.log("Website is fully running."));

function renderTemplate(res, req, template, data = {}) {
  const baseData = {
    user: req.isAuthenticated() ? req.user : null
  };
  res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};

function routeFile(method, fileName) {
  return require(`./routes/${method}/${fileName}.js`);
}