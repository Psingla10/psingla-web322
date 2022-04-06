const db = require('../config/config');
var UserModel = require('../models/userschema');
const bcrypt = require("bcrypt");
const req = require('express/lib/request');

const Users = {};
const salt =  bcrypt.genSalt(10);
// CREATE USER
Users.create = (username,password,role) => {
    password =  bcrypt.hash(password, salt);
    return db.none(`INSERT into users(username,password,role)` + `VALUES($1, $2)`, [username, password,role]);
}

Users.usernameCheck = (username) => {
    return db.any('SELECT * FROM users where username=$1',username);
}
Users.emailCheck = (username) => {
    return db.any('SELECT * FROM users where username=$1',username);
}
Users.login = (user,pass,role) => {
    //console.log(user,pass);
    UserModel.find({username:{$eq:user} ,password:{$eq:pass},role:{$eq:role}}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
             // console.log("newdata:",data);
              return data;
              //  res.send(data);
            }
        });  
    
   // return db.any('SELECT * FROM users where username=$1 and password=$2',[username,password]);
   
}
module.exports = Users;