const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username required"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    password:{
        type:String,
        required:true
    },
})

const user = mongoose.model('Users',userSchema)
module.exports = user