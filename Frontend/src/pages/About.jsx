// src/components/About.jsx
import React from "react";
import { Flame, Users, Star } from "lucide-react";

const About = () => {
  return (
    <section className="bg-[#2e3743] text-white py-20 px-6 md:px-20" id="about">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase">
          We Are <span className="text-[#facc15]">TRYBE</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Born on the streets, built by rebels. We design for the bold, the brave, and the misfits who don’t follow trends — they make them. TRYBE is not just clothing — it’s a movement.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center">
            <Flame className="text-yellow-400 h-12 w-12 mb-2" />
            <p className="text-3xl font-bold">2019</p>
            <span className="text-gray-400">Started the Fire</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="text-blue-400 h-12 w-12 mb-2" />
            <p className="text-3xl font-bold">10K+</p>
            <span className="text-gray-400">Riders in the Tribe</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="text-pink-400 h-12 w-12 mb-2" />
            <p className="text-3xl font-bold">4.9</p>
            <span className="text-gray-400">Average Reviews</span>
          </div>
        </div>

        {/* BRAND STORY */}
        <div className="bg-[#1f2937] rounded-2xl p-8 mt-16 shadow-lg">
          <h3 className="text-3xl font-semibold mb-4 uppercase">The Street is Our Canvas</h3>
          <p className="text-gray-300 leading-relaxed text-md md:text-lg">
            Every piece we drop is inspired by graffiti walls, underground music, urban chaos, and the raw spirit of self-expression. Whether you skate, create, or disrupt — you belong in TRYBE. No rules, just real.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
