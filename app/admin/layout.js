"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/component/AdminSidebar';
import AdminHeader from '@/component/AdminHeader';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Optional: fast client-side guard
  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/review')) {
      fetch('/api/me', { credentials: 'include' }).then((res) => {
        if (res.status === 401) router.replace('/admin/login');
      }).catch(() => {});
    }
  }, [pathname, router]);

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
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} admin={admin} />

        {/* Main content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
