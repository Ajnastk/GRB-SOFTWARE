"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Stepper, { Step } from "../../component/Stepper"; // Assuming Stepper is in this path

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        localStorage.setItem("token", data.token);
        router.push("/admin/adminPage"); // Redirect to admin dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <Stepper
          initialStep={1}
          onFinalStepCompleted={handleSubmit}
          nextButtonText="Sign In"
          nextButtonProps={{
            disabled: isLoading || !formData.email.trim() || !formData.password.trim(),
          }}
          backButtonProps={{
            disabled: true, // No back button for single-step form
          }}
          disableStepIndicators={true} // Hide step indicators for single-step form
          stepCircleContainerClassName="bg-white rounded-2xl shadow-xl border border-gray-100"
          footer={
            <div className="text-center">
              {error && (
                <div className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <p className="text-sm text-gray-600 ">
                Don&apos;t have an account?{" "}
                <Link
                  href="/admin/signup"
                  className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          }
        >
          <Step>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
                <p className="text-gray-600">Sign in to your account</p>
              </div>
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                autoComplete="username"
              />
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, children, placeholder, icon, showPassword, setShowPassword, ...props }) {
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
        {name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword && setShowPassword((prev) => !prev)}
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