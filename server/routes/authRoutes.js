const express=require('express')
const router=express.Router();
const {Signup, Login}=require('../controllers/authController');
const authmiddlware = require('../middlewares/authmiddlware');

router.post('/admin-signup',Signup);
router.post('/admin-login',Login);


router.get('/protected-route',authmiddlware,(req,res)=>{
    res.status(200).json({message:'this is protected route',admin:req.admin})
})
module.exports=router;