import * as ActionType from "../ActionTypes/WishlistActionTypes";
export const wishList = (
  state = {
    isLoading: false,
    errMess: null,
    wishlist: [],
  },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_TO_WISHLIST:
      return {
        isLoading: false,
        errMess: null,
        wishlist: state.wishlist.concat(action.payload),
      };
    case ActionType.ADD_WISHLIST:
      return {
        isLoading: false,
        errMess: null,
        wishlist: action.payload,
      };
    case ActionType.WISHLIST_LOADING:
      return {
        isLoading: true,
        errMess: null,
        wishlist: [],
      };
    case ActionType.WISHLIST_LOADING_FAILED:
      return {
        isLoading: false,
        errMess: action.payload,
        wishlist: [],
      };
      case ActionType.REMOVE_FROM_WISHLIST:
        return {
          isLoading:false,
          errMess:null,
          wishlist:state.wishlist.filter((item) => item.id !== action.payload.id)
        }
    default:
      return state;
  }
};
