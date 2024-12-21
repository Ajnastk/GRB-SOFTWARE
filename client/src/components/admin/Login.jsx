import { Link } from "react-router-dom";
function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600">
            <main className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Type your username"
                            required
                            className="w-full p-3 border bg-white border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            placeholder="Type your password"
                            required
                            className="w-full p-3 border bg-white border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                        {/* Uncomment the link below to use the Register page */}
                        <Link to="/signup" className="text-indigo-600 hover:text-indigo-700">Register</Link>
                    </div>
                </form>
            </main>
            <footer className="mt-8 text-center text-gray-500 text-sm">
                {/* Footer content */}
            </footer>
        </div>
    );
}

export default Login;
