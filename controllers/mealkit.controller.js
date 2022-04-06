    // REQUIRE MODEL
const createApplication = require('express/lib/express');
const Meal = require('../models/meal.model.js');
var MealModel = require('../models/mealschema');

module.exports = {

    // GET ALL MEALS
    getMeals(req, res, next){
      
            MealModel.find({}).then(datas => {
                res.render('main', {layout: 'allmeals',
                
                    result: datas.map(data => data.toJSON())
                });
            })
    },
    getHomeMeals(req, res, next){
      
        MealModel.find({}).then(datas => {
            res.render('main', {layout: 'menu',
            
                result: datas.map(data => data.toJSON())
            });
        })
},
    getTopMeals(req, res, next){
      
        MealModel.find({istopmeal:{$eq:true}}).then(datas => {
            res.render('main', {layout: 'topmeals',
            
                result: datas.map(data => data.toJSON())
            });
        })
},
    getMeal(req, res, next){
            
        MealModel.find({title:{$eq:req.query.id}}).then(datas => {
            res.render('main', {layout: 'editmeal',
            
                result: datas.map(data => data.toJSON())
            });
        })

       /* Meal.getMeal(req.query.id)
            .then(data =>res.status(201).render('main', {layout: 'editmeal',result:data}))
            .catch(err => res.status(400).json({ err }));*/
    },
    getDeleteMeal(req, res, next){
            
        MealModel.find({title:{$eq:req.query.id}}).then(datas => {
            res.render('main', {layout: 'deletemeal',
            
                result: datas.map(data => data.toJSON())
            });
        })},
        
    getAllMeals(req, res, next){
        Meal.get()
            .then(data =>res.status(201).render('main', {layout: 'allmeals',result:data}))
            .catch(err => res.status(400).json({ err }));
    },
  // CREATE MEAL
  createMeal(title,ingredients,price,description,cookingtime,servings,calories,category,istopmeal,image,res){
  
    var newMeal = new MealModel();
    
    newMeal.title = title;
    newMeal.ingredients=ingredients;
    newMeal.price=price;
    newMeal.description=description;
    newMeal.cookingtime=cookingtime;
    newMeal.servings=servings;
    newMeal.calories=calories;
    newMeal.category=category;
    newMeal.istopmeal=istopmeal;
    newMeal.image=image;
  
   newMeal.save(function(err, data){
       if(err){
           console.log(error);
       }
       else{
        res.redirect('/allmeals');
       }
   });
    // Meal.create( title,price,description,features,ispopular,icon)
        
    //     .then(res.redirect('/allmeals'))
    //     .catch(err => res.status(400).json({ err }));
},

// UPDATE MEAL
updateMeal(title,ingredients,price,description,cookingtime,servings,calories,category,istopmeal,image,id,res){
    // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
   
    MealModel.findOneAndUpdate({title:{$eq:id}}, 
        {title:title,ingredients:ingredients,price:price,description:description,cookingtime:cookingtime,servings:servings,calories:calories,category:category,istopmeal:istopmeal,image:image}, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                //res.send(data);
                res.redirect('/allmeals');
               // console.log("Data updated!");
            }
        });  


   },

// DELETE PLAN
deleteMeal(id, res){
    

    
    MealModel.remove({title:id}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/allmeals');
            }
        });  
        
  
} 
}