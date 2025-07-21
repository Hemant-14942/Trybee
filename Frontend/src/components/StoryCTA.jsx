import React from "react";

export default function StoryCTA() {
  return (
    <section className="md:max-w-6xl md:mx-auto py-20 px-6 md:px-0 flex flex-col items-center text-center md:flex-row md:justify-center md:text-left gap-10">
      <div className="w-3/4 md:w-1/3 flex justify-center">
        <img
          src="/banner1.png"
          alt="Left Style"
          className="w-[300px] md:w-[340px] rotate-[-12deg] rounded-lg shadow-lg border border-gray-300 bg-gray-100"
        />
      </div>

      <div className="md:w-1/3 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-serif font-semibold mb-4 text-center">
          Style that tells a <span className="underline">STORY</span>
        </h2>
        <p className="text-gray-700 text-base max-w-md mb-6 text-center">
          Each piece in our collection speaks volumes, reflecting your unique
          journey. Express your personality and style through our curated
          designs.
        </p>
        <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
          LEARN MORE
        </button>
      </div>

      <div className="w-3/4 md:w-1/3 flex justify-center">
        <img
          src="/banner2.png"
          alt="Right Style"
          className="w-[300px] md:w-[340px] rotate-[20deg] rounded-lg shadow-lg border border-gray-300 bg-gray-100"
        />
      </div>
    </section>
  );
}
