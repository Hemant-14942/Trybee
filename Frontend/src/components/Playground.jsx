"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";
import { imagekit } from "../lib/imageKitInstance";

const Playground = () => {
  const [view, setView] = useState("front");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [uploading, setUploading] = useState(false);
  const uploadedImageRef = useRef(null);
  const fileInputRef = useRef();

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const uploadedImageRef = await imagekit.upload({
          file: file,
          fileName: file?.name,
          isPublished: true,
          useUniqueFileName: false,
        });
        console.log("Uploaded file:", uploadedImageRef.url);

        canvasInstance.clear();
        canvasInstance.renderAll();

        const canvasImageRef = await FabricImage.fromURL(uploadedImageRef.url);
        canvasImageRef.left = 10;
        canvasImageRef.top = 25;
        canvasImageRef.scaleX = 0.4;
        canvasImageRef.scaleY = 0.3;

        canvasInstance.add(canvasImageRef);
        canvasInstance.renderAll();
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const addDefaultImage = async () => {
    const canvasImageRef = await FabricImage.fromURL(
      "https://res.cloudinary.com/dkqbawsqm/image/upload/v1753196759/placeholder_1_xvtjot.png"
    );
    canvasInstance.add(canvasImageRef);
    canvasImageRef.left = 10;
    canvasImageRef.top = 25;
    canvasImageRef.scaleX = 0.4;
    canvasImageRef.scaleY = 0.3;
    canvasInstance.renderAll();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const isMobile = window.innerWidth < 640;
      const canvasWidth = isMobile ? 100 : 140;
      const canvasHeight = isMobile ? 150 : 200;
      const containerWidth = isMobile ? "100px" : "140px";
      const containerHeight = isMobile ? "140px" : "200px";

      const canvas = new Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: "transparent",
        selection: false,
      });

      setCanvasInstance(canvas);

      const container = canvasRef.current.parentNode;
      if (container) {
        container.style.position = "absolute";
        container.style.top = "100px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.zIndex = 50;
        container.style.width = containerWidth;
        container.style.height = containerHeight;
        container.style.backgroundColor = "transparent";
      }

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvasInstance) {
      addDefaultImage();
    }
  }, [canvasInstance]);

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
        <div className="flex flex-col flex-1 w-full relative">
          <div className="relative bg-gray-700 rounded-xl p-4 sm:p-6 border border-gray-700 flex justify-center items-center min-h-[320px]">
            {/* Canvas overlay */}
            <canvas ref={canvasRef} className="z-50" />
            {/* T-shirt image */}
            <img
              src={view === "front" ? "/tshirt_front.png" : "/tshirt_back.png"}
              alt={`T-Shirt ${view}`}
              className="h-[260px] sm:h-[320px] w-auto object-contain"
            />
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
              className={`w-full md:w-auto px-4 py-2 rounded text-white transition ${
                uploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Img"}
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
              Upscale Image
            </button>
            <button className="border border-gray-600 px-3 py-1 rounded">
              Smart Crop
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
