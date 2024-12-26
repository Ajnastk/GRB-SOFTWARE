const jwt=require('jsonwebtoken');
require('dotenv').config();

const authMiddlware= async(req,res,next)=>{

    try {
        const authHeader=req.header('authorization');
        console.log('authheader iis',authHeader);
        if(!authHeader){
            console.error("Authorization header is missing");
            return res.status(401).json({error:'Authorization token is required'});
        }
        const token=authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({error:'Access denied'});
        };

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log('Decoded token:',decoded);
        req.admin={adminId : decoded.adminId};
        next();
    } catch (error) {
        res.status(401).json({message:'Invalid token'});
        console.error(error.message);
    }
}
module.exports ={authMiddlware}