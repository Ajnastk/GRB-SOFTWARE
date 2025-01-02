const ReviewModel = require("../model/Review");
const AdminModel = require("../model/AdminSchema"); // Assuming you have the Admin schema

const forDescription = async (req, res) => {
  try {
    const { rating, description} = req.body;

    const adminId =req.params.adminId;

    console.log('AdminId is',adminId);

    if(!adminId){
      return res.status(400).json({error:'AdminId is not found'});
    }

    if (rating <= 3) {
      // Save review for ratings 3 or below
      if (!description || description.trim() === "") {
        console.error(
          "Validation failed: Description is required for ratings 3 or below."
        );
        return res.status(400).json({
          error:
            "Cannot submit a review without a description for ratings 3 or below.",
        });
      }

      // Save the review in the database
      const newReview = new ReviewModel({
        description: description.trim(),
        rating: rating,
        adminId:adminId,
      });

      await newReview.save();
      return res.status(200).json("Review submitted successfully.");
    } else if (rating >= 4) {
      // Redirect to the Google review link for ratings 4 or above
      const adminData = await AdminModel.findOne({_id:adminId}); // Assuming there's one admin record in your database
      console.log('admin data is',adminData);
      if (!adminData || !adminData.googlelink) {
        console.error("Admin Google review link is missing.");
        return res.status(500).json({
          error: "Google review link is not configured.",
        });
      }
      console.log('redirect url is this:',adminData.googlelink);
      // Respond with the Google link for front-end redirection
      return res.status(200).json({
        redirectUrl: adminData.googlelink,
      });
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    return res.status(500).json({
      error: "An error occurred while submitting the review.",
    });
  }
};


const getReviews = async (req, res) => {
  try {
    const adminId =req.params.adminId;

    console.log('admin id is ',adminId)
     if (!adminId) {
      return res.status(400).json({ error: "Admin Id is required" });
    }
    const reviews = await ReviewModel.find({adminId}); // Fetch all reviews from the database
    console.log("Reviews fetched for admin:", reviews);
    
    res.status(200).json(reviews); // Return the reviews as JSON
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};


module.exports = { forDescription, getReviews };

