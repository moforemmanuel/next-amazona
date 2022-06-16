import { createContext, useReducer } from 'react';
// import Cookies from 'js-cookie';

export const Store = createContext();
const initialState = {
  // darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    // case 'DARK_MODE_ON':
    //   return { ...state, darkMode: true };
    // case 'DARK_MODE_OFF':
    //   return { ...state, darkMode: false };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      );

      //if item exist, replace with new item in cart, else add item
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
