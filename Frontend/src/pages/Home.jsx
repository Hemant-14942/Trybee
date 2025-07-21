import React from "react";
import HeroSection from "../components/HeroSection";
import ScrollBanner from "../components/ScrollBanner";
import Collection from "../components/Collection";
import StoryCTA from "../components/StoryCTA";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import Category from "../components/Category";

const Home = () => {
  return (
    <div className="bg-[#fdfbf7]">
      <HeroSection />
      <ScrollBanner />
      <ProductList title={"Popular Products ⚡️"} />
      <Collection />
      <StoryCTA />
      <ProductList title={"Latest Drops 🔥"} />
      <Category />
      <Banner />
    </div>
  );
};

export default Home;
