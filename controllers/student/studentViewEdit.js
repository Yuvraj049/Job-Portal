const student_Register = require('../../models/student_register');
const studentViewEdit = async(req,res)=>{
    try{
        const userId = req.user._id;
        if(!userId){
            return res.status(400).send();
        }
        const user_info = await student_Register.findOne({_id:userId});
        res.status(200).render("student_edit",{user_info:user_info,message:req.flashMessage})
    }catch(error){
        res.status(500).send(error.message);
    }
};
module.exports = studentViewEdit;   