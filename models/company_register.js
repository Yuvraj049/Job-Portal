const mongoose = require('mongoose');
const userSchema2 = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    position_required:{
        type:String,
        required:true
    },
    required_cpi:{
        type:mongoose.Types.Decimal128,
        required:true
    },
    package:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const company_signup_register = new mongoose.model("Company Register",userSchema2) 
// collection name

module.exports=company_signup_register;
