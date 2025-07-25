import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrybeContext } from "../context/store";

const Navbar = () => {
  const { token, isAuthVisible, setIsAuthVisible } = useContext(TrybeContext);
  const navigate = useNavigate();
  const handleShopClick = () => {
    if (token) {
      navigate("/collections");
    } else {
      setIsAuthVisible(true);
    }
  };
  return (
    <nav className="w-full bg-gray-600 text-white shadow-md z-50 border-b border-gray-800">
      <div className="md:max-w-6xl md:mx-auto px-4 md:px-0 py-3 flex justify-between items-center">
        <Link to={"/"}>
          <div className="text-2xl font-bold tracking-wide cursor-pointer">
            TRYBE
          </div>
        </Link>
        <ul className="hidden md:flex justify-center space-x-10 text-sm font-medium uppercase">
          <Link to={"/"}>
            <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/collections"}>
            <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
              Collection
            </li>
          </Link>
          <Link to={"/customize"}>
            <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
              Customize
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
              About
            </li>
          </Link>
          <li className="hover:text-gray-200 hover:underline transition cursor-pointer">
            Contact
          </li>
        </ul>

        <div className="flex items-center">
          <button
            onClick={handleShopClick}
            className="hidden md:inline-block bg-[#FDFBF6] text-black hover:text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            Shop Now 🧢
          </button>
          <button className="text-white transition md:hidden">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
