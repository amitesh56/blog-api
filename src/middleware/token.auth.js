const jwt = require("jsonwebtoken")

async function verify(req,res,next) {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "please register first"
            })
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        if(!decode){
            return res.status(403).json({
                message : "forbiden"
            })
        }
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = verify