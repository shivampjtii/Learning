const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

const authRoute = express.Router();


authRoute.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;
    const isUser = await userModel.findOne({email});
    if(isUser){
        return res.status(400).json({
            message:"email already exists",
            user:isUser.email
        })
    }

    
    const user = await userModel.create({
        name,
        email,
        password
    })
    
    const token = jwt.sign({
        email:user.email,
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(201).json({
        message:"User created Successfully",
        name:user.name,
        email:user.email,
        token
    })
})

authRoute.get("/get", async (req,res)=>{
    const token = req.cookies.token;

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        name:user.name,
        email:user.email
    })

})

authRoute.post("/login", async (req,res)=>{
    const {email,password} = req.body;

    const isUser = await userModel.findOne({email});
    if(!isUser){
        return res.status(400).json({
            message:"No user exists"
        })
    }

    console.log(isUser.id);

    const token = jwt.sign({
        id:isUser._id,
        email:isUser.email
    }, process.env.JWT_SECRET)

    if(email===isUser.email && password===isUser.password){
        res.status(200).json({
            message:"user logged in successfully",
            token
        })
    }else{
        res.status(400).json({
            message:"Incorrect"
        })
    }
})


module.exports = authRoute