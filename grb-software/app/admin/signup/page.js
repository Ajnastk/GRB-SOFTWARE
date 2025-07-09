"use client";

import { useState } from "react";
import { User, Store, Camera, Lock, ExternalLink, Eye, EyeOff } from "lucide-react";
import Stepper, { Step } from "../../component/Stepper";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function SignUpPage() {
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
  const [step, setStep] = useState(1);

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

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      if (shopImage) {
        formPayload.append("shopImage", shopImage);
      }
      const response = await fetch("/api/admin-signup", {
        method: "POST",
        body: formPayload,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        toast.success("Registration completed successfully");
        // setTimeout(() => {
        //   window.location.href = "/admin/login";
        // }, 2000);
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

  // Validation for each step
  const isStepValid = (stepNum) => {
    switch (stepNum) {
      case 1:
        return (
          formData.name.trim() &&
          formData.email.trim() &&
          formData.mobile.trim()
        );
      case 2:
        return formData.shopName.trim() && shopImage;
      case 3:
        return (
          formData.instagramLink.trim() &&
          formData.whatsappNumber.trim() &&
          formData.emailLink.trim() &&
          formData.portfolioLink.trim() &&
          formData.googlelink.trim()
        );
      case 4:
        return (
          formData.password.trim() &&
          formData.confirmPassword.trim() &&
          formData.password === formData.confirmPassword
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50  px-4 flex items-center justify-center">
      
      <div className="max-w-2xl w-full mx-auto">
        <Stepper
          initialStep={1}
          onStepChange={setStep}
          onFinalStepCompleted={handleSubmit}
          backButtonText="Previous"
          nextButtonText="Next"
          nextButtonProps={{
            disabled: !isStepValid(step) || isLoading || success,
          }}
          backButtonProps={{
            disabled: isLoading || success,
          }}
          footer={
            <div className="text-center">
               <div>
        {error && <div className="text-red-500 text-center ">{error}</div>}
        {success && <div className="text-green-500 text-center ">Registration completed successfully. Welcome, and thank you for joining us.</div>}
        </div>
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
          }
        >
          <Step>
            {/* Step 1: Personal Information */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
                <p className="text-gray-600">Let&apos;s start with your basic details</p>
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
                autoComplete="username"
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
          </Step>
          <Step>
            {/* Step 2: Shop Details */}
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
                      <Image src={previewImage} alt="Preview" width={500}
                      height={300}  className="w-full h-full object-cover rounded-lg" />
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
          </Step>
          <Step>
            {/* Step 3: Social Links */}
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
          </Step>
          <Step>
            {/* Step 4: Security */}
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
                autoComplete="current-password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </Step>
        </Stepper>
        {/* Error and Success Messages */}
        {/* Login Link */}
        {/* This block is now handled by the footer prop of Stepper */}
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, children, placeholder, showPassword, setShowPassword, ...props }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
          {...props}
        />
        {name === "password" && setShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

