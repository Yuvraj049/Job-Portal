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
        res.cookie("student", token, { maxAge: 3600000, httpOnly: true }); //cookie name and value of cookie // httpOnly so that cookie is not accesible by javascript

        //save data to database
        await newUser.save();
        req.flash('success',{type:'success',content:'Signed up successfully!'});
        res.redirect('/student_profile');
        }catch(error){
            req.flash('warning',{type:'warning',content:'Account already exists, Login to continue!'});
            res.status(400).redirect('/student_signup');
        }
};
module.exports = studentRegister;