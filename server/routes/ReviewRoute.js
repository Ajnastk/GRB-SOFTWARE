const express = require('express');
const {forDescription} = require ('../controllers/reviewController') 
const {generateQrcode} = require ('../controllers/generateQrcode')
const router = express.Router();

router.post('/review-submit',forDescription);
router.get('/generate-qrcode',generateQrcode);


module.exports = router;