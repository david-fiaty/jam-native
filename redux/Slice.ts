import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to store products in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // Add product to cart
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      // Find the product and update its quantity
      const { id, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },
    deleteProduct: (state, action) => {
      // Filter out the product to delete it from cart
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
