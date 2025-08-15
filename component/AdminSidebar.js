"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin/adminPage", icon: "📊" },
    { name: "Reviews", href: "/admin/reviews", icon: "⭐" },
    {name : "Links", href: "/admin/links", icon: "🔗"},
    // Uncomment to add more items
    // { name: "Links", href: "/admin/links", icon: "🔗" },
    // { name: "Analytics", href: "/admin/analytics", icon: "📈" },
    // { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 border-r border-gray-200`}
        aria-label="Admin Navigation"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 border-b border-blue-700">
          <Link href="/admin/adminPage" className="flex items-center">
            {/* <Image
              src="/images/logo/logo-light.svg"
              alt="Admin Panel Logo"
              width={120}
              height={32}
            /> */}
            <h1 className="ml-2 text-xl font-bold text-white">GRB</h1>
           
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-gray-200 transition-colors duration-200 p-1"
            aria-label="Close Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation - Scrollable area */}
        <div className="h-[calc(100vh-4rem)] pb-16 overflow-y-auto">
          <nav className="px-4 py-6" aria-label="Main Navigation">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <Link
              href="/admin/login"
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 group"
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">🚪</span>
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}