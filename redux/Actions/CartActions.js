import { ADD_CART, CART_LOADING_FAILED, CART_LOADING, REMOVE_FROM_CART, ADD_TO_CART, REDUCE_QUANTITY, INCREASE_QUANTITY } from "../ActionTypes/CartActionTypes";

export const addCart = (cart) => ({
    type: ADD_CART,
    payload: cart,
});

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});
export const cartLoadingFailed = (errMess) => ({
    type: CART_LOADING_FAILED,
    payload: errMess,
});
export const cartLoading = () => ({
    type: CART_LOADING,
});
export const removeFromCart = (productID) => ({
    type: REMOVE_FROM_CART,
    payload: productID,
});
export const reduceQuantity = (productID) => ({
    type: REDUCE_QUANTITY,
    payload:productID
})

export const increaseQuantity = (productID) => ({
    type: INCREASE_QUANTITY,
    payload:productID
})
