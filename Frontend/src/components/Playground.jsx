import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Canvas, FabricImage } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { imagekit } from "../lib/imageKitInstance";
import { TrybeContext } from "../context/store";

const Playground = () => {
  const { backendUrl, token } = useContext(TrybeContext);
  const [view, setView] = useState("front");
  const [selectedColor, setSelectedColor] = useState("ffffff");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("Cotton");
  const [imageUrl, setImageUrl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [transforming, setTransforming] = useState({});
  const [uploadedImage, setUploadedImage] = useState(
    "https://ik.imagekit.io/mcit5snjx/placeholder.png"
  );

  const uploadedImageRef = useRef(null);
  const fileInputRef = useRef();
  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  const colors = [
    "ffffff",
    "000000",
    "dc2626",
    "16a34a",
    "2563eb",
    "f59e0b",
    "d946ef",
    "facc15",
    "6b7280",
    "f97316",
  ];
  const imageTransformationOptions = [
    { name: "BG Remove", imageKitTr: "e-bgremove" },
    { name: "Upscale img", imageKitTr: "e-upscale" },
    { name: "Smart Shadow", imageKitTr: "e-shadow" },
    { name: "Retouch", imageKitTr: "e-retouch" },
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploaded = await imagekit.upload({
        file,
        fileName: file.name,
        isPublished: true,
        useUniqueFileName: false,
      });
      setUploadedImage(uploaded.url);
    } catch (err) {
      alert("Upload failed. Try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const isTransformationApplied = (tr) => {
    const [, query] = uploadedImage.split("?");
    return query?.includes(tr) ?? false;
  };

  const applyImageTransformation = async (transformation, alreadyApplied) => {
    setTransforming((prev) => ({ ...prev, [transformation]: true }));
    const [baseUrl, query] = uploadedImage.split("?");
    let existing = query?.split("tr=")[1] || "";
    const transformations = existing.split(",").filter(Boolean);

    let newUrl = "";
    if (alreadyApplied) {
      const updated = transformations
        .filter((t) => t !== transformation)
        .join(",");
      newUrl = `${baseUrl}${updated ? `?tr=${updated}` : ""}`;
    } else {
      const updated = [...transformations, transformation].join(",");
      newUrl = `${baseUrl}?tr=${updated}`;
    }

    setUploadedImage(newUrl);

    const checkImageLoad = new Image();
    checkImageLoad.src = newUrl;
    checkImageLoad.onload = () => {
      setTransforming((prev) => ({ ...prev, [transformation]: false }));
    };
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedSize) {
        alert("Please select a size before adding to cart");
        return;
      }
      if (!selectedColor) {
        alert("Please select a color before adding to cart");
        return;
      }
      if (!selectedFabric) {
        alert("Please select a fabric before adding to cart");
        return;
      }

      const payload = {
        size: selectedSize,
        quantity: 1,
        color: selectedColor,
        fabric: selectedFabric,
        price : Number(1000),
        side: view === "front" ? "Front" : "Back",
        designImage: uploadedImage,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/cart//add-to-cart`,
        payload,
        { headers: { token: token } }
      );

      console.log("Cart Updated:", data);
      alert("Item added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  async function query(data) {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  const generateImage = async () => {
    setUploading(true);
    try {
      const blob = await query({
        inputs: prompt || "Astronaut riding a horse",
      });

      const file = new File([blob], "tshirt-design.png", { type: blob.type });

      const uploaded = await imagekit.upload({
        file,
        fileName: `tshirt-design-${uuidv4()}.png`,
        isPublished: true,
        useUniqueFileName: true,
      });

      setUploadedImage(uploaded.url);
    } catch (err) {
      alert("Upload failed. Try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const isMobile = window.innerWidth < 640;
    const canvas = new Canvas(canvasRef.current, {
      width: isMobile ? 100 : 140,
      height: isMobile ? 150 : 200,
      backgroundColor: "transparent",
      selection: false,
    });

    setCanvasInstance(canvas);

    const container = canvasRef.current.parentNode;
    if (container) {
      Object.assign(container.style, {
        position: "absolute",
        top: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: isMobile ? "100px" : "140px",
        height: isMobile ? "140px" : "200px",
        backgroundColor: "transparent",
      });
    }

    return () => canvas.dispose();
  }, []);

  useEffect(() => {
    const loadImageToCanvas = async () => {
      if (!canvasInstance || !uploadedImage) return;
      canvasInstance.clear();
      const image = await FabricImage.fromURL(uploadedImage);
      Object.assign(image, {
        left: -2,
        top: 40,
        scaleX: 0.2,
        scaleY: 0.2,
      });
      canvasInstance.add(image);
      canvasInstance.renderAll();
    };

    loadImageToCanvas();
  }, [canvasInstance, uploadedImage]);

  return (
    <div className="min-h-screen py-6 text-white font-sans md:max-w-6xl mx-auto px-4 md:px-0">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-8 text-black">
        Customize T-Shirt Design with AI
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
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

        <div className="flex flex-col flex-1 relative w-full">
          <div className="relative bg-gray-700 rounded-xl p-4 sm:p-6 border-2 border-gray-900 flex justify-center items-center min-h-[320px]">
            <canvas ref={canvasRef} className="z-50" />
            <img
              src={
                view === "front"
                  ? `/customize/tshirt_front_${selectedColor}.png`
                  : `/customize/tshirt_back_${selectedColor}.png`
              }
              alt={`T-Shirt ${view}`}
              className="h-[260px] sm:h-[320px] w-auto object-contain pointer-events-none"
            />
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 border border-gray-700 p-4 rounded-lg">
            <input
              type="text"
              placeholder="Enter your design prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 w-full bg-gray-100 border border-gray-600 rounded px-4 py-2 text-black placeholder-gray-500"
            />
            <button
              onClick={generateImage}
              className="w-full md:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Generate
            </button>
            <span className="text-black">OR</span>
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

        <div className="space-y-6 border border-black rounded-xl px-4 py-6 w-full lg:w-[300px]">
          <div className="flex flex-wrap gap-2 justify-center w-full text-black">
            {imageTransformationOptions.map(({ name, imageKitTr }) => {
              const isApplied = isTransformationApplied(imageKitTr);
              const isLoading = transforming[imageKitTr];

              return (
                <button
                  key={name}
                  className={`px-3 py-1 rounded border flex items-center gap-2 ${
                    isApplied
                      ? "bg-blue-500 text-white"
                      : "border-gray-600 text-black"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (!isLoading) {
                      applyImageTransformation(imageKitTr, isApplied);
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin w-4 h-4 border-t-2 border-white rounded-full" />
                  ) : (
                    name
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-5 gap-3">
            {colors.map((c, idx) => (
              <button
                key={idx}
                className={`w-12 h-12 rounded-full border-2 ${
                  selectedColor === c ? "border-blue-400" : "border-gray-600"
                }`}
                style={{ backgroundColor: `#${c}` }}
                onClick={() => setSelectedColor(c)}
              />
            ))}
          </div>

          <select
            className="w-full border border-black px-3 py-2 rounded text-sm text-black"
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
          >
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

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition duration-300 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg w-full mt-3 md:mt-5"
          >
            Add to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playground;
