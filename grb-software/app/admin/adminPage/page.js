


import ReviewList from "@/app/component/reviewList";

export default function adminDashboardPage(){

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ReviewList />
      </div>
    </div>
  );
};

