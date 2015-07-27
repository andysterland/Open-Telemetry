var express = require("express");
var mongoose = require("mongoose");
var bodyParser  = require("body-parser");
var sessionRoutes = require("./sessionRoutes.js");

var staticPath = __dirname + "/static";

var app = express();
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.get("/session", sessionRoutes.list);
app.post("/session", sessionRoutes.create);

//var MONGOHQ_URL = "mongodb://localhost";
mongoose.connect(MONGOHQ_URL);

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s from %s", host, port, staticPath);
});