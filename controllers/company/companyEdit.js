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
        req.flash('updated','Account updated sucessfully!');

        res.status(201).render("company_profile",{user_info:updates,message:req.flash('updated')});
    }catch(error){
        req.flash('taken_email','Account already exists in the Database!')
        res.status(201).render("company_edit",{user_info:user_info,message:req.flash('taken_email')});
    }
};
module.exports = companyEdit;   