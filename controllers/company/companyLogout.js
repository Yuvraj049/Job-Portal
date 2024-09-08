const companyLogout = async (req, res) => {
    try{
        res.clearCookie('user'); // clears only from browser
        console.log(`\nLogged Out successfully`);
        req.flash('success',{type:'success',content:'Logged out successfully!'});
        res.status(200).redirect('/');
    }catch(error){
        res.status(500).send(error);
    }
};
module.exports = companyLogout;