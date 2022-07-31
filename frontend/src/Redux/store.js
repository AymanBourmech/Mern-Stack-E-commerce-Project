import { configureStore } from "@reduxjs/toolkit";
import categorieReducer from "../Features/categorieSlice";
import scategorieReducer from "../Features/scategorieSlice";
import articleReducer from "../Features/articleSlice";
import authReducer from "../Features/AuthSlice";
import cartReducer from "../Features/cartSlice";
import orderReducer from "../Features/orderSlice";

const store = configureStore({
  reducer: {
    categories: categorieReducer,
    scategories: scategorieReducer,
    articles: articleReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
