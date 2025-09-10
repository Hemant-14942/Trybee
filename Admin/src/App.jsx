import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/SideBar.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import Enquiry from './components/Enquiry.jsx';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenData = localStorage.getItem('token');
    if (tokenData) {
      setToken(tokenData);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {token ? (
        <>
          <div className="w-1/6 text-white">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-10">
              <Header />
            </div>
            <div className="mt-16 p-4 overflow-y-auto">
              <Routes>
                <Route path="/Dashboard" element={<Dashboard token={token} />} />
                <Route path="/AddProduct" element={<ProductForm token={token} />} />
                <Route path="/ProductList" element={<ProductList token={token} />} />
                <Route path="/Enquiry" element={<Enquiry />} />
                <Route path="*" element={<Navigate to="/Dashboard" />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
