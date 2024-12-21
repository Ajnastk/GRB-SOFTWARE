import { useState } from "react";

import { Link } from "react-router-dom";


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm sm:max-w-md">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
                    Register
                </h2>
                <form>
                    {/* Username Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Type your username"
                            required
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="userEmail"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            placeholder="Type your email"
                            required
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Mobile Number Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="userMobile"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            name="userMobile"
                            id="userMobile"
                            placeholder="Type your mobile number"
                            pattern="[0-9]{10}"
                            required
                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <label
                            htmlFor="userPassword"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="userPassword"
                            id="userPassword"
                            placeholder="Type your password"
                            required
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
                            htmlFor="userConfirmPassword"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="userConfirmPassword"
                            id="userConfirmPassword"
                            placeholder="Confirm your password"
                            required
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
                    {/* <Link
                        to="/signin"
                        className="text-blue-500 hover:underline"
                    >
                        Sign in
                    </Link> */}
                </p>
            </div>
        </div>
    );
};

export default Signup;
