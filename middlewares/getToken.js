const jwt = require("jsonwebtoken");

const getToken = (user)=>{
    const payload={_id:user._id.toString()};
    const token = jwt.sign(payload,process.env.SECRET_TOKEN_KEY,{expiresIn:'1h'});
    return token;
}

module.exports = getToken;  