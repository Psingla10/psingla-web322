const User = require('../models/user.model.js');
var UserModel = require('../models/userschema');
module.exports = {

   // CREATE USER
   createUser(req, res, next){
  
    const {username,password,role} = req.body;

    User.create(username,password,role)
       .then(res.status(201).render('main', {layout: 'dashboard',name:username}))
        .catch(err => res.status(400).json({ err }));
    },
    verifyExistingnCreate(req, res, next){
        const { email,password,role } = req.body;
        UserModel.find({username:{$eq:email} }, 
            function(err, data) {
                if(err){
                    console.log(err);
                }
                else{
                 // console.log("newdata:",data);
                  //return data;
                  //  res.send(data);

                  if(data.length!=0)
                  {
                    password =  bcrypt.hash(password, salt);
                    var newUser = new UserModel();
    
                    newUser.username = email;
                    newUser.password=password;
                    newUser.role=role;
                    newUser.save();
                  }
                  
                }
            });
        },  
        
        
    
    login(req, res, next){
        const { username,password,role } = req.body;
        
        UserModel.find({username:{$eq:username} ,password:{$eq:password},role:{$eq:role}}, 
            function(err, data) {
                if(err){
                    console.log(err);
                }
                else{
                  console.log("newdata:",data);
                  if(data.length==0)
                  res.status(200).render('main', {layout: 'login',errors:"Invalid user/password"});
                  if(data[0].role=='clerk')
                  {
                    req.session.role = 'clerk';
                   res.status(200).render('main', {layout: 'Dataentrydashboard'});
                  }
                 /*if(data.role=='clerk')
                 {
                     console.log("Clerk");
                 }*/

                  //  res.send(data);
                }
            }
            );  
        
         /*User.login(username, password).then(data=>{
            //console.log(data);
               if(data.length>0)
               if(data[0].role=='clerk')
               {
                req.session.role = 'clerk';
               
               res.status(201).render('main', {layout: 'dashboard',result:data});
               }
               else if(data[0].role=="admin")
               {
    
                req.session.role = 'admin';
                res.status(201).render('main', {layout: 'Admindashboard',result:data});
               
               }
               else
               {
                   var errs=[];
                   var err=new Object();
                   err.msg='Sorry, you entered the wrong email and/or password';
                   errs.push(err);
               res.status(200).render('main', {layout: 'signin',errors:errs});
               }
            });
        if(data.length==0)
        res.status(200).render('main', {layout: 'login',errors:errs});
        else
        res.end();*/

        }
    }
}


  