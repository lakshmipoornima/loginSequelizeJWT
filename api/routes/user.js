const express=require('express')
const router=express.Router()
const controller=require('../controllers/userController');
const passport=require('passport')

router.route('/create').post(controller.createUser);
router.route('/login').post(controller.loginUser);
router.route('/home').get(passport.authenticate("jwt",{session:false}),controller.getHome)


module.exports=router;