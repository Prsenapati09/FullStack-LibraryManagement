const mongoose = require('mongoose')

const connection = ()=>{

    mongoose.connect(process.env.MONGODB_URL)

    const connect = mongoose.connection

    connect.on("connected",()=>{
        console.log("Database connected")
    })
    connect.on("disconnected",()=>{
        console.log("Database not connected")
    })
    connect.on("error",(err)=>{
        console.log(err)
    })
    
}

module.exports = connection