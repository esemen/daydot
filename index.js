var express = require('express');
var session = require('express-session');

/** Create an global express instance for handling BE **/
app = express();

/** Configure session **/
app.use(session({
    secret: 'myAppSessionSecretKey',
    resave: false,
    saveUninitialized: true
}));

/** Use static directory for serve html files **/
app.use(express.static(__dirname + '/public'));

/** Append API urls **/
require('./routes');

/** Listen ws with port 3000 **/
app.listen(3000, function(){
    console.log("The server started at http://localhost:3000")
})
