var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

//Routers
app.post('/api/test', function(req,res){
  console.log(req.body);

  var response = "Loud and clear";
  console.log(response);
  res.json(response);
});

   app.listen(8008);
   console.log("App listening at port 8008");
