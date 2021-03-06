const UsersController = require('../controllers/user.controller');
module.exports = (app) => {

    app.get('/home', (req, res) => {
        res.render('main', {layout: 'index'});
    }),
    app.get('/register', (req, res) => {
        res.render('main', {layout: 'register'});
    }),

    app.get('/login', (req, res) => {
        res.render('main', {layout: 'login'});
    })

   
    app.get('/', (req, res) => {
        res.render('main', {layout: 'index'});
     
        })

    //LOGIN POST REQUEST
    app.post('/login', (req, res) => {
        let name = req.body.username;
        let password = req.body.password;
      /*  req.checkBody('password', 'Password is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            req.session.errors = errors;
            req.session.success = false;
        
        res.render('main', {layout: 'login',success: req.session.success, errors: req.session.errors });
        }
        else{*/
           // req.session.success = true;
            UsersController.login(req,res,null);
        //}

        
        
    })

//REGISTER POST REQUEST
    app.post('/register', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
      
       // req.checkBody('username', 'Username/Email is required').notEmpty();
        //req.checkBody('password', 'Password  is required').notEmpty();
        //var errors = req.validationErrors();
        /*
        if(errors){
            req.session.errors = errors;
            req.session.success = false;
            res.render('main', {layout: 'register',success: req.session.success, errors: req.session.errors });
        }
        else{
            */
            req.session.success = true;
            UsersController.verifyExistingnCreate(req,res,null);
        
        //}
    
        
        
    })
    
    
    

    
    
}