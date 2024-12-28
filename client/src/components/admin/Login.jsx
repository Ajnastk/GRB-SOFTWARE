import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {

    const [formData,setFormData]=useState({
        email:'',
        password:'',
    });

    const navigate= useNavigate();

    const [error,setError]=useState('');

    const handleInputChange=async(e)=>{
        const { name,value }=e.target;
        setFormData({...formData,[name]: value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;

        console.log(backendUrl)

        console.log("form data being sent",formData)

        try {
            const response = await fetch(`${backendUrl}api/admin-login`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:formData.email,
                    password:formData.password,
                })
             });

             if(response.ok){
                const data= await response.json();
                alert(data.message);
                localStorage.setItem('token',data.token);
                navigate('/review-list')
             }else{
                const errorData= await response.json();
                alert(errorData.message);
                setError(errorData.message);
                }
        } catch (error) {
            console.error('Error :',error);
            setError('Something went wrong. Please try again')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600">
            <main className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Type your email"
                            required
                            className="w-full p-3 border bg-white border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Type your password"
                            required
                            className="w-full p-3 border bg-white border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleInputChange}
                        />
                    </div>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
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
