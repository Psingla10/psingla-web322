
const { Decimal128, ObjectId } = require('mongodb');
var mongoose=require('mongoose');
var MealsSchema = new mongoose.Schema({
    
    title:String,
    ingredients:String,
    price:Decimal128,
    decscription:String,
    category:String,
    cookingtime:String,
    servings:String,
    calories:String,
    istopmeal:Boolean,
    image:String

    
});
  
module.exports = mongoose.model(
    'meal', MealsSchema, 'MealKits');