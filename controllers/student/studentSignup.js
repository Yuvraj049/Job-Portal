const bcrypt = require('bcryptjs');
const student_Register = require('../../models/student_register.js');
const getToken = require('../../middlewares/getToken.js');
const studentRegister = async (req, res) => {
    try{
        const hashed_password = await bcrypt.hash(req.body.password,10);
        const newUser = new student_Register({
            name:req.body.name,
            email:req.body.email,
            age:req.body.age,
            gender:req.body.gender,
            cpi:req.body.cpi,
            batch:req.body.batch,
            techstack:req.body.techstack,
            password:hashed_password
        })
        console.log(`\nUser Registered\n ${newUser}`);

        // create a JWT token with payload and expiry
        const token = getToken(newUser);
        console.log(`\nToken :- ${token}`);

        // store in cookies
        res.cookie("user", token, { maxAge: 3600000, httpOnly: true }); //cookie name and value of cookie // httpOnly so that cookie is not accesible by javascript

        //save data to database
        await newUser.save();
        res.status(201).render("student_profile",{user_info:newUser,message:''}) // 201 status code if we create something
        }catch(error){
            req.flash('already_email','The Account is already registered, Login to continue!')
            res.status(400).render("student_signup",{message:req.flash('already_email')});
        }
};
module.exports = studentRegister;