import * as ActionType from "../ActionTypes/CartActionTypes";
export const cart = (
  state = {
    isLoading: false,
    errMess: null,
    cart: [],
  },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        cart: state.cart.concat(action.payload),
      };
    case ActionType.ADD_CART:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        cart: action.payload,
      };
    case ActionType.CART_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        cart: [],
      };
    case ActionType.CART_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        cart: [],
      };
    case ActionType.REDUCE_QUANTITY: {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload) {
          state.cart[i].quantity = state.cart[i].quantity - 1;
          break;
        }
      }
      return {
        ...state,
      };
    }
    case ActionType.INCREASE_QUANTITY: {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload) {
          state.cart[i].quantity = state.cart[i].quantity + 1;
          break;
        }
      }
      return {
        ...state,
      };
    }
    case ActionType.REMOVE_FROM_CART:
      return {
        ...state,
        cart : state.cart.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};
