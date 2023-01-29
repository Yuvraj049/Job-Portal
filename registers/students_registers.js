const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    confirmpassword:{
        type:String,
        required:true
    }
})

// to execute before the "await registerUser.save()" action
userSchema1.pre("save", async function(next){// to execute before "save"

    if(this.isModified("password")){ // if a user changes its password then only it will hash
        hashed_password = await bcrypt.hash(this.password,10); //this.password = the password of the current template
        console.log(`the current password is ${this.password} and hashed password is${hashed_password}`);
        this.password=hashed_password;
        this.confirmpassword=undefined; // will not store confirm password
        next(); // to execute the next line of code in app.js
    }

    
})

const student_signup_register = new mongoose.model("Student Register",userSchema1) 
// collection name

module.exports=student_signup_register;
