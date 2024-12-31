


import ReviewList from "./ReviewList";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ReviewList/>
      </div>
    </div>
  );
};

export default AdminPage;