import React from "react";

export default function Collection() {
  return (
    <section className="px-6 md:px-0 md:max-w-6xl md:mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col gap-10">
        <div className="space-y-6 ">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">2025</h2>
            <p className="text-gray-700 mt-2 max-w-sm">
              Discover timeless elegance with our curated collection of stylish
              dresses, perfect for every occasion.
            </p>
          </div>
          <img
            src="/collection1.png"
            alt="Main Elegant"
            className="rounded-lg w-full object-cover bg-gray-400"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src="/collection5.png "
                alt="Arctic Puff Coat"
                className="w-full h-auto object-cover rounded bg-gray-400"
              />
              <h3 className="text-sm font-medium mt-2">ArcticPuff Coat</h3>
              <p className="text-sm font-semibold">$99.99</p>
            </div>

            <div>
              <img
                src="/collection6.png"
                alt="SnowGuard Parka"
                className="w-full h-auto object-cover rounded bg-gray-400"
              />
              <h3 className="text-sm font-medium mt-2">SnowGuard Parka</h3>
              <p className="text-sm font-semibold">$119.99</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-6xl font-semibold text-gray-900">
          Elegant Trendy collection
        </h2>

        <div>
          <h3 className="text-lg font-medium">FrostShield Jacket</h3>
          <p className="text-sm text-gray-600">
            Stay warm, stylish, and cozy in cold weather.
          </p>
          <p className="text-sm font-semibold mt-1">$89.99</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src="/collection2.png "
              alt="Arctic Puff Coat"
              className="w-full h-auto object-cover rounded bg-gray-400"
            />
            <h3 className="text-sm font-medium mt-2">ArcticPuff Coat</h3>
            <p className="text-sm font-semibold">$99.99</p>
          </div>

          <div>
            <img
              src="/model.png"
              alt="SnowGuard Parka"
              className="w-full h-auto object-cover rounded bg-gray-400"
            />
            <h3 className="text-sm font-medium mt-2">SnowGuard Parka</h3>
            <p className="text-sm font-semibold">$119.99</p>
          </div>
        </div>

        <div className="space-y-6">
          <img
            src="/collection4.png"
            alt="Main Elegant"
            className="rounded-lg w-full object-cover bg-gray-400"
          />
        </div>
      </div>
    </section>
  );
}
