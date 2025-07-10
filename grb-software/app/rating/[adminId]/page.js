"use client";

import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
import { Instagram, Phone, Mail, Globe,MoreHorizontal} from 'lucide-react';
import Image from "next/image";
import TextInput from "../../component/textInput";

export default function RatingPage() {
  const [admin, setAdmin] = useState();
  const [selectedRating, setSelectedRating] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { adminId } = useParams();

   const apiUrl = 
        process.env.NODE_ENV = 'development'
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;

  
   useEffect(() => {
    const fetchAdmin = async () =>  {

       const apiUrl = 
        process.env.NODE_ENV = 'development'
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;

      const res = await fetch(`${apiUrl}/api/admin/${adminId}`);
      const data = await res.json();
      setAdmin(data);
    };
    fetchAdmin();
  }, [adminId]);

  const handleRatingChange = async (rating) => {
    setSelectedRating(rating);
    setIsVisible(rating <= 3);

    if (rating >= 4) {
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
    }
  };

  const handleSubmit = async () => {
    if (selectedRating <= 3 && textInput.trim() === "") {
      alert("Please add a description for low ratings.");
      return;
    }
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
  };

   if (!admin) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-white text-lg">Loading...</div>
    </div>
  );
      const socialLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/${admin.whatsappNumber}`,
      icon: Phone,
      show: admin.whatsappNumber,
      color: "bg-green-500"
    },
    {
      label: "Instagram", 
      href: admin.instagramLink,
      icon: Instagram,
      show: admin.instagramLink,
      color: "bg-pink-500"
    },
    {
      label: "Website",
      href: admin.portfolioLink,
      icon: Globe,
      show: admin.portfolioLink,
      color: "bg-blue-500"
    },
    {
      label: "Email",
      href: `mailto:${admin.email}`,
      icon: Mail,
      show: admin.email,
      color: "bg-yellow-500"
    }
  ];

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto space-y-6">
        
        {/* Profile Section */}
        <div className="text-center">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden shadow-xl mx-auto mb-2">
            <Image
              src={admin.shopImage}
              alt={admin.shopName}
              fill
              className="object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-1">
            {admin.shopName}
          </h1>
          
          {/* <p className="text-gray-300 text-sm mb-1">
            {admin.subtitle}
          </p>
          
          <p className="text-gray-400 text-xs mb-6">
            {admin.description}
          </p> */}

          {/* Small Social Icons */}
          {/* <div className="flex justify-center gap-3 mb-8">
            {socialLinks.filter(link => link.show).map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <link.icon size={20} />
              </a>
            ))}
          </div> */}
        </div>

        {/* Column-based Social Links (Like Reference Image) */}
        <div className="space-y-3">
          {socialLinks.filter(link => link.show).map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <div className="bg-black hover:bg-gray-800 rounded-2xl p-4 transition-colors duration-200 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${link.color} p-2 rounded-full`}>
                      <link.icon size={20} className="text-white" />
                    </div>
                    <span className="text-white font-medium">{link.label}</span>
                  </div>
                  <MoreHorizontal size={20} className="text-gray-400" />
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

  // return (
  //   <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
  //     {admin.shopImage && (
  //       <Image src={admin.shopImage} alt="Shop" width={150} height={150} className="rounded-full shadow-lg border-4 border-white" />
  //     )}
  //     <h1 className="text-2xl font-bold mt-4 text-gray-800">{admin.shopName}</h1>

  //     <div className="flex gap-4 mt-4">
  //       {admin.instagramLink && <a href={admin.instagramLink} target="_blank" rel="noopener noreferrer" className="bg-pink-500 p-3 rounded-full text-white shadow-md hover:scale-105 transition"><Instagram /></a>}
  //       {admin.whatsappNumber && <a href={`https://wa.me/${admin.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-full text-white shadow-md hover:scale-105 transition"><Phone /></a>}
  //       {admin.email && <a href={`mailto:${admin.emailLink}`} className="bg-yellow-500 p-3 rounded-full text-white shadow-md hover:scale-105 transition"><Mail /></a>}
  //       {admin.portfolioLink && <a href={admin.portfolioLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-3 rounded-full text-white shadow-md hover:scale-105 transition"><Globe /></a>}
  //     </div>

  //     <div className="mt-8 flex space-x-2">
  //       {[1, 2, 3, 4, 5].map((star) => (
  //         <button
  //           key={star}
  //           onClick={() => handleRatingChange(star)}
  //           className={`text-4xl ${selectedRating >= star ? "text-yellow-400" : "text-gray-300"}`}
  //         >★</button>
  //       ))}
  //     </div>

  //     {isVisible && (
  //       <div className="mt-4 w-full max-w-md">
  //         <TextInput
  //           value={textInput}
  //           onChange={setTextInput}
  //           onSubmit={handleSubmit}
  //           onCancel={() => { setTextInput(""); setIsVisible(false); setSelectedRating(0); }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );

}
