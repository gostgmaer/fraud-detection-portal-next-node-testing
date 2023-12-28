// import { combineReducers } from "redux";
// import { CartReducer } from "./Cart/Reducer";

// const rootReducer = combineReducers({
//     cart:CartReducer
// })

// export default rootReducer

import { baseurl } from "@/config/setting";
import { post } from "@/lib/network/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const response = await axios.get('https://api.example.com/products');
  return response.data;
});


export const saveCartToDb = createAsyncThunk('cart/saveCartToDb', async (cartItems) => {
  // Replace the URL and data structure with your actual API endpoint and data
  const response = await post('/cart', { cartItems });
  return response.data;
});



const initialState = {
  cartItems: [],
  wishList: [],
};




export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.product["_id"] === action.payload.product["_id"]
      );
      if (item) {
        item.quantity += action.payload.quantity;
        item["subtotal"] = item.quantity * item.product["price"];
      } else {
        state.cartItems.push({
          ["quantity"]: action.payload.quantity,
          ["subtotal"]:
            action.payload.quantity * action.payload.product["price"],
          product: action.payload.product,
        });
      }
     
    },

    updateCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.product["_id"] === action.payload["_id"]
      );
      if (item.quantity > 1) {
        item.quantity -= 1;
        item["subtotal"] = item.quantity * item.product.price;
      } else {
        state.cartItems = state.cartItems.filter(
          (data) => data.product["_id"] !== action.payload["_id"]
        );
      }
    },
    removefromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );
    },
    resetCart: (state, action) => {
      state.cartItems = [];
    },
    addToWishlist: (state, action) => {
      const item = state.wishList.find((item) => item._id === action.payload._id);
      state.wishList.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
     
      state.wishList = state.wishList.filter(
        (item) => item._id !== action.payload
      );
    },
    resetWishList: (state, action) => {
      state.wishList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCartToDb.fulfilled, (state, action) => {
      // Handle successful save to the database, if needed
      // console.log('Cart data saved to the database:', action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removefromCart,
  resetCart,
  updateCart,
  addToWishlist,
  removeFromWishlist,
  resetWishList,
} = cartSlice.actions;



export const selectCartItems = state => state.cart.items;

export const selectCartTotal = state => {
  return state.cart.items.reduce((total, item) => total + item.salePrice * item.quantity, 0);
};

export const selectCartQuantity = state => {
  return state.cart.items.reduce((quantity, item) => quantity + item.quantity, 0);
};



export default cartSlice.reducer;
