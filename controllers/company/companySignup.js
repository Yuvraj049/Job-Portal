const company_Register = require('../../models/company_register.js');
const bcrypt = require('bcryptjs');
const getToken = require('../../middlewares/getToken.js');
const companyRegister = async (req, res) => {
    try{
        console.log(req.body);
        console.log(company_Register);
        const hashed_password = await bcrypt.hash(req.body.password,10);
        console.log(hashed_password);
        const newUser = new company_Register({
            name:req.body.name,
            email:req.body.email,
            required_cpi:req.body.req_cpi,
            website:req.body.website,
            position_required:req.body.post,
            package:req.body.package,
            description:req.body.description,
            address:req.body.address,
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
        res.status(201).render("company_profile",{user_info:newUser,message:''}); // 201 status code if we create something
    }catch(error){
        req.flash('already_email','The Company is already registered, Login to continue!')
        res.status(201).render("company_signup",{message:req.flash('already_email')});
    }
};
module.exports = companyRegister;