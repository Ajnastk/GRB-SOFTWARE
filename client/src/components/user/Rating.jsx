import { useState } from "react";
import TextInput from "./TextInput";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [textInput, setTextInput] = useState("");

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (selectedRating <= 3 && (!textInput || textInput.trim() === "")) {
      alert("Please provide a description for ratings 3 or below.");
      return;
    }

    const reviewData = {
      rating: selectedRating,
      description: textInput.trim(),
    };

    const token= localStorage.getItem('token');
    console.log('Token from local storage',token)
      if(!token){
        alert('You must be logged in to submit a review');
        return;
      }

    try {
      const response = await fetch("http://localhost:3000/api/review-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.redirectUrl) {
          // Redirect for ratings 4 and above
          window.location.href = result.redirectUrl;
        } else {
          alert("Review submitted successfully!");
          handleCancel(); // Reset form after successful submission
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to submit review: ${errorData.error || "Server error"}`);
      }
    } catch (error) {
      alert(`Failed to submit review: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setTextInput("");
    setSelectedRating(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-[500px] h-[600px] p-8 bg-white border-4 border-gray-300 rounded-lg shadow-lg">
        {/* Star Rating */}
        <div className="mt-6 flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`mask mask-star-2 cursor-pointer ${
                selectedRating >= star ? "bg-orange-400" : "bg-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
              style={{
                width: "40px",
                height: "40px",
                margin: "0 5px",
              }}
            ></div>
          ))}
        </div>

        {/* Text Input */}
        <TextInput
          value={textInput}
          onChange={(value) => setTextInput(value)}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Rating;
