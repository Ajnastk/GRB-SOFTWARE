const QrCode = require('qrcode');


const generateQrcode = async (req,res)=>{
    try{
        const {Id}=req.params;

        const url = `https://yourapp.com/shop/${Id}`

        const qrCodeDataURL = await QrCode.toDataURL(url);

        res.status(200).json({ qrCode: qrCodeDataURL });
    }catch(error){
        console.error('Error generating qr code',error);
        res.status(500).json({ error: 'Failed to generate QR Code' });
    }
}


module.exports = {generateQrcode} 