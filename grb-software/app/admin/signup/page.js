"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, User, Mail, Phone, Store, Link as LinkIcon, Camera, Lock, CheckCircle,ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    googlelink: "",
    shopName: "",
    instagramLink: "",
    whatsappNumber: "",
    emailLink: "",
    portfolioLink: "",
  });

  const [shopImage, setShopImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const steps = [
    {
      title: "Personal Information",
      icon: User,
      fields: ['name', 'email', 'mobile'],
      description: "Let's start with your basic details"
    },
    {
      title: "Shop Details",
      icon: Store,
      fields: ['shopName', 'shopImage'],
      description: "Tell us about your shop"
    },
    {
      title: "Social Links",
      icon: ExternalLink,
      fields: ['instagramLink', 'whatsappNumber', 'emailLink', 'portfolioLink', 'googlelink'],
      description: "Connect your social presence"
    },
    {
      title: "Security",
      icon: Lock,
      fields: ['password', 'confirmPassword'],
      description: "Secure your account"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setShopImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      // Create FormData for API submission
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      
      // Add shop image if selected
      if (shopImage) {
        formPayload.append("shopImage", shopImage);
      }

      // Make API call to admin-signup endpoint
      const response = await fetch("/api/admin-signup", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 2000);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during signup. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (field === 'shopImage') return shopImage;
      if (field === 'confirmPassword') return formData.password === formData.confirmPassword;
      return formData[field]?.trim() !== '';
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <InputField 
              label="Full Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            <InputField 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="your@email.com"
            />
            <InputField 
              label="Mobile Number" 
              name="mobile" 
              type="tel" 
              pattern="[0-9]{10}" 
              value={formData.mobile} 
              onChange={handleChange}
              placeholder="1234567890"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Store className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Shop Details</h3>
              <p className="text-gray-600">Tell us about your shop</p>
            </div>
            
            <InputField 
              label="Shop Name" 
              name="shopName" 
              value={formData.shopName} 
              onChange={handleChange}
              placeholder="Enter your shop name"
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Shop Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> shop image
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <ExternalLink className="mx-auto h-16 w-16 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Social Links</h3>
              <p className="text-gray-600">Connect your social presence</p>
            </div>
            
            <InputField 
              label="Instagram Link" 
              name="instagramLink" 
              type="url" 
              value={formData.instagramLink} 
              onChange={handleChange}
              placeholder="https://instagram.com/yourshop"
            />
            <InputField 
              label="WhatsApp Number" 
              name="whatsappNumber" 
              value={formData.whatsappNumber} 
              onChange={handleChange}
              placeholder="1234567890"
            />
            <InputField 
              label="Email Link" 
              name="emailLink" 
              type="email" 
              value={formData.emailLink} 
              onChange={handleChange}
              placeholder="contact@yourshop.com"
            />
            <InputField 
              label="Portfolio Link" 
              name="portfolioLink" 
              type="url" 
              value={formData.portfolioLink} 
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
            />
            <InputField 
              label="Google Review Link" 
              name="googlelink" 
              type="url" 
              value={formData.googlelink} 
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Lock className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Security</h3>
              <p className="text-gray-600">Secure your account</p>
            </div>
            
            <InputField 
              label="Password" 
              name="password" 
              type={showPassword ? "text" : "password"} 
              value={formData.password} 
              onChange={handleChange}
              placeholder="Enter a strong password"
            >
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="text-blue-500 hover:text-blue-700 text-sm ml-2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </InputField>
            
            <InputField 
              label="Confirm Password" 
              name="confirmPassword" 
              type={showPassword ? "text" : "password"} 
              value={formData.confirmPassword} 
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${
                    index <= currentStep ? 'text-blue-500' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Account created successfully! Redirecting to login...</span>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center">
                <span className="font-medium">Error: </span>
                <span className="ml-1">{error}</span>
              </div>
            </div>
          )}
          
          <div>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0 || isLoading || success}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0 || isLoading || success
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid() || isLoading || success}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isStepValid() && !isLoading && !success
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isLoading || success}
                  className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
                    isStepValid() && !isLoading && !success
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
                  {!isLoading && <CheckCircle className="w-5 h-5 ml-2" />}
                </button>
              )}
            </div>
          </div>
          
          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => window.location.href = "/admin/login"}
                className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, children, placeholder, ...props }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          {...props}
        />
        {children}
      </div>
    </div>
  );


//     const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//     googlelink: "",
//     shopName: "",
//     instagramLink: "",
//     whatsappNumber: "",
//     emailLink: "",
//     portfolioLink: "",
//   });

//   const [shopImage, setShopImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setShopImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const formPayload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         formPayload.append(key, value);
//       });
//       if (shopImage) formPayload.append("shopImage", shopImage);

//       const response = await fetch("/api/admin-signup", {
//         method: "POST",
//         body: formPayload,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Signup successful!");
//         router.push("/admin/login");
//       } else {
//         alert(`${data.message || "Signup failed"}`);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred during signup.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 to-purple-500 p-4">
//       <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-4xl">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
//           Admin Registration
//         </h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Column */}
//           <div className="space-y-4">
//             <InputField label="Username" name="name" value={formData.name} onChange={handleChange} />
//             <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
//             <InputField label="Mobile Number" name="mobile" type="tel" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} />
//             <InputField label="Google Review Link" name="googlelink" type="url" value={formData.googlelink} onChange={handleChange} />
//             <InputField label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} />
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Shop Image</label>
//               <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600" />
//               {previewImage && (
//                 <img src={previewImage} alt="Preview" className="mt-2 rounded-lg shadow w-32 h-32 object-cover" />
//               )}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-4">
//             <InputField label="Instagram Link" name="instagramLink" type="url" value={formData.instagramLink} onChange={handleChange} />
//             <InputField label="WhatsApp Number" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
//             <InputField label="Email Link" name="emailLink" type="email" value={formData.emailLink} onChange={handleChange} />
//             <InputField label="Portfolio Link" name="portfolioLink" type="url" value={formData.portfolioLink} onChange={handleChange} />

//             <InputField label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}>
//               <button type="button" onClick={togglePasswordVisibility} className="text-blue-500 hover:text-blue-700 text-sm ml-2">
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </InputField>

//             <InputField label="Confirm Password" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="md:col-span-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-transform hover:scale-105 shadow-lg"
//           >
//             {isLoading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link href="/admin/login" className="text-blue-500 hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// function InputField({ label, name, type = "text", value, onChange, children, ...props }) {
//   return (
//     <div>
//       <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
//         {label}
//       </label>
//       <div className="flex items-center">
//         <input
//           type={type}
//           name={name}
//           id={name}
//           value={value}
//           onChange={onChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           {...props}
//         />
//         {children}
//       </div>
//     </div>
//   );
}
