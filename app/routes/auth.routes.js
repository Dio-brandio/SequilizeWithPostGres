const express= require('express')
const router = express.Router();
const authcontroller = require('../controllers/auth.controller.js');
const usercontroller = require('../controllers/user.controller.js');


router.post('/login', authcontroller.Authenticate)
router.post('/register', usercontroller.NewUser)


module.exports=router;
