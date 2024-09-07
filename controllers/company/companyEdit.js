const company_Register = require('../../models/company_register');
const companyEdit = async(req,res)=>{
    console.log(req.user);
    const user_id = req.user._id;
    if(!user_id){
        return res.status(400).send(error);
    }
    const updates = req.body; 
    const user_info = await company_Register.findOne({_id:user_id});
    try{
        const updateUser = await company_Register.findByIdAndUpdate(user_id,updates);
        console.log(`\nAccount ${updateUser.email} Updated`);
        req.flash('success',{type:'success',content:'Account updated successfully!'});
        res.status(201).redirect('/company_profile');
    }catch(error){
        req.flash('warning',{type:'warning',content:'Account already exists in the Database!'});
        res.status(403).redirect('/company_profile');
    }
};
module.exports = companyEdit;   