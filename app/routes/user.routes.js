const express= require('express')
const router = express.Router();
const usercontroller= require('../controllers/user.controller.js');
const permit = require('../middleware/permit.js');


router.get('/allusers',permit.IsAdmin, usercontroller.GetUsers)
router.get('/profile',permit.IsUser, usercontroller.GetProfile)
router.get('/:userid', usercontroller.GetUser)

router.post('/new', usercontroller.NewUser)

router.delete('/delete/:userid', usercontroller.DeleteUser)

router.put('/update/:userid', usercontroller.UpdateUser)


module.exports=router;
