

const express= require('express')
const router = express.Router();
const rolecontroller= require('../controllers/role.controller.js');


router.get('/all', rolecontroller.GetRoles)
router.post('/new', rolecontroller.NewRole)


module.exports=router;
