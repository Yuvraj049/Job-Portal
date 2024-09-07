const student_Register = require('../../models/student_register');
const studentEdit = async(req,res)=>{
    const user_id = req.user._id;
    if(!user_id){
        return res.status(400).send(error);
    }
    const updates = req.body;
    const user_info = await student_Register.findOne({_id:user_id});
    try{
        const updateUser = await student_Register.findByIdAndUpdate(user_id,updates);
        console.log(`\nAccount ${updateUser.email} Updated`);
        req.flash('success',{type:'success',content:'Account updated successfully!'});
        res.redirect('/student_profile');
    }catch(error){
        console.log(error.message);
        req.flash('warning',{type:'warning',content:'Account already exists in the Database!'});
        res.redirect('/student_profile');
    }
};
module.exports = studentEdit;