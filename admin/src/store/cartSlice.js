import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    lastid:0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push({...action.payload,iid:state.lastid});
      state.total += action.payload.price;
      state.lastid += 1;
    },
    changeQuantity: (state, action) => {
        var p = state.products.find(product => product.iid === action.payload.id);
        if(p.quantity<=1 && action.payload.qte === -1){
            return
        }
        p.quantity += action.payload.qte;
        state.total += action.payload.qte * p.price;
    },
    removeProduct: (state, action) => {
        var p = state.products.find(product => product.iid === action.payload.id);
        state.total -= p.price * p.quantity;
        state.products = state.products.filter(product => product.iid !== action.payload.id);
        state.quantity -= 1;
    },
  },
});

export const { addProduct,changeQuantity,removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
