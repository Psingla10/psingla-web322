    // REQUIRE MODEL
const createApplication = require('express/lib/express');
var MealModel = require('../models/mealschema');


var fs = require('fs');
const mealkitController = require('./mealkit.controller');
module.exports = {


  
  generateMeals(req,res){
  
    
    MealModel.find({}).then(datas => {

        
const len=datas.length;
        if(len!=0)
        {
            res.render('main', {layout: 'loaddata',
                
                    message:'Meal kits have  already been added to the database'
                });
        }
        if(len==0)
        {

            fs.readFile("./sampledata.txt","utf-8",function(err,data){
            
               /// console.log(data);
            
            
            
            
                var sample=JSON.parse(data);
                let i=1;
                sample.forEach(element => {
                    
                    var now = new Date();
                    //dateFormat(now, "ddmmyyhMMss");
                    var newMeal = new MealModel();
                
                i++;
                    newMeal.title = element.title;
                    newMeal.ingredients=element.ingredients;
                    newMeal.price=element.price;
                    newMeal.description=element.description;
                    newMeal.cookingtime=element.cookingtime;
                    newMeal.servings=element.servings;
                    newMeal.calories=element.calories;
                    newMeal.category=element.category;
                    newMeal.istopmeal=element.istopmeal;
                    newMeal.image=element.image;
                  
                   newMeal.save();
                });
            
               
            });
            res.render('main', {layout: 'loaddata',
                
                    message:'Added meal kits to the database'
                });

        }
    })
    


    // Meal.create( title,price,description,features,ispopular,icon)
        
    //     .then(res.redirect('/allmeals'))
    //     .catch(err => res.status(400).json({ err }));
}
 
}