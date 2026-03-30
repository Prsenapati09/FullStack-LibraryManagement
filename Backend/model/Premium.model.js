const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    Bookname:{
        type:String,
        unique:true,
        required:true 
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    publishYear:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    SourceUrl:{
        type:String,
        require:true,
    }
    
},{timestamps:true})

const Book = mongoose.model('PremiumBooks',bookSchema)
module.exports = Book