const company_Register = require('../../models/company_register.js');
const bcrypt = require('bcryptjs');
const getToken = require('../../middlewares/getToken.js');
const companyRegister = async (req, res) => {
    try{
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
        res.cookie("company", token, { maxAge: 3600000, httpOnly: true }); //cookie name and value of cookie // httpOnly so that cookie is not accesible by javascript

        //save data to database
        await newUser.save();
        req.flash('success',{type:'success',content:'Signed up successfully!'});
        res.redirect('/company_profile');
    }catch(error){
        req.flash('warning',{type:'warning',content:'Account already exists, Login to continue!'});
        res.status(400).redirect('/company_signup');
    }
};
module.exports = companyRegister;