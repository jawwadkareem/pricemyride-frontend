import { useEffect, useState } from "react";
import image from "../../../../public/pricemyride.png"
import axios from "axios";
import { SERVER_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import {  message, } from 'antd';

export default function LoginPage() {
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    try {
      const res=await axios.post(`${SERVER_URL}/api/auth/login`,{
        email:formData.email,
        password:formData.password,
      })
      if(res.status==200){
        localStorage.setItem("price-my-ride-x-token",res.data.token)
        alert("Logged in Successfully")
          navigate("/dashboard/records-entries")
      }
    } catch (err) {
     
      setError("Invalid credentials, please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="bg-sky-300 min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 px-5 md:px-20 py-10">
      <div className="w-full md:block hidden max-w-lg lg:max-w-xl">
        <img
          src={image}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          alt="Price My Ride"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-2xl">
        <div className="bg-white/20 py-20 px-10 bg-blur rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-4xl font-bold mb-8">LOGIN</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-800"}`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-800"}`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white p-2 mt-6 rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
    
      </div>
    </section>
  );
}