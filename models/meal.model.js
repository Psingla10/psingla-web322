const db = require('../config/config');

// EMPTY OBJECT

const Meals = {};

// GET ALL PLANS

Meals.get = () => {
    return db.any('SELECT * FROM meals order by id desc');
}

Meals.getMeal= (id) => {
    return db.any('SELECT * FROM meals where id=$1',id);
}

// CREATE MEAL
Meals.create = (title,ingredients,description,category,price,cookingtime,servings,calories,istopmeal,image) => {

    return db.none(`INSERT into Meals(title, ingredients,description,category,price,cookingtime,servings,calories,istopmeal,image)` + `VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10)`, 
    [title, ingredients,description,category,price,cookingtime,servings,calories,istopmeal,image]);
}
// UPDATE A MEAL
Meals.update = (title, ingredients,description,category,price,cookingtime,servings,calories,istopmeal,image,mealID) => {
   
    return db.none(`UPDATE plans SET title = $1, ingredients = $2, description=$3, category=$4,price=$5,cookingtime=$6,servings=$7,calories=$8,istopmeal=$9,image=$10 WHERE id = $11`, [title, ingredients,description,category,price,cookingtime,servings,calories,istopmeal,image,mealID]);
}

// DELETE AN ARTICLE
Meals.delete = mealID => {
    return db.none(`DELETE from meals WHERE id = $1`, mealID);
}
module.exports = Meals;