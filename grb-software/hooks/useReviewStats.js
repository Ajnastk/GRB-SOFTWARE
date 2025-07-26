"use client";

import { useState, useEffect } from 'react';

export const useReviewStats = () => {
  const [stats, setStats] = useState({
    totalReviews: 0,
    monthlyGrowth: 0,
    weeklyGrowth: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0 },
    todayReviews: 0,
    negativeReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_API_URL_DEV
            : process.env.NEXT_PUBLIC_API_URL_PROD;

        const response = await fetch(`${apiUrl}/api/review`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const totalReviews = data.length;

          // Calculate rating distribution
          const ratingDistribution = { 1: 0, 2: 0, 3: 0 };
          data.forEach(review => {
            const rating = Math.min(Math.max(review.rating, 1), 3); // Fixed bug
            ratingDistribution[rating]++;
          });

          // Calculate negative reviews (1-star only)
          const negativeReviews = data.filter(review => review.rating === 1).length;

          // Time-based calculations
          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

          // Weekly growth
          const currentWeekReviews = data.filter(review =>
            new Date(review.createdAt) > sevenDaysAgo
          ).length;

          const previousWeekReviews = data.filter(review => {
            const reviewDate = new Date(review.createdAt);
            return reviewDate > fourteenDaysAgo && reviewDate <= sevenDaysAgo;
          }).length;

          const weeklyGrowth = previousWeekReviews > 0
            ? Math.round(((currentWeekReviews - previousWeekReviews) / previousWeekReviews) * 100)
            : currentWeekReviews > 0 ? 100 : 0;

          // Monthly growth
          const currentMonthReviews = data.filter(review =>
            new Date(review.createdAt) > thirtyDaysAgo
          ).length;

          const previousMonthReviews = data.filter(review => {
            const reviewDate = new Date(review.createdAt);
            return reviewDate > sixtyDaysAgo && reviewDate <= thirtyDaysAgo;
          }).length;

          const monthlyGrowth = previousMonthReviews > 0
            ? Math.round(((currentMonthReviews - previousMonthReviews) / previousMonthReviews) * 100)
            : currentMonthReviews > 0 ? 100 : 0;

          // Additional stats
          const todayReviews = data.filter(review =>
            new Date(review.createdAt) >= todayStart
          ).length;

          setStats({
            totalReviews,
            monthlyGrowth,
            weeklyGrowth,
            ratingDistribution,
            todayReviews,
            negativeReviews,
          });
        }
      } catch (err) {
        console.error("Error fetching review stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, []);

  return { stats, loading, error, refetch: () => window.location.reload() };
};