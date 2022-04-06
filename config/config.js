// Set up mongoose connection


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
let dev_db_url = 'mongodb://localhost:27017/singla';
//let dev_db_url='mongodb+srv://mongouser:<password>@cluster0.tznuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//password:P@ssword4001
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;
