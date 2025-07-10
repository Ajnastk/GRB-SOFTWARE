"use client";

import { useState, useEffect } from "react";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");

      try {
        const apiUrl = (process.env.NODE_ENV = "development"
          ? process.env.NEXT_PUBLIC_API_URL_DEV
          : process.env.NEXT_PUBLIC_API_URL_PROD);

        const response = await fetch(`${apiUrl}/api/review`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);
        const rawResponse = await response.clone().text();
        console.log("Raw response:", rawResponse);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        console.log("API response:", data);

        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          throw new Error("Invalid reviews data format");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // return (
  //   <div className="p-4">
  //     <h2 className="text-2xl font-bold mb-4">Reviews</h2>

  //     {loading && <p>Loading reviews...</p>}
  //     {error && <p className="text-red-500">{error}</p>}

  //     {!loading && !error && (
  //       <div className="space-y-4">
  //         {reviews.length === 0 ? (
  //           <p>No reviews available.</p>
  //         ) : (
  //           reviews.map((review) => (
  //             <div
  //               key={review._id}
  //               className="border p-4 rounded-lg shadow-md bg-white"
  //             >
  //               <div className="flex justify-between mb-2">
  //                 <h3 className="text-xl font-semibold">
  //                   {review.user || "Anonymous"}
  //                 </h3>
  //                 <div className="text-yellow-500 text-2xl">
  //                   {Array.from({ length: Math.min(review.rating, 5) }).map(
  //                     (_, index) => (
  //                       <span key={index}>⭐</span>
  //                     )
  //                   )}
  //                 </div>
  //               </div>
  //               <p>{review.description || "No comment provided."}</p>
  //               <p className="text-sm text-gray-500 mt-2">
  //                 Date:{" "}
  //                 {review.createdAt
  //                   ? new Date(review.createdAt).toLocaleDateString()
  //                   : "Unknown"}
  //               </p>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
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
                    {Array.from({ length: Math.min(review.rating, 5) }).map(
                      (_, index) => (
                        <span key={index}>⭐</span>
                      )
                    )}
                  </div>
                </div>
                <p className="text-lg from-neutral-800 text-gray-600">
                  {review.description}
                </p>{" "}
                {/* Handle missing comment */}
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
}
