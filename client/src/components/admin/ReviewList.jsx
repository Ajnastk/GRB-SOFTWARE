import  { useState, useEffect } from "react";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold">{review.user}</h3>
                <div className="text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">Date: {review.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;