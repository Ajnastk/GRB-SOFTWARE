import { useState, useEffect } from "react";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/review-submit"); // Adjusted endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* Display loading state */}
      {loading && <p>Loading reviews...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display reviews */}
      {!loading && !error && (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded-lg shadow-md">
                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    {review.user || "Anonymous"} {/* Handle missing user */}
                  </h3>
                  <div className="text-yellow-500">
                    {Array.from({ length: Math.min(review.rating, 5) }).map(
                      (_, index) => (
                        <span key={index}>⭐</span>
                      )
                    )}
                  </div>
                </div>
                <p>{review.comment || "No comment provided."}</p> {/* Handle missing comment */}
                <p className="text-sm text-gray-500 mt-2">
                  Date:{" "}
                  {review.date
                    ? new Date(review.date).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;