"use client";

import ReviewList from '../../../component/reviewList'; // Adjust path as needed

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Reviews</h1>
            <p className="text-gray-600 mt-1">Manage and view all customer reviews</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List - Using Reusable Component */}
      <ReviewList 
        title="Customer Reviews"
        showViewAllLink={false}
        isDashboard={false}
        showHeader={true}
      />
    </div>
  );
}