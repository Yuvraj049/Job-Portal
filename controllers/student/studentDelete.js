const student_Register = require('../../models/student_register');
const studentDelete = async (req, res) => {
    try{
        const _id = req.user._id;
        if(!_id){
            return res.status(400).send();
        }
        const deleteUser = await student_Register.findByIdAndDelete(_id);
        console.log(`\nAccount ${deleteUser.email} Deleted`);
        res.clearCookie('user'); // clears only from browser
        
        req.flash('success',{type:'success',content:'Account deleted successfully!'});
        res.status(200).redirect('/');
    }catch(error){
        res.status(500).send(error);
    }
};
module.exports = studentDelete;