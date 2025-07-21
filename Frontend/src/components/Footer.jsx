import React from "react";
import { Instagram, Twitter, Facebook, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black pt-5">
      <div className="md:max-w-6xl md:mx-auto px-4 md:px-8 py-12 grid md:grid-cols-3 gap-10 border-t border-gray-700">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wider text-white">
            TRYBE
          </h1>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Streetwear made for the fearless. Join the tribe and wear your
            voice.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Explore</h2>
          <ul className="space-y-3 text-sm text-white ">
            {["Home", "Shop", "About", "Contact"].map((item) => (
              <span
                key={item}
                className="hover:text-white cursor-pointer transition-all duration-200 mr-5"
              >
                {item}
              </span>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Stay Connected
          </h2>
          <div className="flex space-x-5 mb-6 text-white">
            <Instagram className="hover:text-pink-500 cursor-pointer transition" />
            <Twitter className="hover:text-sky-400 cursor-pointer transition" />
            <Facebook className="hover:text-blue-500 cursor-pointer transition" />
            <Music2 className="hover:text-white cursor-pointer transition" />
          </div>

          <form className="flex flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-900 px-3 py-2 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white w-auto"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
            >
              Join Trybe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-xs text-gray-500 md:max-w-6xl md:mx-auto">
        © {new Date().getFullYear()} TRYBE — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
