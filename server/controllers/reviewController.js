
const ReviewModel = require ('../model/Review')
const AdminModel = require ('../model/AdminSchema') // Assuming you have the Admin schema

const forDescription = async (req, res) => {
  try {
    const { rating, description } = req.body;

    if (rating <= 3) {
      // Save review for ratings 3 or below
      if (!description || description.trim() === "") {
        console.error("Validation failed: Description is required for ratings 3 or below.");
        return res.status(400).json({
          error: "Cannot submit a review without a description for ratings 3 or below.",
        });
      }

      // Save the review in the database
      const newReview = new ReviewModel({
        description: description.trim(),
        rating: rating,
      });

      await newReview.save();
      return res.status(200).json("Review submitted successfully.");
    } else if (rating >= 4) {
      // Redirect to the Google review link for ratings 4 or above
      const adminData = await AdminModel.findOne(); // Assuming there's one admin record in your database
      
      if (!adminData || !adminData.googlelink) {
        console.error("Admin Google review link is missing.");
        return res.status(500).json({
          error: "Google review link is not configured.",
        });
      }

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

module.exports = { forDescription };

