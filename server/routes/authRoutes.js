const express=require('express')
const router=express.Router();
const {login,Signup}=require('../controllers/  authController');

router.post('/admin-signup',Signup);
router.post('/admin-login',login);

module.exports=router;