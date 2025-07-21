import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-600 text-white shadow-md z-50 border-b border-gray-800">
      <div className="md:max-w-6xl md:mx-auto px-4 md:px-0 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide cursor-pointer">
          TRYBE
        </div>

        <ul className="hidden md:flex justify-center space-x-10 text-sm font-medium uppercase">
          <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
            Home
          </li>
          <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
            Collection
          </li>
          <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
            Customize
          </li>
          <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
            About
          </li>
          <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
            Contact
          </li>
        </ul>

        <div className="flex items-center">
          <button className="hidden md:inline-block bg-[#FDFBF6] text-black hover:text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition cursor-pointer">
            Shop Now 🧢
          </button>
          <button className="text-white transition md:hidden">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
