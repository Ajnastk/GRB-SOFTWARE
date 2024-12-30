import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    googlelink: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const backendUrl = import.meta.env.MODE === "production"
          ?import.meta.env.REACT_APP_BACKEND_URL
          :"http://localhost:3000/";

    if (formData.password !== formData.confirmPassword) {
      alert("Password does not match");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}api/admin-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          googlelink: formData.googlelink,
        }),
      });

      const data = await response.json();
      console.log("Server response:", data); // Log the response to check error details

      if (data.message === "Admin successfully created") {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="name" // Matches the key in formData
              id="name"
              placeholder="Type your username"
              value={formData.name} // Matches the key in formData
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email" // Matches the key in formData
              id="Email"
              placeholder="Type your email"
              value={formData.email} // Matches the key in formData
              onChange={handleChange}
              required
              autoComplete="email" // Added autocomplete attribute
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label
              htmlFor="MobileNumber"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile" // Matches the key in formData
              id="MobileNumber"
              placeholder="Type your mobile number"
              pattern="[0-9]{10}"
              value={formData.mobile} // Matches the key in formData
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Google Review Link */}
          <div className="mb-4">
            <label
              htmlFor="googleReviewLink"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Google Review Link:
            </label>
            <input
              type="url"
              name="googlelink" // Matches the key in formData
              id="googlelink"
              placeholder="Enter your Google review link"
              value={formData.googlelink} // Matches the key in formData
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password" // Matches the key in formData
              id="Password"
              placeholder="Type your password"
              value={formData.password} // Matches the key in formData
              onChange={handleChange}
              required
              autoComplete="new-password" // Added autocomplete attribute
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500 mt-5"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="ConfirmPassword"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword" // Matches the key in formData
              id="ConfirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword} // Matches the key in formData
              onChange={handleChange}
              required
              autoComplete="new-password" // Added autocomplete attribute
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

        {/* Shortcut to Sign-In Page */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
