import { configureStore } from '@reduxjs/toolkit';
import productReducer from './components/redux/features/productSlice';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/es/storage';
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}interface ProductState {
  cart: CartItem[];
}const persistConfig: PersistConfig<ProductState> = {
  key: 'product',
  storage,
};const persistedReducer = persistReducer(persistConfig as any, productReducer);
export const store = configureStore({
  reducer: {
    product: persistedReducer,
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
