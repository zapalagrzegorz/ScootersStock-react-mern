import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
  isUpdated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  isUpdated: false,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
          image: newItem.image,
          colors: newItem.colors,
          rate: newItem.rate,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Math.round((existingItem.totalPrice + newItem.price) * 100) / 100;
      }
      state.isUpdated = !state.isUpdated;
    },
    updateCart(state, action) {
      const id = action.payload.id;
      const type = action.payload.type;
      const existingItem = state.items.find((item) => item.id === id);
      switch (type) {
        case "ADDITION":
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
          break;
        case "SUBSTRACTION":
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
          if (existingItem.quantity === 0) {
            const existingItemIndex = state.items.findIndex(
              (item) => item.id === id
            );
            state.items.splice(existingItemIndex, 1);
          }
          break;
        default:
          throw new Error("błąd");
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
