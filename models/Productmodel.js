const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : { type : String , required : true , min : 1 , max : 250 },
    price : { type : String , required : true },
},{
    timestamps : true
});

module.exports = mongoose.model('Product',productSchema);