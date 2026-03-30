const model = require('../model/Books.model')

const creatBook = async (req,res)=>{

    try{
        const {Bookname,author,description,publishYear,image,Url} = req.body
    
        const newBook = model.create({Bookname,author,description,publishYear,image,Url})
    
        if(!newBook){
            res.status(400),json({
                success:false,
                message:"Book not create"
            })
        }
    
        res.status(201).json({
            success:true,
            message:"Book create successfully"
        })
    }catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Error you can't register"
        })
    }

}

const allBooks = async (req,res)=>{

    try {
        const books = await model.find({})
        if(!books){
            res.status(404).json({
                success:false,
                message:"Books Not found try again"
            })
        }
        
        res.status(200).json({
            success:true,
            message:"Books found Successfully",
            lenght:books.length,
            books:books
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Error you can't see the books"
        })
    }

}

const findbook = async (req,res)=>{

    try {
        
        const id = req.params.id
    
        const findBook = await model.findById(id)
    
        if(!findBook){
            res.status(400).json({
                success:true,
                message:"Book not found"
            })
        }
    
        res.status(200).json({
            success:true,
            message:"Book found Successfully",
            Book:findBook
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Error you can't find the book"
        })
    }

}

const updatebook = async (req,res)=>{
    try{

        const id = req.params.id
    
        const update = req.body
    
        const findBook = await model.findByIdAndUpdate(id,update)
    
        if(!findBook){
            res.status(400).json({
                success:true,
                message:"Book not update"
            })
        }
    
        res.status(200).json({
            success:true,
            message:"Book update Successfully",
        })
    }catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Error you can't change the  password"
        })
    }

}

const deleteBook = async (req,res)=>{
    try{

        const id = req.params.id
    
        const Bookdelet = await model.findByIdAndDelete(id)
    
        if(Bookdelet){
            res.status(200).json({
                success:true,
                message:"Book deleted successfully"
            })
        }
    }catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Error you can't delete the  book"
        })
    }
}

module.exports ={
    creatBook,
    allBooks,
    findbook,
    updatebook,
    deleteBook
}