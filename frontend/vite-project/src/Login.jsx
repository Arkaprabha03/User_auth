import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setIsLoggedIn(true); // Set login status to true
        console.log("User data:", data); // Debugging
      } else {
        setMessage(data.message || "Invalid email or password.");
        setIsLoggedIn(false); // Set login status to false
      }
    } catch (error) {
      setMessage("An error occurred while logging in. Please try again.");
      setIsLoggedIn(false); // Set login status to false
    }
  };

  // Navigate to the register page
  const goToRegister = () => {
    navigate("/register");
  };

  // Navigate to the user's page
  const goToUsersPage = () => {
    navigate("/users"); // Adjust the route based on your actual user page route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">{message}</p>

        {/* Register Button */}
        <div className="mt-4 text-center">
          <button
            onClick={goToRegister}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Don't have an account? Register here.
          </button>
        </div>

        {/* Conditional Button to Navigate to User Page */}
        {isLoggedIn && (
          <div className="mt-4 text-center">
            <button
              onClick={goToUsersPage}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
            >
              Go to User Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
