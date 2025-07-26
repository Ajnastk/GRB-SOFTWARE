"use client";

import ReviewList from '../../../component/reviewList';
import { useReviewStats } from '../../../hooks/useReviewStats';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

export default function AdminDashboardPage() {
  const { stats, loading, error } = useReviewStats();

  const statsData = [
    {
      name: 'Total Negative Reviews',
      value: loading ? '...' : stats.totalReviews.toString(),
      change: loading ? '...' : `${stats.monthlyGrowth >= 0 ? '+' : ''}${stats.monthlyGrowth}%`,
      changeType: stats.monthlyGrowth <= 0 ? 'positive' : 'negative',
      icon: '😞',
    },
    {
      name: '1-Star Reviews',
      value: loading ? '...' : stats.negativeReviews.toString(),
      change: loading ? '...' : `${stats.weeklyGrowth >= 0 ? '+' : ''}${stats.weeklyGrowth}%`,
      changeType: stats.weeklyGrowth <= 0 ? 'positive' : 'negative',
      icon: '⭐',
    },
    {
      name: "Today's Negative Reviews",
      value: loading ? '...' : stats.todayReviews.toString(),
      change: 'Today',
      changeType: 'neutral',
      icon: '📝',
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading dashboard data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Negative Reviews Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {stat.name === "Today's Negative Reviews" ? '' : stat.name === '1-Star Reviews' ? 'from last week' : 'from last month'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Distribution */}
      {!loading && stats.totalReviews > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Negative Review Distribution (1-3 Stars)</h2>
          <div className="space-y-3">
            {[3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <span className="text-sm text-gray-900 w-10">
                  {'⭐'.repeat(rating)}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                  <div
                    className="h-3 rounded-full bg-red-500"
                    style={{
                      width: stats.totalReviews > 0 
                        ? `${(stats.ratingDistribution[rating] / stats.totalReviews) * 100}%`
                        : '0%',
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {stats.ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Chart */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Negative Review Trends</h2>
          <div className="h-64">
            <Bar
              data={{
                labels: ['Weekly Trend', 'Monthly Trend'],
                datasets: [{
                  label: 'Growth in Negative Reviews (%)',
                  data: [stats.weeklyGrowth, stats.monthlyGrowth],
                  backgroundColor: stats.weeklyGrowth > 0 || stats.monthlyGrowth > 0 ? '#ef5350' : '#4caf50',
                  borderColor: stats.weeklyGrowth > 0 || stats.monthlyGrowth > 0 ? '#d32f2f' : '#388e3c',
                  borderWidth: 1,
                }],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Growth (%)' },
                  },
                  x: {
                    title: { display: true, text: 'Time Period' },
                  },
                },
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Negative Review Growth Trends' },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw;
                        return value > 0
                          ? `${value}% increase in negative reviews`
                          : value < 0
                          ? `${Math.abs(value)}% decrease in negative reviews`
                          : 'No change in negative reviews';
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Recent Reviews */}
      <ReviewList
        limit={4}
        title="Recent Negative Reviews"
        showViewAllLink={true}
        isDashboard={true}
      />
    </div>
  );
}