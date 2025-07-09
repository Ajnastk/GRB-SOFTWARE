"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="hero min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden"
    >
      {/* Enhanced overlay with subtle animation */}
      <div className="hero-overlay bg-opacity-70 animate-gradient-bg"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-blue-500/10 rounded-full -top-20 -left-20 sm:-top-40 sm:-left-40 animate-pulse"></div>
        <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-purple-500/10 rounded-full -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="hero-content text-neutral-content text-center z-10 px-4 sm:px-6">
        <div className="max-w-4xl">
          <h1 className="mb-8 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight animate-fade-in-down">
            Your Centralized Link & Review Management Hub
          </h1>
          <p className="mb-8 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed animate-fade-in-up">
            Effortlessly manage all your links from a single, customizable dashboard. Take control of your reputation with our smart review system—automatically route 4 and 5-star reviews to Google Reviews and address 3-star or lower feedback privately in your admin panel.
          </p>
          <Link href="/admin/login">
            <button 
              className="px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-black rounded-3xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.5)] active:scale-95"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
}