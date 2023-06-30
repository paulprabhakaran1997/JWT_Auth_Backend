const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : { type : String , required : true , min : 1 , max : 250 },
    email : { type : String , required : true },
    password : { type : String , required : true }
});

module.exports = mongoose.model('User',userSchema);