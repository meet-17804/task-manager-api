const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req,res) => {
    try{
        const {name, email, password} = req.body;
         console.log("Incoming:", req.body);

         // check existing user
         const existingUser = await User.findOne({email : email.toLowerCase()});
         if(existingUser){
            return res.status(400).json({message : "User already existed"});
         };
         // hash password
         const hashedPassword = await bcrypt.hash(password,10);

          // create user
          const creatUser = await User.create({
            name,
            email : email.toLowerCase(),
            password : hashedPassword
          });
          res.json({message : "User registerd successfully"}, creatUser);
    } catch(error){
        console.log(error.message);
        res.status(500).json({error : error.message});
    };
}

const login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const userCreated = await User.findOne({email});
        if(!userCreated){
            return res.status(400).json({message: "Invalid credentials"});
        } 

        // compare password
        const isMatch = await bcrypt.compare(password, userCreated.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        };

        // create token
        const token = jwt.sign(
            {id :userCreated._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({message: "Login successfully", token});
    } catch(error){
    res.status(500).json({error: error.message});
    }

};

module.exports = {
    register,
    login
};