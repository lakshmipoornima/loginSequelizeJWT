const express=require('express')
const router=express.Router()
const controller=require('../controllers/userController');
const passport=require('passport')
const {authenticate}=require('../middlewares/authenticate')

router.route('/create').post(controller.createUser);
router.route('/login').post(controller.loginUser);
router.route('/home').get(authenticate,controller.getHome)


module.exports=router;