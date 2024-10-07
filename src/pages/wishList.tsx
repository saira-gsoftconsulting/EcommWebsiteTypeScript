import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/common/layout";
import ProductGrid from "../components/home/productGrid";
import FeaturesSection from "../components/common/featuressection";
import HeroBreadCrumbOne from "../components/common/heroBreadCrumbOne";
import { RootState } from "../store"; 

const Shop = () => {
  const wishlist = useSelector((state: RootState) => state.product?.wishlist || []);

  return (
    <Layout>
      <HeroBreadCrumbOne route={"wishList"} />
      <div>
        {wishlist.length === 0 ? (
          <p className="text-center text-xl font-semibold">
            Your WishList is empty
          </p>
        ) : (
          <ProductGrid products={wishlist}  />
        )}
      </div>
      <FeaturesSection />
    </Layout>
  );
};

export default Shop;
