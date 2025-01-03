

const ReviewModel = require("../model/Review");
const AdminModel = require("../model/AdminSchema");

const forDescription = async (req, res) => {
  try {
    const { rating, description } = req.body;
    const adminId = req.params.adminId;

    if (!adminId) {
      return res.status(400).json({ error: "AdminId is not found" });
    }

    if (rating <= 3) {
      // Save review for ratings 3 or below
      if (!description || description.trim() === "") {
        return res.status(400).json({
          error: "Cannot submit a review without a description for ratings 3 or below.",
        });
      }

      const newReview = new ReviewModel({
        description: description.trim(),
        rating: rating,
        adminId: adminId,
      });

      await newReview.save();
      return res.status(200).json({ message: "Review submitted successfully." });
    } else if (rating >= 4) {
      const adminData = await AdminModel.findById(adminId);
      if (!adminData || !adminData.googlelink) {
        return res.status(500).json({ error: "Google review link is not configured." });
      }

      return res.status(200).json({ redirectUrl: adminData.googlelink });
    }
  } catch (error) {
    console.error("Error submitting review:", error.message);
    return res.status(500).json({ error: "An error occurred while submitting the review." });
  }
};

const getReviews = async (req, res) => {
  try {
    const adminId = req.params.adminId;

    if (!adminId) {
      return res.status(400).json({ error: "Admin Id is required" });
    }

    const reviews = await ReviewModel.find({ adminId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};

module.exports = { forDescription, getReviews };