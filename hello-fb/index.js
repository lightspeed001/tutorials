const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser'); 
const compression = require('compression')  

/***
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);    
**/

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));   
app.use(cookieParser())   
app.use(compression()); //Compress all routes
app.set('view engine','ejs')
app.set('views',path.join( __dirname, './views'))   

 app.get("/hello", (req, res) => {
    res.json({"hello":"From firebase!"});
});

exports.app = functions.https.onRequest(app);