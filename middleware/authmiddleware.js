const jwt = require("jsonwebtoken");

const protect = (req,res,next) =>{
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({message: "No token provided"});
    }

    try{
        const decode = jwt.varify(token, process.env.JWT_SECRET)
        req.userCreated = decode.id;
        next();
    } catch(error){
        res.status(401).json({message: "Invalid token"});
    }
};

module.exports = protect;