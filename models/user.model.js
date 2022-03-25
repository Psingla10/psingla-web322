const db = require('../config/config');
const bcrypt = require("bcrypt");

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

Users.login = (username,password) => {
    return db.any('SELECT * FROM users where username=$1 and password=$2',[username,password]);
   
}
module.exports = Users;