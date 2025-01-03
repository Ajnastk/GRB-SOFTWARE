const express = require('express');

const {forDescription , getReviews } = require ('../controllers/reviewController') 
const { authMiddlware } =require('../middlewares/authmiddlware')
const router = express.Router();

router.post('/review-submit/:adminId',forDescription);
router.get('/review',getReviews)


module.exports = router;