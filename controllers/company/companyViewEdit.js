const company_Register = require('../../models/company_register');
const companyViewEdit = async (req,res) => {
    try{
        const user_id = req.user._id;
        if(!user_id){
            return res.status(400).send();
        }
        const user_info = await company_Register.findOne({_id:user_id});
        res.status(201).render("company_edit",{user_info:user_info,message:''})
    }catch(error){
        res.status(500).send(error.message);
    }
}
module.exports = companyViewEdit;