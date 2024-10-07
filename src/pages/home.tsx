import React from "react";
import Gallery from "../components/home/galleryHome";
import Hero from "../components/home/hero";
import Browserrange from "../components/home/browserRange";
import ProductGrid from "../components/home/productGrid";
import InspirationSection from "../components/home/InspirationSection";
import { data } from "../utills/data/home";
import Layout from "../components/common/layout";

const Home: React.FC = () => {
  return (
      <>
      <Layout>
        <Hero hero={data.hero} />
        <Browserrange categories={data.categories} />
        <ProductGrid products={data.products} />
        <InspirationSection />
        <Gallery />
      </Layout>
      </>
  );
};

export default Home;
