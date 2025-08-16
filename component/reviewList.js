"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

export default function ReviewList({ 
  limit = null, 
  showHeader = true, 
  showViewAllLink = false, 
  title = "Reviews",
  isDashboard = false
}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");

      if(!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      } 

      try {
        const apiUrl = (process.env.NODE_ENV === "development"
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
          const errorData = await response.json();
          console.error("Error fetching reviews:", errorData);
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        console.log("API response:", data);

        if (Array.isArray(data)) {
          // Sort by creation date (newest first) and apply limit if specified
          const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const limitedReviews = limit ? sortedReviews.slice(0, limit) : sortedReviews;
          setReviews(limitedReviews);
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
  }, [limit]);

  const getTimeAgo = (dateString) => {
    if (!isDashboard) {
      return new Date(dateString).toLocaleDateString();
    }

    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInHours = Math.floor((now - reviewDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    
    return reviewDate.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {showViewAllLink && (
            <Link
              href="/admin/reviews"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View all →
            </Link>
          )}
        </div>
      )}

      {/* Display loading state */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading reviews...</div>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">Error loading reviews: {error}</div>
        </div>
      )}

      {/* Display reviews */}
      {!loading && !error && (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">⭐</div>
              <p className="text-gray-500">No reviews available.</p>
              {isDashboard && (
                <p className="text-sm text-gray-400 mt-1">Recent reviews will appear here</p>
              )}
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.user ? review.user[0].toUpperCase() : "A"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {review.user || "Anonymous"}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.min(Math.max(review.rating, 0), 5))}
                        {'☆'.repeat(5 - Math.min(Math.max(review.rating, 0), 5))}
                      </div>
                      {isDashboard && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {review.description || "No comment provided"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {review.createdAt ? getTimeAgo(review.createdAt) : "Unknown"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}