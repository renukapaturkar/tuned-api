const jwt = require('jsonwebtoken');
const {findUserById} = require('../controllers/auth.controller.js');
const userTokenKey = process.env.TOKEN_KEY;


const authVerify = async(req, res, next) => {
    const token = req.headers.authorization;

    try {
        let {userId} = jwt.verify(token, userTokenKey);
        const user = await findUserById(userId);
        if(user){
            req.user = user;
            return next();
        }
        throw new error("Unauthorized request")
    
    }catch(error){
        res.status(401).json({success: true, message: "Unauthorized request"})
    }
}

module.exports = {authVerify}