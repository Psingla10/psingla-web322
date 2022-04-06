// REQUIRE CONTROLLER
const loaddataController = require('../controllers/load-data.controller');
const path = require('path');
module.exports = (app) => {
    

    
 
    app.get('/meal-kits', (req, res) => {

        if(req.session.role==undefined)
        res.render('main', {layout: 'login' });
        
        if(req.session.role!='clerk')
            res.render('main', {layout: 'login' });

            
        loaddataController.generateMeals(req,res);
    })

}

    