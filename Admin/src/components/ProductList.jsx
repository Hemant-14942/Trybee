import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export const categories = [
  { name: "T Shirts", logo: "/tshirts.svg" },
  { name: "Shirts", logo: "/shirts.svg" },
  { name: "Lowers", logo: "/lowers.svg" },
  { name: "Hoodi", logo: "/hoodies.svg" },
  { name: "Caps", logo: "/caps.svg" },
];

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/list-product`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("category", editProduct.category);

      if (editProduct.sizes) {
        formData.append("sizes", JSON.stringify(editProduct.sizes));
      }

      if (editProduct.image instanceof File) {
        formData.append("image", editProduct.image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/edit-product/${editProduct._id}`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Product updated successfully!");
        setEditProduct(null);
        getData();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/remove/${id}`,
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          alert("Product deleted successfully!");
          getData();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete product.");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white shadow-xl py-10 px-6 border border-gray-200 rounded-2xl mx-6 my-10 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Products
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No products available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
              <tr>
                {[
                  "Image",
                  "Product Name",
                  "Category",
                  "Price",
                  "Description",
                  "Sizes",
                  "Actions",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 px-4 py-3 text-left font-semibold"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex justify-center items-center">
                      <img
                        src={product.image}
                        alt={product.name || "Product"}
                        className="w-14 h-14 object-contain rounded-lg shadow"
                      />
                    </div>
                  </td>

                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">
                    {product.name || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {product.category || "N/A"}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-900 font-bold">
                    ₹{product.price || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-600 max-w-xs truncate">
                    {product.description || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {product.sizes?.length ? (
                      <div className="grid grid-cols-2 gap-3">
                        {product.sizes.map((size, idx) => (
                          <span
                            key={idx}
                            className="flex items-center justify-center w-7 h-7 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold border"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>

                  <td className="border border-gray-200 px-4 py-3 text-center space-x-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="text-red-500 hover:text-red-700 font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl relative w-[90%] max-w-lg animate-fadeIn">
            <h3 className="text-2xl font-bold mb-5 text-gray-800">
              Edit Product
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditProduct((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Category</label>
                <select
                  name="category"
                  value={editProduct.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Sizes</label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL", "Free Size"].map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={size}
                        checked={editProduct.sizes?.includes(size)}
                        onChange={(e) => {
                          const newSizes = e.target.checked
                            ? [...(editProduct.sizes || []), size]
                            : editProduct.sizes.filter((s) => s !== size);

                          setEditProduct((prev) => ({
                            ...prev,
                            sizes: newSizes,
                          }));
                        }}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
