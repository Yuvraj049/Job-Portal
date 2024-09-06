const jwt = require("jsonwebtoken");

const auth_student = async (req,res,next)=>{
    try{
        const token = req.cookies.user; // current token value of the user
        const payload = jwt.verify(token,process.env.SECRET_TOKEN_KEY); // verify the token
        console.log(`\n Token Verified\n User Id :- ${payload._id}`);
        req.user = payload;
        next();
    }catch(error){
        res.status(401).send(error);
    }
}

module.exports = auth_student;