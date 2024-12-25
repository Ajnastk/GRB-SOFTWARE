const ReviewModel = require ('../model/Review')
const Admin = require('../model/AdminSchema');

const forDescription = async(req,res)=>{
    try{
    const {rating,description} = req.body;

    if (rating <= 3 && (!description || description.trim() === "")) {
        console.error("Validation failed:description is required for rating");
        return res.status(400).json({
            error: "Cannot submit a review without a description for ratings"
        });
    }
    
    const admin = await Admin.findOne();
    console.log('Admin document',admin);
    if(!admin || !admin.googlelink ){
        console.log('Google link not found in admin setting');
        return res.status(500).json({error:"Google link not configured by admin"});
    }

    const { googlelink } =admin;

    if(rating >=4){
        console.log('Good review recieved');
        return res.status(200).json({message:'Good review submitted',redirect:true,url:googlelink})
   
    }
    const newReview = new ReviewModel({description:description?.trim(),rating:rating});
    await newReview.save();
    

    return res.status(200).json("Review submitted");
    
} catch(error){
    console.error("Error submiting",error);
    return res.status(500).json({ error: "An error occurred while submitting the review." });
}
}


module.exports = {forDescription} 