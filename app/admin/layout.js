"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from '@/component/AdminSidebar';
import AdminHeader from '@/component/AdminHeader';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Define routes that don't need authentication
  const publicRoutes = ['/admin/login', '/admin/signup', '/admin'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Use auth hook only for protected routes
  const { user, loading, error } = useAuth(!isPublicRoute);

  // Show loading state for protected routes
  if (!isPublicRoute && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render layout for public routes
  if (isPublicRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  // Main admin layout (only renders if authenticated)
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:pl-64">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} user={user} />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}