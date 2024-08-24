const mongoose = require('mongoose');

const personSchema =     new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required: true
    },
    mobiles:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }

})

// compile our model using the schema
module.exports = mongoose.model('Person', personSchema);