import { useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../user/TextInput";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { adminId } = useParams();

  const handleSubmit = async (rating) => {
    const reviewData = {
      rating,
      description: rating <= 3 ? textInput.trim() : undefined,
    };

    // Ensure the description is provided for ratings 3 or below
    if (rating <= 3 && (!textInput || textInput.trim() === "")) {
      alert("Please provide a description for ratings 3 or below.");
      return;
    }

    const backendUrl =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3000/";

    try {
      const response = await fetch(
        `${backendUrl}api/review-submit/${adminId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (rating >= 4 && result.redirectUrl) {
          // Redirect for ratings 4 and above
          window.location.href = result.redirectUrl;
        } else {
          // Alert success for ratings 3 and below
          alert("Review submitted successfully!");
          handleCancel();
        }
      } else {
        alert(`Failed to submit review: ${result.error || "Server error"}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while submitting your review.");
    }
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    setIsVisible(rating <= 3); // Show input for ratings 3 or below

    if (rating >= 4) {
      handleSubmit(rating); // Directly handle submission for 4 or 5 stars
    }
  };

  const handleCancel = () => {
    setTextInput("");
    setSelectedRating(0);
    setIsVisible(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div
        className={`p-8 bg-white border-4 border-gray-300 rounded-lg shadow-lg transition-all duration-300 ${
          isVisible ? "w-[500px] h-[600px]" : "w-[500px] h-[200px]"
        }`}
      >
        {/* Star Rating */}
        <div className="mt-6 flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`mask mask-star-2 cursor-pointer ${
                selectedRating >= star ? "bg-orange-400" : "bg-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
              style={{ width: "50px", height: "50px", margin: "0 5px" }}
            ></div>
          ))}
        </div>

        {/* Text Input */}

        {isVisible && (
          <TextInput
            value={textInput}
            onChange={(value) => setTextInput(value)}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            isVisible={isVisible}
          />
        )}
      </div>
    </div>
  );
};

export default Rating;
