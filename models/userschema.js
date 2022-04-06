
var mongoose=require('mongoose');
  
var UsersSchema = new mongoose.Schema({
    
    username:String,
    password:String,
    role:String,
    
});
  
module.exports = mongoose.model(
    'user', UsersSchema, 'Users');