const user = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authmiddleware(res,req,next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]


    if(!token){
        return res.status(401).json({
            message : "unauthorized authentication and cookies is missing   "
        })
    }


    try{
        const decoded = jwt.verify(token,"XoLuD67l8BnbUV64s2CyCoW7w3YDKfgOejj5b0");
        const user  = await user.findById(decoded.Id);
        req.user = user;
        return next()
    }

    catch(err){
         return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })

    }
}


async function authSystemUserMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split("")[1];

    if(!token){
        return res.status(401).json({
            message : "autherization will be failed"
        })
    }


    try{
        const decoded = jwt.verify(token,"XoLuD67l8BnbUV64s2CyCoW7w3YDKfgOejj5b0");
        const user  = await user.findById(decoded.Id);
        req.user = user;
        return next()
    }

    catch(err){
         return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })

    }
}
module.exports = {authmiddleware,
    authSystemUserMiddleware
}