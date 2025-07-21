import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full 2xl:max-w-6xl 2xl:mx-auto">
      <div className="absolute inset-0 bg-black/30 shadow-sm z-10" />

      <div className="absolute inset-0 flex justify-center items-start z-20">
        <h1 className="md:text-5xl font-bold text-white mt-3 md:mt-20 text-2xl text-center">
          Fit check? Nah, Fit flex 🔥 🧢
        </h1>
      </div>

      <img src="/poster.png" alt="Banner" className="w-full h-auto" />
    </div>
  );
};

export default Banner;
