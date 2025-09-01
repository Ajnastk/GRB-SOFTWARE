"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff, Store } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Stepper, { Step } from "../../../component/Stepper";
import Swal from "sweetalert2";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_API_URL_DEV
          : process.env.NEXT_PUBLIC_API_URL_PROD;

      setIsLoading(true);
      setError("");

      const response = await fetch(`${apiUrl}/api/admin-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: "Account Created!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#10b981",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/admin/login");
          }
        });
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
          nextButtonText="Sign Up"
          backButtonProps={{
            disabled: true,
          }}
          disableStepIndicators={true}
          stepCircleContainerClassName="bg-white rounded-2xl shadow-xl border border-gray-100"
          footer={
            <div className="text-center">
              {error && (
                <div className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/admin/login"
                  className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>
          }
        >
          <Step>
            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <User className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Create Admin Account
                  </h3>
                  <p className="text-gray-600">
                    Fill in your details to get started
                  </p>
                </div>

                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Shop Name"
                  required
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  autoComplete="username"
                  required
                />

                <InputField
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  required
                />

                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  required
                />

                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  required
                />

                <button
                  type="submit"
                  className="w-full mt-8 flex items-center justify-center rounded-full bg-green-500 py-2 px-4 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword,
  required,
  ...props
}) {
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
          required={required}
          className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
          {...props}
        />
        {name.toLowerCase().includes("password") && (
          <button
            type="button"
            onClick={() =>
              setShowPassword && setShowPassword((prev) => !prev)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
