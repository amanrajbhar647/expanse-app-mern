const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

//router object create krrege 
const router = express.Router();


//routers
//post || login USER
router.post('/login',loginController)


// post || RREGISTER USER
router.post('/register',registerController )


module.exports = router;