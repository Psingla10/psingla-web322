const User = require('../models/user.model.js');

module.exports = {

   // CREATE USER
   createUser(req, res, next){
  
    const {username,password,role} = req.body;

    User.create(username,password,role)
       .then(res.status(201).render('main', {layout: 'dashboard',name:username}))
        .catch(err => res.status(400).json({ err }));
    },
    verifyExistingnCreate(req, res, next){
        const { email } = req.body;
        User.emailCheck(email)
        .then(data=>{
            if(data.length==1)
            {
                var errs=[];
                var err=new Object();
                err.msg='Email already exists';
                errs.push(err);
            res.status(200).render('main', {layout: 'register',errors:errs});
            }
            else
            this.createUser(req,res,next);
        })
        
    },
    login(req, res, next){
        const { username,password,role } = req.body;
        User.login(username, password)
        .then(data=>{
     
           if(data.length>0)
           if(role=='customer')
           {
               req.session.role = 'customer';
               res.status(201).render('main', {layout: 'Customerdashboard',result:data});
           }
           else
           {
                req.session.role = 'admin';
                res.status(201).render('main', {layout: 'Dataentrydashboard',result:data});
          
           }
           else
           {
               var errs=[];
               var err=new Object();
               err.msg='Sorry, you entered the wrong email and/or password';
               errs.push(err);
           res.status(200).render('main', {layout: 'login',errors:errs});
           }
        })
          
            .catch(err => res.status(400).json({ err }));
    }
}

  