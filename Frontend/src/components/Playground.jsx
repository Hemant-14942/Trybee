import React, { useRef, useState } from "react";

const Playground = () => {
  const [view, setView] = useState("front");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const uploadedImageRef = useRef(null);
  const fileInputRef = useRef();

  const colors = [
    "#1f2937",
    "#dc2626",
    "#16a34a",
    "#2563eb",
    "#f59e0b",
    "#d946ef",
    "#facc15",
    "#e2e8f0",
    "#6b7280",
    "#f97316",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadedImageRef.current = file;
      console.log("Uploaded file:", file);
      // You can also generate a preview URL here if needed
    }
  };

  return (
    <div className="min-h-screen text-white py-6 font-sans md:max-w-6xl md:mx-auto px-4 md:px-0">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-black">
        Customize T-Shirt Design with AI
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch w-full">
        {/* Left Panel */}
        <div className="flex lg:flex-col gap-4 justify-center items-center border border-black rounded-xl px-4 py-6 lg:py-40 w-full lg:w-auto">
          {["Front", "Back"].map((label) => (
            <button
              key={label}
              onClick={() => setView(label.toLowerCase())}
              className={`px-4 py-2 rounded border border-black w-24 text-sm sm:text-base ${
                view === label.toLowerCase()
                  ? "bg-blue-500 text-white"
                  : "text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Center Panel */}
        <div className="flex flex-col flex-1 w-full">
          <div className="bg-gray-700 rounded-xl p-4 sm:p-6 border border-gray-700 flex justify-center items-center">
            <div className="relative">
              <img
                src={
                  view === "front" ? "/tshirt_front.png" : "/tshirt_back.png"
                }
                alt={`T-Shirt ${view}`}
                className="h-[260px] sm:h-[320px] w-auto object-contain"
              />
              <div className="absolute top-[65px] sm:top-[80px] left-1/2 transform -translate-x-1/2 w-[100px] sm:w-[130px] h-[130px] sm:h-[150px] border-2 border-dashed border-gray-500 bg-white/10" />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 border border-gray-700 p-4 rounded-lg">
            <input
              type="text"
              placeholder="Enter your design prompt..."
              className="flex-1 w-full bg-gray-100 border border-gray-600 rounded px-4 py-2 text-black placeholder-gray-500"
            />
            <span className="text-black">-OR-</span>
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-full md:w-auto bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              Upload Img
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6 border border-black rounded-xl px-4 py-6 w-full lg:w-[280px]">
          <div className="flex gap-2 justify-between text-black">
            <button className="border border-gray-600 px-3 py-1 rounded">
              BG Remove
            </button>
            <button className="border border-gray-600 px-3 py-1 rounded">
              Shadow
            </button>
            <button className="border border-gray-600 px-3 py-1 rounded">
              Crop
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {colors.map((c, idx) => (
              <button
                key={idx}
                className={`w-12 h-12 rounded-full border-2 ${
                  selectedColor === c ? "border-blue-400" : "border-gray-600"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setSelectedColor(c)}
              />
            ))}
          </div>

          <select className="w-full border border-black px-3 py-2 rounded text-sm text-black">
            <option>Choose Fabric</option>
            <option value="cotton">Cotton</option>
            <option value="polyester">Polyester</option>
            <option value="blend">Blended</option>
          </select>

          <div className="flex gap-3 justify-between">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 px-4 py-2 rounded border border-black ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div>
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition duration-300 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg w-full mt-3 md:mt-5 lg:mt-10">
              Add to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
