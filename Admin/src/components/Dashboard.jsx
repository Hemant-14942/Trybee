import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/list-product', {
        headers: { token },
      });
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const productsSold = products.length; 
  const totalRevenue = products.reduce((acc, product) => acc + product.price, 0); 
  const activeUsers = 150; 
  const newOrders = 45; 

  return (
    <div className=" bg-gradient-to-r from-gray-200 to-gray-50 shadow-xl py-8 border-2 border-gray-300 sm:ml-6 rounded-xl my-10  px-6 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-3 text-[#353333]">
        <div className="text-3xl font-extrabold">Dashboard</div>
        <div className="text-lg font-semibold text-gray-800">
          Hello, Welcome Back <span className="italic text-[#353333] font-bold">Admin</span>
        </div>
        <div className="text-sm font-light text-gray-600">
          Here are some insights as per the sales. Please have a look.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center border-2 border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="text-6xl font-bold text-[#353333] mb-2">{productsSold}</div>
          <div className="text-sm font-medium text-gray-600 uppercase">Products Listed</div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 text-center border-2 border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="text-6xl font-bold text-[#353333] mb-2">₹{0}</div>
          <div className="text-sm font-medium text-gray-600 uppercase">Total Revenue</div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 text-center border-2 border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="text-6xl font-bold text-[#353333] mb-2">{0}</div>
          <div className="text-sm font-medium text-gray-600 uppercase">Active Users</div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 text-center border-2 border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="text-6xl font-bold text-[#353333] mb-2">{0}</div>
          <div className="text-sm font-medium text-gray-600 uppercase">New Orders</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
