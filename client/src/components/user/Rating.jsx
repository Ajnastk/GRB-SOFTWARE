import { useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "./TextInput";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { adminId } = useParams();

  const backendUrl =
    import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000/";

  const handleRatingChange = async (rating) => {
    setSelectedRating(rating);
    setIsVisible(rating <= 3);

    if (rating >= 4) {
      try {
        const response = await fetch(`${backendUrl}api/review-submit/${adminId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating }),
        });

        const result = await response.json();
        if (response.ok && result.redirectUrl) {
          window.location.href = result.redirectUrl; // Redirect immediately
        } else {
          alert(`Error: ${result.error || "Unable to redirect to Google review page"}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while redirecting to the Google review page.");
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedRating <= 3 && (!textInput || textInput.trim() === "")) {
      alert("Please provide a description for ratings 3 or below.");
      return;
    }

    const reviewData = { rating: selectedRating, description: textInput.trim() };

    try {
      const response = await fetch(`${backendUrl}api/review-submit/${adminId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        handleCancel();
      } else {
        const errorData = await response.json();
        alert(`Failed to submit review: ${errorData.error || "Server error"}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while submitting your review.");
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
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
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
          />
        )}
      </div>
    </div>
  );
};

export default Rating;