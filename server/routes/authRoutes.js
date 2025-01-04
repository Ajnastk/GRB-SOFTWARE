const express=require('express')
const router=express.Router();
const {Signup, Login}=require('../controllers/authController');
const { authMiddleware } =require('../middlewares/authmiddlware')

router.post('/admin-signup',Signup);
router.post('/admin-login',Login);


module.exports=router;