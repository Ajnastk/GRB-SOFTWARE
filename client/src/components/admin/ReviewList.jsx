import { useState, useEffect } from "react";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchReviews = async () => {

      const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
      const token= localStorage.getItem('token');
      if(!token){
        setError('Authorization token is please login');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${backendUrl}/api/review`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
        console.log('response status',response.status);
        const rawResponse= await response.clone().text();
        console.log('Raw response',rawResponse)

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log('Api response:',data);
        if(Array.isArray(data)){
          setReviews(data);
        }else{
          throw new Error('Invalid reviews data format');
        }
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
                  <div className="text-yellow-500 text-2xl">
                    {Array.from({ length: Math.min(review.rating,5) }).map(
                      (_, index) => (
                        <span key={index}>⭐</span>
                      )
                    )}
                  </div>
                </div>
                <p>{review.description}</p> {/* Handle missing comment */}
                <p className="text-sm text-gray-500 mt-2">
                  Date:{" "}
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
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
