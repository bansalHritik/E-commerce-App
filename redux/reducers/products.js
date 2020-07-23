import * as ActionType from "../ActionTypes/ProductActionTypes";
export const products = (
  state = {
    isLoading: false,
    errMess: null,
    products: [],
    categories:[],
  },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_PRODUCT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        products: state.products.concat(action.payload),
      };
    case ActionType.ADD_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        products: action.payload,
      };
    case ActionType.PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        products: [],
      };
    case ActionType.PRODUCTS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        products: [],
      };
    case ActionType.ADD_CATEGORIES:
      return {
        ...state,
        categories:action.payload,
      }
    default:
      return state;
  }
};
