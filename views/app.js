/* TOP MUSIC
 * App
 * ~
 */

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const session = require('express-session');
const securityFile = require("./routes/security.js");
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/public', static);
app.use(static);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ 
  defaultLayout: "main",
  extname: '.handlebars',
  helpers: require("./public/javascript/helper.js").helpers,extname: 'handlebars'
}));

app.set("view engine", "handlebars");

app.use(session({
  secret: 'mysecretkey546',
  cookie: {},
  resave: false,
  saveUninitialized: false
}));


app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin,TokenType");
  if (req.session.auth || req.originalUrl === "/") {
    next();
  } else {
    securityFile(req, val => {
      if (val.res == 0) {
        next();
      } else {
        res.redirect("/");
      }
    });
  }
});

configRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
  if (process && process.send) process.send({ done: true });
});