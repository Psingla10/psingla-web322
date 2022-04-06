// REQUIRE CONTROLLER
const mealsController = require('../controllers/mealkit.controller');
const path = require('path');
module.exports = (app) => {
    var fs = require('fs');

    
    const upload_path = path.join(__dirname,"..", "public", "uploads");
    var server_path="/uploads/";
    var formidable = require('formidable');
    app.get('/meals', (req, res) => {
        mealsController.getMeals(req,res);
    })

    app.get('/allmeals', (req, res) => {

        if(req.session.role==undefined)
        res.render('main', {layout: 'login' });
        
        if(req.session.role=='clerk')
        mealsController.getMeals(req,res);
        else
        res.render('main', {layout: 'login' });
    })

    app.get('/topmeals', (req, res) => {

       
        mealsController.getTopMeals(req,res);
       
    })

    app.get('/menu', (req, res) => {

       
        mealsController.getHomeMeals(req,res);
       
    })
    
    app.get('/createmeal', (req, res) => {
        if(req.session.role==undefined)
        res.render('main', {layout: 'login' });
        
        if(req.session.role!='clerk')
            res.render('main', {layout: 'login' });

            

        res.render('main', {layout: 'createmeal' });
    })
    app.get('/deletemeal', (req, res) => {
        if(req.session.role==undefined)
        res.render('main', {layout: 'login' });
        
        if(req.session.role!='clerk')
            res.render('main', {layout: 'login' });

            
        mealsController.getDeleteMeal(req,res,null);
    })
    app.get('/editmeal', (req, res) => {
        if(req.session.role==undefined)
        res.render('main', {layout: 'login' });
        
        if(req.session.role!='clerk')
            res.render('main', {layout: 'login' });

            
        mealsController.getMeal(req,res,null);
   
    })
    app.post('/deletemeal', (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
        mealsController.deleteMeal(fields.id,res);
        });
    })
    app.post('/editmeal', (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.icon.filepath;
            var newpath = upload_path +"/"+ files.icon.originalFilename;
            var filepath=server_path+files.icon.originalFilename;

            // copy the file to a new location
            fs.readFile(oldpath, function (err, data) {
                if (err) throw err;
                //console.log('File read!');
    
                // Write the file
                fs.writeFile(newpath, data, function (err) {
                    if (err) throw err;
                    //res.write('File uploaded and moved!');
                    //res.end();
                    //console.log('File written!');
                });
    
                // Delete the file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                   // console.log('File deleted!');
                });
                
               
            });
           
mealsController.updateMeal( fields.title,fields.ingredients,fields.price,fields.description,fields.cookingtime,fields.servings,fields.calories,fields.category,fields.istopmeal,filepath,fields.id,res);
    });
});
   
    app.post('/createmeal', (req, res) => {
        
      
    
        
       
       
           req.session.success = true;
           var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.icon.filepath;
            var newpath = upload_path +"/"+files.icon.originalFilename;
            var filepath=server_path+files.icon.originalFilename;

            // copy the file to a new location
            fs.readFile(oldpath, function (err, data) {
                if (err) throw err;
                //console.log('File read!');
    
                // Write the file
                fs.writeFile(newpath, data, function (err) {
                    if (err) throw err;
                    //res.write('File uploaded and moved!');
                    //res.end();
                    //console.log('File written!');
                });
    
                // Delete the file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                   // console.log('File deleted!');
                });
                
               
            });
           //console.log(fields.title );
         
           mealsController.createMeal( fields.title,fields.ingredients,fields.price,fields.description,fields.cookingtime,fields.servings,fields.calories,fields.category,fields.istopmeal,filepath,res);
           
            
        });
        
    
    
    
    });

}

    