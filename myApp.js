let express = require('express');
let app = express();
let bodyParser = require('body-parser');

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.get("/", function(req, res) {
  var absolutePath = `${__dirname}/views/index.html`;
  res.sendFile(absolutePath);
})

app.use("/public", function(req, res) {
  var absolutePath = `${__dirname}/public/style.css`;
  res.sendFile(absolutePath);
})

app.get("/json", function(req, res) {
  var response = "";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  var jsonRes = { "message": response };
  res.json(jsonRes);
})

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next()
}, function(req, res) {
  res.json({time: req.time})
})

app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word })
})

app.get("/name", function(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}` });
})

app.post("/name", function(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` })
})

















module.exports = app;
