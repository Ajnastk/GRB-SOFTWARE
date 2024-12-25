const express = require('express');
const {forDescription} = require ('../controllers/reviewController') 
const router = express.Router();

router.post('/review-submit',forDescription);



module.exports = router;