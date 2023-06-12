

const express= require('express')
const router = express.Router();
const permissioncontroller= require('../controllers/permission.controller.js');


router.get('/all', permissioncontroller.GetPermissions)
router.post('/new', permissioncontroller.NewPermission)


module.exports=router;
