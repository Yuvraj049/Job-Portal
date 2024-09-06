const mongoose = require('mongoose');
const userSchema1 = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    cpi:{
        type:Number,
        required:true
    },
    batch:{
        type:Number,
        required:true
    },
    techstack:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
// collection name
const student_signup_register = new mongoose.model("Student Register",userSchema1) 

module.exports=student_signup_register;
