import React, { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export const categories = [
  { name: "T Shirts", logo: "/tshirts.svg" },
  { name: "Shirts", logo: "/shirts.svg" },
  { name: "Lowers", logo: "/lowers.svg" },
  { name: "Hoodi", logo: "/hoodies.svg" },
  { name: "Caps", logo: "/caps.svg" },
];

const availableSizes = ["S", "M", "L", "XL", "Free Size"];

const ProductForm = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("sizes", JSON.stringify(sizes));

      if (image) formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8000/api/product/add-product",
        formData,
        { headers: { token } }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg my-8">
      <h2 className="text-3xl font-bold text-black mb-8 text-center tracking-wide">
        Add New Product
      </h2>
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Product Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Category
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Sizes
            </label>
            <div className="flex gap-3">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-5 py-2 border rounded-md text-sm font-medium transition 
                    ${
                      sizes.includes(size)
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Product Description
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description (max 250 characters)"
              maxLength={250}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 resize-none"
              rows={4}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Product Image
            </label>
            <label
              htmlFor="image"
              className="w-full h-40 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-200"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-gray-500 text-sm flex flex-col items-center">
                  <i className="bi bi-cloud-upload-fill text-2xl"></i>
                  <span>Upload Image</span>
                </div>
              )}
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className={`w-full text-white bg-gray-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v4M12 18v4M6 6l2.5 2.5M6 18l2.5-2.5M18 6l-2.5 2.5M18 18l-2.5-2.5"
                  />
                </svg>
                <span className="ml-2">Saving...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
