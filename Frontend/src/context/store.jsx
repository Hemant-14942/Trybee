import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TrybeContext = createContext();

export const TrybeProvider = ({ children }) => {
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const backendUrl = "http://localhost:8000";

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

const addToCart = async (itemId, size, quantity) => {
  const updatedCart = {
    ...cartItems,
    [`${itemId}-${size}`]: { quantity, size }, // use composite key
  };
  setCartItems(updatedCart);

  if (token) {
    try {
      await axios.post(
        `${backendUrl}/api/cart/add-to-cart`,
        { itemId, size, quantity },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  }
};

const updateCart = async (itemId, size, quantity) => {
  if (quantity < 1) return deleteCartItem(itemId, size);

  try {
    const response = await axios.post(
      `${backendUrl}/api/cart/update-cart`,
      { itemId, size, quantity },
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItems((prev) => ({
        ...prev,
        [`${itemId}-${size}`]: { quantity, size },
      }));
    }
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

const deleteCartItem = async (itemId, size) => {
  try {
    await axios.post(
      `${backendUrl}/api/cart/delete-cart`,
      { itemId, size },
      { headers: { token } }
    );

    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[`${itemId}-${size}`];
      return newCart;
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
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
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    toast.success("Logged Out Successfully");
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      setToken(tokenData);
    }
  }, []);

  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    addToCart,
    deleteCartItem,
    updateCart,
    getUserCart,
    cartItems,
    isAuthVisible,
    setIsAuthVisible,
    backendUrl,
    products,
    token,
    setToken,
    logOut,
  };

  return (
    <TrybeContext.Provider value={value}>{children}</TrybeContext.Provider>
  );
};
