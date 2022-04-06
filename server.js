/*****************************************************
WEB322 – Project (Winter 2022)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Piyush Singla
* Student ID: 146631205
* Course/Section: Web322 NDD
*
****************************************************/

const express = require("express");

const bodyParser =  require("body-parser");
const request = require("request");
const path = require('path');
const app= express();
const siteRoutes = require('./routes/siteRoutes'); // SITE ROUTES
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//instead of app.set('view engine', 'handlebars'); 
app.set('view engine', 'hbs');
//instead of app.engine('handlebars', handlebars({
app.engine('hbs', handlebars.engine({
layoutsDir: __dirname + '/views/layouts',
//new configuration parameter,

extname: 'hbs'
}));
app.use(express.json());

app.use(session({secret: 'singla', saveUninitialized: false, resave: false}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true }));
// USE STATIC FILES (CSS, JS, IMAGES)
app.use(express.static(path.join(__dirname, 'public')));
const mealRoutes = require('./routes/mealsRoutes'); // MEAL ROUTES
const loadRoutes = require('./routes/load-dataRoutes'); // LOAD DATA ROUTES
siteRoutes(app);
mealRoutes(app);
loadRoutes(app);
/*
//home
app.get("/",function(req,res){
 res.sendFile(__dirname + "/index.html");
});
app.use(express.static("public"));
//menu
app.get("/menu", function(req,res){
  res.sendFile(__dirname + "/menu.html");
})



app.get("/login",function(req,res){
res.sendFile(__dirname+ "/login.html");
});

app.get("/register",function(req,res){
res.sendFile(__dirname+ "/register.html");
});

app.post("/",function(req,res){

const FirstName =req.body.fname;
const LastName =req.body.lname;
const EMail =req.body.email;

var data = {
  members: [
    {
      email_address: EMail,
      status: "subscribed",
      merge_fields:{
        FNAME: FirstName,
        LNAME: LastName,
      }
    }
  ]
};
const jsonData = JSON.stringify(data);
const url="https://us5.api.mailchimp.com/3.0/lists/f7489d516c";0

const options= {
  method: "POST",
  auth: "Kanwal1:7a96571c8714e884bbe7429f7f407dd4-us5"
}

const request = https.request(url,options,function(response){

   if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");

  }else{
    res.sendFile(__dirname + "/failure.html");
  }
response.on("data", function(data){
  console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();
console.log(FirstName, LastName, EMail);
});

app.post("/failure", function(req,res){
  res.redirect("/");
}
)


//API key
//7a96571c8714e884bbe7429f7f407dd4-us5

//User Id
// f7489d516c
*/

siteRoutes(app);

//http-port call
 app.listen(8080,function(){
    console.log("Server is up and running at 8080");
 })
