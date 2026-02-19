const express = require("express");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req,res)=>{
    const {name,email,password} = req.body;
    const ifUserExists = await userModel.findOne({email});

    if(ifUserExists){
        return res.status(404).json({
            message: "Email already exists"
        })
    }

    
    const user = await userModel.create({
        name,
        email,
        password
    })
    
    const token = jwt.sign({
        id:user._id,
        email:user.email
    }, process.env.JWT_SECRET);

    res.cookie("jwtToken", token);

    res.status(201).json({
        message:"User created successfully",
        user,
        token
    })

})


module.exports = authRouter;