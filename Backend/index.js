require('dotenv').config()
const express = require('express')
const app = express()
const connection = require('./db')
connection()
const cors = require("cors")
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("server is ready to start")
})

// import routes
const freebooks = require('./routes/book.routes')
const Premiumbooks = require('./routes/premium.route')
const user = require('./routes/user.route')

app.use('/Api/users',user)
app.use('/Api/Books',freebooks)
app.use('/Api/PremiumBooks',Premiumbooks)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server start on port ${PORT}`)
})