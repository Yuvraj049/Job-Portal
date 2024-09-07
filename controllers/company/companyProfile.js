const company_Register = require('../../models/company_register');
const companyProfile = async (req, res) => {
    const user_id = req.user._id;
    const user = await company_Register.findOne({_id:user_id});
    res.status(200).render("company_profile", { user_info: user, message: req.flashMessage });
};
module.exports = companyProfile;