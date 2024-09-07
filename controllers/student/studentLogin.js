const bcrypt = require('bcryptjs');
const student_Register = require('../../models/student_register');
const getToken = require('../../middlewares/getToken.js');
const studentLogin = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await student_Register.findOne({email:email});
        const is_password_match = await bcrypt.compare(password,user.password);
        
        if(is_password_match){
            const token = getToken(user);
            console.log(`\nToken :- ${token}`);
            res.cookie("student", token, { maxAge: 3600000, httpOnly: true });
            req.flash('success',{type:'success',content:'Login Successful!'});  // Store the flash message
            res.redirect('/student_profile');
        }else{
            req.flash('error', { type: 'error', content: 'Password not matched!' });
            res.status(200).redirect('/student_login'); 
        }
    }catch(error){
        req.flash('error', { type: 'error', content: 'Account not found in the Database!' });
        res.status(404).redirect('/student_login'); 
    }
};
module.exports = studentLogin;