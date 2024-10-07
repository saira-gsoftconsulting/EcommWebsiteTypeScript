import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  description?: string ;
  price?: number;
  discountPrice?: number;
  image?: string;
  discount?: string;
  overlay?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductState {
  products: Product[];
  wishlist: Product[];
  search: Product[];
  cart: CartItem[];
}

const initialState: ProductState = {
  products: [],
  wishlist: [],
  search: [],
  cart: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!state.wishlist.some((product) => product.id === action.payload.id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload
      );
    },
    addFavourite: (state, action) => {
      if (!state.wishlist.some((product) => product.id === action.payload.id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      state.search = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setProducts,
  addToWishlist,
  removeFromWishlist,
  addFavourite,
  removeFavourite,
  incrementQuantity,
  decrementQuantity,
  addToCart,
  removeFromCart,
  clearCart,
  searchProduct,
} = productSlice.actions;

export default productSlice.reducer;
