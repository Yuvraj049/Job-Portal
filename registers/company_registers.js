const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    required_age:{
        type:Number,
        required:true
    },
    required_cpi:{
        type:Number,
        required:true
    },
    website:{
        type:String,
        required:true,
        unique:true
    },
    position_required:{
        type:String,
        required:true
    },
    package:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const company_signup_register = new mongoose.model("Company Register",userSchema) 
// collection name

module.exports=company_signup_register;
