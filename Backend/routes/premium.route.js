const express = require('express')
const router = express.Router()

//import Books controllers
const Bookcontroller = require('../controller/PremiumBook.controller')

//Free Books routes
router.post('/creat',Bookcontroller.creatBook)
router.get('/books',Bookcontroller.allBooks)
router.get('/books/:id',Bookcontroller.findbook)
router.put('/update/:id',Bookcontroller.updatebook)
router.delete('/delete/:id',Bookcontroller.deleteBook)

module.exports = router
