import React from 'react';
import { QrCode, Star, Filter, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';
const HowItWorks = () => {
   const steps = [
    {
      icon: QrCode,
      title: "Scan QR Code",
      desc: "Customers scan the QR code to start the review process",
    },
    {
      icon: Star,
      title: "Rate Experience",
      desc: "Customers leave their rating and feedback",
    },
    {
      icon: Filter,
      title: "Filter & Monitor",
      desc: "Reviews are filtered for relevance and quality",
    },
    {
      icon: MapPin,
      title: "Redirect to Google",
      desc: "Positive reviews are directed to Google for posting",
    },
    {
      icon: TrendingUp,
      title: "Grow Reputation",
      desc: "Boost your online presence and attract more customers",
    },
  ];

  return (
    <section className="py-16 lg:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Mobile: Title and Description */}
        <div className="lg:hidden text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2">
            How it works
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mx-4">
            Our intelligent system automatically manages your online reputation, 
            ensuring only satisfied customers leave public reviews while concerns are handled privately.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Work Steps */}
          <div className="flex-1">
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Vertical connecting line with gradient */}
              <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-rose-200 -z-10"></div>
              
              <div className="container mx-auto px-4 max-w-4xl space-y-10">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="relative flex items-center gap-6 rounded-[40px] bg-white/90 border border-gray-200 shadow-md hover:shadow-lg transition"
          >
            {/* icon */}
            <div className="shrink-0 ml-6 my-4">
              <div className="grid place-items-center w-16 h-16 rounded-2xl bg-gray-100">
                <Icon className="w-7 h-7 text-blue-600" />
              </div>
            </div>

            {/* text */}
            <div className="py-6 pr-20">
              <h3 className="text-xl font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-gray-600">{desc}</p>
            </div>

            {/* step badge */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
            </div>
          </div>

          {/* Right: How it works description and buttons - Desktop only */}
          <div className="hidden lg:flex flex-1 flex-col justify-center lg:sticky lg:top-24 lg:self-start">
            {/* Section Header */}
            <div className="text-start mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kumbh font-semibold text-global-2">
                How it works
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Our intelligent system automatically manages your online reputation, 
              ensuring only satisfied customers leave public reviews while concerns are handled privately.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/admin/login">
              <button className="px-8 py-4 bg-gradient-to-r from-[#0793de] to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]">
                Start Free Trial
              </button>
              </Link>
              <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Buttons */}
        <div className="lg:hidden mt-12 mx-4">
          <div className="flex flex-col gap-4">
            <button className="w-full px-8 py-4 bg-gradient-to-r from-[#0793de] to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
              Start Free Trial
            </button>
            <button className="w-full px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
