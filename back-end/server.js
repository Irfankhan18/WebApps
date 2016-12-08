var express =require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');


var checkAuthenticated =require('./services/checkAuthenticated');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var cors = require('./services/cors')
//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.get('/api/message', message.get);
app.post('/api/message', checkAuthenticated, message.post);

//connection
mongoose.connect("mongodb://localhost:27017/test", function(err, db){
  if(!err){
    console.log("we are connected to mongo");


  }
})
var server = app.listen(5000, function(){
   console.log("Listening on port " + server.address().port);
})
