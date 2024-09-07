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
            res.cookie("company", token, { maxAge: 3600000, httpOnly: true });
            req.flash('success',{type:'success',content:'Login Successful!'});
            res.redirect('/company_profile');
        }else{
            req.flash('error',{type:'error',content:'Password not matched!'});
            res.redirect('/company_login');
        }
    }catch(error){
            req.flash('error',{type:'error',content:'Account not found in the Database!'});
            res.redirect('/company_login');
    }
};
module.exports = companyLogin;