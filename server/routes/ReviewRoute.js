const express = require('express');

const {forDescription , getReviews } = require ('../controllers/reviewController') 
const { authMiddleware } =require('../middlewares/authmiddlware')
const router = express.Router();

router.post('/review-submit/:adminId',forDescription);
router.get('/review',authMiddleware,getReviews)


module.exports = router;