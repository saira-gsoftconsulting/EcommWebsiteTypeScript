import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/common/layout";
import Cart from "../components/product/cartComponent";
import ProductList from "../components/product/ProductList";
import productsData from "../utills/data/product";
import ProductCartDetails from "../components/product/productCartDetails";
import ProductDescription from "../components/product/ProductDescription";
import ProductNavBar from "../components/product/productNavBar";
import {
  addToCart,
  addFavourite,
  removeFavourite,
} from "../components/redux/features/productSlice";
import { RootState } from "../store";
import { Product } from "../utills/types/common.types";
function ProductDetails() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const product = productsData.find((prod) => prod.id === Number(id));
  const wishlist = useSelector((state:RootState) => state.product.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product:Product) => {
    dispatch(addToCart(product));
    setIsOpenCart(true);
    setCart([...cart, product] as any);
  };
  const handleLike = (product:Product) => {
    const isLiked = wishlist.some((item) => item.id === product.id);
    if (isLiked) {
      dispatch(removeFavourite(product));
    } else {
      dispatch(addFavourite(product));
    }
  };
  const handleShare = (product:Product) => {
    console.log("Shared product:", product);
  };
  const handleCompare = () => {
    navigate("/cart");
  };
  return (
    <div>
      <Layout>
        <ProductNavBar />
        <ProductCartDetails
          product={product}
          addToCart={handleAddToCart}
          handleLike={handleLike}
          handleShare={handleShare}
          handleCompare={handleCompare}
          setIsOpenCart={setIsOpenCart}
        />
        {isOpenCart && (
          <Cart
            cartItems={cart}
            setCartItems={setCart}
            setIsOpenCart={setIsOpenCart}
          />
        )}
        <ProductDescription />
        <ProductList
          //  handleAddToCart={handleAddToCart}
          // handleLike={handleLike}
          //  handleShare={handleShare}
          //  handleCompare={handleCompare}
        />
      </Layout>
    </div>
  );
}
export default ProductDetails;
