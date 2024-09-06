const bcrypt = require('bcryptjs');
const company_Register = require('../../models/company_register');
const getToken = require('../../middlewares/getToken.js');
const companyLogin = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await company_Register.findOne({email:email});
        const is_password_match = await bcrypt.compare(password,user.password);

        if(is_password_match){
            const token = getToken(user);
            console.log(`\nToken :- ${token}`);
            res.cookie("user", token, { maxAge: 3600000, httpOnly: true });
            res.status(201).render("company_profile",{user_info:user,message:''});
        }else{
            req.flash('password_not_match', 'Wrong Password!');
            res.status(201).render("company_login",{message:req.flash('password_not_match')});
        }
        
    }catch(error){
            req.flash('no_email','Account not found in the Database!')
            res.status(201).render("company_login",{message:req.flash('no_email')});
    }
};
module.exports = companyLogin;