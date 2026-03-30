const express = require("express")
const router = express.Router()

const usercontroller = require('../controller/user.controller')

router.post('/signup',usercontroller.Signup)
router.post('/Login',usercontroller.Login)

module.exports = router