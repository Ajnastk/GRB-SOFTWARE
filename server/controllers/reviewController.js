const ReviewModel = require ('../model/Review')

const forDescription = async(req,res)=>{
    try{
    const {rating,description} = req.body;

    if (rating <= 3 && (!description || description.trim() === "")) {
        console.error("Validation failed:description is required for rating");
        return res.status(400).json({
            error: "Cannot submit a review without a description for ratings"
        });
    }
    
    const newReview = new ReviewModel({description:description?.trim(),rating:rating});

    await newReview.save();

    return res.status(200).json("Review submitted");
    
} catch(error){
    // if (error.name === 'ValidationError') {
    //     return res.status(400).json({ error: error.message });
    // }
    console.error("Error submiting",error);
    return res.status(500).json({ error: "An error occurred while submitting the review." });
}
}


module.exports = {forDescription} 