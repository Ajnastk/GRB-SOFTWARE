const express = require('express');
const {forDescription , getReviews } = require ('../controllers/reviewController') 
const router = express.Router();

router.post('/review-submit',forDescription);

router.get('/review',getReviews)

module.exports = router;