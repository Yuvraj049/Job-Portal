const companyLogout = async (req, res) => {
    try{
        res.clearCookie('user'); // clears only from browser
        console.log(`\nLogged Out successfully`);
        req.flash('logout','Logged out successfully!');
        res.status(201).render('home',{message:req.flash('logout')});
    }catch(error){
        res.status(500).send(error);
    }
};
module.exports = companyLogout;