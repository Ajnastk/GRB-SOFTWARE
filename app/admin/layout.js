"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/component/AdminSidebar';
import AdminHeader from '@/component/AdminHeader';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/admin/me/route')
      .then(res => res.json())
      .then(data => setAdmin(data));
  }, []);

  // Don't show sidebar and header on login page
  const noLayoutRoutes = ['/admin/login', '/admin/signup', '/admin'];
  if (noLayoutRoutes.includes(pathname)) {
  return <div className="min-h-screen">{children}</div>;
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main content wrapper - push content to the right on desktop */}
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} admin={admin} />

        {/* Main content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}