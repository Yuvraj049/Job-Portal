const student_Register = require('../../models/student_register');  
const company_Register = require('../../models/company_register');
const eligibleCompanies = async (req, res) => {
    try{
        const user_id = req.user._id;
        const user_info = await student_Register.findOne({_id:user_id});
        if(!user_id){
            return res.status(400).send();
        }
        const comp_data = await company_Register.find({required_cpi:{$lte:user_info.cpi}});
        res.status(200).render("eligible_companies",{comp_data:comp_data,message:req.flashMessage});
    }catch(error){
        res.status(500).send(error.message);
    }
};
module.exports = eligibleCompanies;