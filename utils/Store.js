import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  // darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],

    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},

    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
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

      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      const rItem = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== rItem._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'USER_LOGIN': {
      const user = action.payload;
      Cookies.set('userInfo', JSON.stringify(user));
      return { ...state, userInfo: user };
    }

    case 'USER_LOGOUT': {
      // Cookies.remove('userInfo');
      // Cookies.remove('cartItems');
      Cookies.set('userInfo', null);
      Cookies.set('cartItems', JSON.stringify([]));
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      const shippingAddress = action.payload;
      Cookies.set('shippingAddress', JSON.stringify(shippingAddress));
      return { ...state, cart: { ...state.cart, shippingAddress } };
    }

    case 'SAVE_PAYMENT_METHOD': {
      const paymentMethod = action.payload;
      Cookies.set('paymentMethod', paymentMethod);
      return { ...state, cart: { ...state.cart, paymentMethod } };
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

// export async function getInitialProps(ctx) {
//   const { req } = ctx;
//   console.log(req.cookies.test);
// }
