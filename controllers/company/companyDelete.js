const company_Register = require('../../models/company_register');
const companyDelete = async (req, res) => {
    try{
        const _id = req.user._id;
        if(!_id){
            return res.status(400).send();
        }
        const deleteUser = await company_Register.findByIdAndDelete(_id);
        console.log(`Account ${deleteUser.email} Deleted`);
        res.clearCookie('user'); // clears only from browser
        
        req.flash('delete','Account deleted successfully!')
        res.status(200).render('home',{message:req.flash('delete')});
    }catch(error){
        res.status(500).send(error);
    }
};
module.exports = companyDelete;