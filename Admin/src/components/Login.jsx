import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

    const[email,setEmail] = useState('');
    const[password,setPassword]= useState('');


    const formSubmit =async(e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/admin`,{email,password})
            console.log(response.data);
            localStorage.setItem('token',response.data.token);
            navigate('/Dashboard')
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        <form onSubmit={formSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input 
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              name='email'
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              name='password'
              value={password}
              type="password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="••••••••••"
              required
            />
          </div>

          <button type='submit' className="w-full bg-black text-white py-3 rounded-lg font-medium">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
