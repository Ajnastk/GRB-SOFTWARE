"use client";

// import { useState,useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import AdminSidebar from '@/component/AdminSidebar';
// import AdminHeader from '@/component/AdminHeader';

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const {data : session} = useSession();
//   const pathname = usePathname();

//   // Don't show sidebar and header on login page
//   const noLayoutRoutes = ['/admin/login', '/admin/signup', '/admin'];
//   if (noLayoutRoutes.includes(pathname)) {
//   return <div className="min-h-screen">{children}</div>;
// }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <AdminSidebar 
//         isOpen={sidebarOpen} 
//         onClose={() => setSidebarOpen(false)} 
//       />

//       {/* Main content wrapper - push content to the right on desktop */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

//         {/* Main content */}
//         <main className="p-6">
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/component/AdminSidebar';
import AdminHeader from '@/component/AdminHeader';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
