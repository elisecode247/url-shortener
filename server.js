var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var surlController = require('./controllers/surlController');

mongoose.connect(config.getDbConnectionString());

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
      res.render('index');
    });
    
setupController(app);
surlController(app);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("listening to port ")
});
