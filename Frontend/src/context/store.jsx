import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TrybeContext = createContext();

export const TrybeProvider = ({ children }) => {
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const backendUrl = "https://trybe-w8j9.onrender.com";

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list-product`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add-to-cart`,
        item,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const updateCart = async (item) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update-cart`,
        item,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const deleteCartItem = async (item) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/delete-cart`,
        item,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error.message);
    }
  };

  const getUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get-cart`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const url = `${backendUrl}/api/user/get-profile`;
      const response = await axios.get(url, { headers: { token } });
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const updateProfile = async (data) => {

    try {
      const url = `${backendUrl}/api/user/edit-user`;
      const response = await axios.post(url, data, { headers: { token } });
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    toast.success("Logged Out Successfully");
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) setToken(tokenData);
  }, []);

  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    addToCart,
    updateCart,
    deleteCartItem,
    getUserCart,
    getUserProfile,
    user,
    setUser,
    updateProfile,
    cartItems,
    products,
    backendUrl,
    isAuthVisible,
    setIsAuthVisible,
    token,
    setToken,
    logOut,
  };

  return (
    <TrybeContext.Provider value={value}>{children}</TrybeContext.Provider>
  );
};
