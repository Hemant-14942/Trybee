import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Customize from "./pages/Customize";
import { TrybeContext } from "./context/store";
import { useContext } from "react";
import Auth from "./pages/Auth";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

const App = () => {
  const { isAuthVisible, setIsAuthVisible } = useContext(TrybeContext);

  return (
    <div>
      <Navbar />
      <Auth isAuthVisible={isAuthVisible} setIsAuthVisible={setIsAuthVisible} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
