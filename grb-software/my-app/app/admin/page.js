"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="hero min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello There</h1>
          <p className="mb-5">
            Manage products, reviews, and analytics efficiently from your admin dashboard.
          </p>
          <Link href="/admin/login">
            <button className="btn bg-blue-600 p-2 rounded-lg hover:cursor-pointer hover:bg-blue-800">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
