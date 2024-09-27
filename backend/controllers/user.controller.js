const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignup = async(req,res)=>{
    try {
        let {name,email,password, role} = req.body
        let user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({message:"User Already Exist"})
        }

        let hashedPassword = await bcrypt.hash(password,5)

        let newUser = userModel({
            name,
            email,
            password:hashedPassword,
            role 
        })

        await newUser.save()
        res.status(201).json({message:"User Created Successfully"})

    } catch (error) {
        res.status(500).json({error, details:error.message})
    }
}

const userLogin = async(req,res)=>{
    try {
        let {email, password} = req.body

        let user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({message:"Register First"})
        }

        let comparedPassword = await bcrypt.compare(password,user.password)

        if(!comparedPassword){
            return res.status(400).json({message:"Invalid Password"})
        }

        const token = jwt.sign({userId : user._id, role: user.role},process.env.JWT_SECRET,{expiresIn : "1 hr"})

        res.status(201).json({message:"User Logged in Successfully",token})


    } catch (error) {
        res.status(500).json({error,details:error.message})
    }
}

module.exports = {userSignup, userLogin}