import { ADD_WISHLIST, ADD_TO_WISHLIST, WISHLIST_LOADING, REMOVE_FROM_WISHLIST, WISHLIST_LOADING_FAILED } from "../ActionTypes/WishlistActionTypes";

export const addWishlist = (wishlist) => ({
    type: ADD_WISHLIST,
    payload: wishlist,
});
export const addToWishlist = (product) => ({
    type: ADD_TO_WISHLIST,
    payload: product,
});
export const wishlistLoadingFailed = (errMess) => ({
    type: WISHLIST_LOADING_FAILED,
    payload: errMess,
});
export const wishlistLoading = () => ({
    type: WISHLIST_LOADING,
});
export const removeFromWishlist = (product) => ({
    type: REMOVE_FROM_WISHLIST,
    payload: product,
});