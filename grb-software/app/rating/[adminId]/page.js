"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Instagram, Phone, X, Globe, ArrowRight } from 'lucide-react';
import Image from "next/image";
import TextInput from "../../component/textInput";

export default function RatingPage() {
  const [admin, setAdmin] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const adminId = params?.adminId;

  const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!adminId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${apiUrl}/api/admin/${adminId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setAdmin(data);
      } catch (err) {
        console.error('Error fetching admin:', err);
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [adminId, apiUrl]);

  const handleRatingChange = async (rating) => {
    setSelectedRating(rating);
    setIsVisible(rating <= 3);

    if (rating >= 4) {
      try {
        const res = await fetch(`${apiUrl}/api/review-submit/${adminId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating }),
        });
        
        const result = await res.json();
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        } else {
          alert(result.error || "Unable to redirect.");
        }
      } catch (err) {
        console.error('Error submitting rating:', err);
        alert("Failed to submit rating. Please try again.");
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedRating <= 3 && textInput.trim() === "") {
      alert("Please add a description for low ratings.");
      return;
    }
    
    try {
      const res = await fetch(`${apiUrl}/api/review-submit/${adminId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: selectedRating, description: textInput }),
      });
      
      const result = await res.json();
      if (res.ok) {
        alert("Review submitted successfully.");
        setTextInput("");
        setSelectedRating(0);
        setIsVisible(false);
      } else {
        alert(result.error || "Failed to submit.");
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-lg">Admin not found</div>
      </div>
    );
  }

  const socialLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/${admin.whatsappNumber}`,
      // icon: Phone,
      show: admin.whatsappNumber,
      // color: "bg-green-500"
    },
    {
      label: "Instagram", 
      href: admin.instagramLink,
      // icon: Instagram,
      show: admin.instagramLink,
      // color: "bg-pink-500"
    },
    {
      label: "Website",
      href: admin.portfolioLink,
      // icon: Globe,
      show: admin.portfolioLink,
      // color: "bg-blue-500"
    },
    {
      label: `${admin.customLinkTitle}`,
      href: `${admin.customLink}`,
      show: admin.customLink,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto space-y-6">
        {/* Profile Section */}
        <div className="text-center">
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden shadow-2xl mx-auto mt-6 mb-4">
            <Image
              src={admin.shopImage}
              alt={admin.shopName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          <h1 style={{
  fontSize: '1.5rem',
  fontWeight: 595,
  color: 'white',
  letterSpacing: '-0.03em',
  margin: 0
}}>
  {admin.shopName}
</h1>
        </div>

        {/* Column-based Social Links */}
        <div className="space-y-3">
          {socialLinks.filter(link => link.show).map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
             <div className="bg-black hover:scale-102 hover:shadow-[0_0_10px_2px_rgba(34,211,238,0.5)] active:scale-95 rounded-2xl p-4 transition-all duration-300 ease-out border border-gray-700">
                <div className="flex items-center justify-between">
  <div className="w-10 h-10 flex items-center justify-center">
    {link.icon && (
      <div className={`${link.color} p-2 rounded-full`}>
        <link.icon size={20} className="text-white" />
      </div>
    )}
  </div>
  <span className="text-white font-semibold flex-1 text-center">{link.label}</span>
  <div className="w-10 h-10 flex items-center justify-center">
    <ArrowRight size={20} className="text-gray-400" />
  </div>
</div>
              </div>
            </a>
          ))}
        </div>

        {/* Review Section */}
        <div className={`bg-black/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transition-all duration-500 ${
          isVisible ? 'min-h-[350px]' : 'min-h-[200px]'
        }`}>
          
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-white mb-1">
              FEEL FREE TO SHARE
            </h2>
            <h3 className="text-base font-semibold text-yellow-400">
              YOUR FEEDBACK
            </h3>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-3xl transition-all duration-200 hover:scale-110 ${
                  selectedRating >= star ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Text Input for Low Ratings */}
          {isVisible && (
            <div className="animate-fadeIn">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setTextInput("");
                  setIsVisible(false);
                  setSelectedRating(0);
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            Your feedback helps us improve
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}