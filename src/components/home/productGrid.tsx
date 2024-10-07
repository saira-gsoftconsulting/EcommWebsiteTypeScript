import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShare, FaRegHeart, FaHeart, FaExchangeAlt } from "react-icons/fa";
import {
  addFavourite,
  removeFavourite,
  addToCart,
} from "../../components/redux/features/productSlice";
import Button from "../common/button/button";
import { RootState } from "../../store";
import { Product } from "../../utills/types/common.types";
// interface Product {
//   id: number;
//   name: string;
//   description?: string;
//   price?: number;
//   discountPrice?: number;
//   category?: string; 
//   rating?: number;
//   overlay?:string;
//   image?:string
// }
interface ProductGridProps {
  products: Product[];
}
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state: RootState) => state.product.wishlist);
  const cart = useSelector((state: RootState) => state.product.cart);
  const [visibleProducts, setVisibleProducts] = useState<number>(4);
  const handleAddToCart = (product: Product) => {
    const isInCart = cart.some((cartItem: Product) => cartItem.id === product.id);
    if (!isInCart) {
      dispatch(addToCart(product));
      toast.success("Added to Cart");
    } else {
      toast.info("Product is already in the cart");
    }
  };
  const handleShare = (productId: number) => {
    navigate(`/shop/${productId}`);
  };
  const handleCompare = () => {
    navigate("/cart");
  };
  const handleLike = (product: Product) => {
    const isLiked = wishlist.some((item: Product) => item.id === product.id);
    if (isLiked) {
      dispatch(removeFavourite({ id: product.id }));
      toast.info("Removed from Favourites");
    } else {
      dispatch(addFavourite(product));
      toast.success("Added to Favourites");
    }
  };
  const handleProductClick = (productId: number) => {
    navigate(`/shop/${productId}`);
  };
  const handleShowMore = () => {
    setVisibleProducts((prevVisible) =>
      Math.min(prevVisible + 4, products.length)
    );
  };
  return (
    <div className="container mx-auto my-12 px-4">
      <h2 className="text-center text-[#3A3A3A] text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
        Our Products
      </h2>
      <div className="grid gap-4 cursor-pointer md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, visibleProducts).map((product) => {
          const isInCart = cart.some(
            (cartItem: Product) => cartItem.id === product.id
          );
          return (
            <div
              key={product.id}
              className="relative group p-4 transition-all duration-300"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="bg-[#F4F5F7] p-3 transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold text-[#898989]">
                  {product.name}
                </h3>
                <p className="text-sm text-[#666666]">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#3A3A3A] font-semibold text-lg">
                    ${product.discountPrice}
                  </span>
                  {product.price && (
                    <span className="text-[#B0B0B0] line-through text-xs">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-black opacity-50" />
                {!isInCart && (
                  <button
                    className="bg-white text-[#B88E2F] px-8 py-3 text-md mb-4 z-10"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
                <div className="flex space-x-4 text-lg z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(product.id);
                    }}
                    aria-label="Share product"
                  >
                    <FaShare className="text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product);
                    }}
                    aria-label="Like product"
                  >
                    {wishlist.some((item: Product) => item.id === product.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompare();
                    }}
                    aria-label="Compare product"
                  >
                    <FaExchangeAlt className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center mt-8">
          <Button
            className="text-[#B88E2F] w-[245px] h-[48px] font-semibold text-xs md:text-lg border border-[#B88E2F] transition-colors duration-300 hover:bg-[#B88E2F] hover:text-white"
            label="Show More"
            onClick={handleShowMore}
          />
        </div>
      )}
    </div>
  );
};
export default ProductGrid;
