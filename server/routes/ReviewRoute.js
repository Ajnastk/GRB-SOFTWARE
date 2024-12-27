const express = require('express');

const {forDescription , getReviews } = require ('../controllers/reviewController') 
const { authMiddlware } =require('../middlewares/authmiddlware')
const router = express.Router();

router.post('/review-submit',authMiddlware,forDescription);
router.get('/review',authMiddlware,getReviews)


module.exports = router;