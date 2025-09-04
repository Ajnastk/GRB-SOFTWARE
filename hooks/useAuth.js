"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(requireAuth = true) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(requireAuth);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!requireAuth) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/me', {
          credentials: 'include',
          cache: 'no-store' // Prevent caching
        });

        if (response.status === 401) {
          setUser(null);
          const currentPath = window.location.pathname;
          const returnUrl = encodeURIComponent(currentPath);
          router.replace(`/admin/login?returnUrl=${returnUrl}`);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          throw new Error('Auth check failed');
        }
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, router]);

  return { user, loading, error };
}