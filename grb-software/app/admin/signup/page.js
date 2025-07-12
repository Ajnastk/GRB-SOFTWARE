"use client";

import { useState } from "react";
import { User, Store, Camera, Lock, ExternalLink, Eye, EyeOff } from "lucide-react";
import Stepper, { Step } from "../../component/Stepper";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
// import { toast } from "react-toastify";

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
  const [errors, setErrors] = useState({
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
    shopImage: "",
  });
  const [shopImage, setShopImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const validateField = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Full name is required";
        } else if (value.trim().length < 2) {
          errorMessage = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "mobile":
        if (!value.trim()) {
          errorMessage = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(value.replace(/\D/g, ''))) {
          errorMessage = "Please enter a valid 10-digit mobile number";
        }
        break;
      case "shopName":
        if (!value.trim()) {
          errorMessage = "Shop name is required";
        } else if (value.trim().length < 2) {
          errorMessage = "Shop name must be at least 2 characters";
        }
        break;
      case "instagramLink":
        if (!value.trim()) {
          errorMessage = "Instagram link is required";
        } else if (!value.includes("instagram.com")) {
          errorMessage = "Please enter a valid Instagram link";
        }
        break;
      case "whatsappNumber":
        if (!value.trim()) {
          errorMessage = "WhatsApp number is required";
        } else if (!/^[0-9]{10}$/.test(value.replace(/\D/g, ''))) {
          errorMessage = "Please enter a valid 10-digit WhatsApp number";
        }
        break;
      case "emailLink":
        if (!value.trim()) {
          errorMessage = "Email link is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "portfolioLink":
        if (!value.trim()) {
          errorMessage = "Portfolio link is required";
        } else if (!value.startsWith("http://") && !value.startsWith("https://")) {
          errorMessage = "Please enter a valid URL starting with http:// or https://";
        }
        break;
      case "googlelink":
        if (!value.trim()) {
          errorMessage = "Google review link is required";
        } else if (!value.includes("google.com") && !value.includes("maps.google.com") && !value.includes("goo.gl") && !value.includes("maps.app.goo.gl") && !value.includes("g.page")) {
          errorMessage = "Please enter a valid Google Maps or Google review link";
        }
        break;
      case "password":
        if (!value.trim()) {
          errorMessage = "Password is required";
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          errorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          errorMessage = "Please confirm your password";
        } else if (value !== formData.password) {
          errorMessage = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
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
    
    // Clear image error
    if (errors.shopImage) {
      setErrors(prev => ({
        ...prev,
        shopImage: ""
      }));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateStep = (stepNum) => {
    const newErrors = { ...errors };
    let hasErrors = false;

    switch (stepNum) {
      case 1:
        ["name", "email", "mobile"].forEach(field => {
          const errorMessage = validateField(field, formData[field]);
          newErrors[field] = errorMessage;
          if (errorMessage) hasErrors = true;
        });
        break;
      case 2:
        const shopNameError = validateField("shopName", formData.shopName);
        newErrors.shopName = shopNameError;
        if (shopNameError) hasErrors = true;
        
        if (!shopImage) {
          newErrors.shopImage = "Shop image is required";
          hasErrors = true;
        }
        break;
      case 3:
        ["instagramLink", "whatsappNumber", "emailLink", "portfolioLink", "googlelink"].forEach(field => {
          const errorMessage = validateField(field, formData[field]);
          newErrors[field] = errorMessage;
          if (errorMessage) hasErrors = true;
        });
        break;
      case 4:
        ["password", "confirmPassword"].forEach(field => {
          const errorMessage = validateField(field, formData[field]);
          newErrors[field] = errorMessage;
          if (errorMessage) hasErrors = true;
        });
        break;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async () => {
    // Validate all steps before submitting
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      setError("Please fix all validation errors before submitting.");
      return;
    }

    try {
      const apiUrl = 
        process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;

      setIsLoading(true);
      setError("");
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      if (shopImage) {
        formPayload.append("shopImage", shopImage);
      }
      const response = await fetch(`${apiUrl}/api/admin-signup`, {
        method: "POST",
        body: formPayload,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        Swal.fire({
          title: "Success!",
          text: "Registration completed successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#10b981",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/admin/login";
          }
        });
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
          formData.mobile.trim() &&
          !errors.name &&
          !errors.email &&
          !errors.mobile
        );
      case 2:
        return formData.shopName.trim() && shopImage && !errors.shopName && !errors.shopImage;
      case 3:
        return (
          formData.instagramLink.trim() &&
          formData.whatsappNumber.trim() &&
          formData.emailLink.trim() &&
          formData.portfolioLink.trim() &&
          formData.googlelink.trim() &&
          !errors.instagramLink &&
          !errors.whatsappNumber &&
          !errors.emailLink &&
          !errors.portfolioLink &&
          !errors.googlelink
        );
      case 4:
        return (
          formData.password.trim() &&
          formData.confirmPassword.trim() &&
          formData.password === formData.confirmPassword &&
          !errors.password &&
          !errors.confirmPassword
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
                onBlur={handleBlur}
                placeholder="Enter your full name"
                error={errors.name}
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
                autoComplete="username"
                error={errors.email}
              />
              <InputField
                label="Mobile Number"
                name="mobile"
                type="tel"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234567890"
                error={errors.mobile}
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
                onBlur={handleBlur}
                placeholder="Enter your shop name"
                error={errors.shopName}
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
                {errors.shopImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.shopImage}</p>
                )}
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
                onBlur={handleBlur}
                placeholder="https://instagram.com/yourshop"
                error={errors.instagramLink}
              />
              <InputField
                label="WhatsApp Number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234567890"
                error={errors.whatsappNumber}
              />
              <InputField
                label="Email Link"
                name="emailLink"
                type="email"
                value={formData.emailLink}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="contact@yourshop.com"
                error={errors.emailLink}
              />
              <InputField
                label="Portfolio Link"
                name="portfolioLink"
                type="url"
                value={formData.portfolioLink}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://yourportfolio.com"
                error={errors.portfolioLink}
              />
              <InputField
                label="Google Review Link"
                name="googlelink"
                type="url"
                value={formData.googlelink}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://maps.google.com/..."
                error={errors.googlelink}
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
                onBlur={handleBlur}
                placeholder="Enter a strong password"
                autoComplete="new-password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={errors.confirmPassword}
              />
              
                             <button
                 type="button"
                 onClick={handleSubmit}
                 disabled={!isStepValid(4) || isLoading}
                 className="w-full mt-4 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700 disabled:opacity-50"
               >
                 {isLoading ? "Creating Account..." : "Sign Up"}
               </button>
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

function InputField({ label, name, type = "text", value, onChange, onBlur, children, placeholder, showPassword, setShowPassword, error, ...props }) {
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
          onBlur={onBlur}
          placeholder={placeholder}
          required
          className={`w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
          {...props}
        />
        {(name === "password" || name === "confirmPassword") && setShowPassword && (
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
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}