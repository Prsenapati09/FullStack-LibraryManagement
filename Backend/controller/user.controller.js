const model = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
// const { useReducer } = require("react")

const Signup = async (req,res)=>{
    
    const {username,email,role,password} = req.body

    const existUser = await model.findOne({username,email})

    if(existUser){
        return  res.status(400).json({
            success:false,
            message:"User already exist"
        })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)

    const hashpassword = await bcrypt.hash(password,salt)

    const Newuser = await model.create(
        {
            username,
            email,
            role,
            password:hashpassword
        })
    if(!Newuser){
        return res.status(400).json({
            success:false,
            message:"User not register try again"
        })
    }

    res.status(201).json({
            success:true,
            message:"User created Successfully"
        })
}

const Login = async (req,res)=>{

    const {username,password} = req.body
    const userFind= await  model.findOne({username})

    if(!userFind){
        return res.status(404).json({
            success:true,
            message:"Invalid User Name !"
        })
    }
    
    const comparePassword = await bcrypt.compare(password,userFind.password)
    
    if(!comparePassword){
        return res.status(404).json({
            success:true,
            message:"Wrong Password !"
        })
    }

    // genrate token 

    const payload = {
        id :userFind._id,
        username:userFind.username,
        role:userFind.role,
        password:userFind.password
    }
    const Secret = process.env.JWT_SECRET
    const token = await jwt.sign(payload,Secret)

    return res.status(200).json({
        success:true,
        message:"Login Sucessfully",
        token:token,
        user: {
                _id: userFind._id,
                fullname: userFind.fullname,
                email: userFind.email,
                role: userFind.role,
        }
        // data:userFind
    })
}

module.exports = {
    Signup,
    Login
}