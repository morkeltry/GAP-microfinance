const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.set("view engine","jade");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(router);
 

module.exports = app;
