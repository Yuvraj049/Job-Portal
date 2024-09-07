const student_Register = require('../../models/student_register');
const studentProfile = async (req, res) => {
    const user_id = req.user._id;
    const user = await student_Register.findOne({_id:user_id});
    console.log(user);
    res.status(200).render("student_profile", { user_info: user, message: req.flashMessage });
};
module.exports = studentProfile;