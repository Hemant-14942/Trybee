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

const App = () => {
  const { isAuthVisible, setIsAuthVisible } = useContext(TrybeContext);

  return (
    <div>
      <Navbar />
      <Auth isAuthVisible={isAuthVisible} setIsAuthVisible={setIsAuthVisible} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
