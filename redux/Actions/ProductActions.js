import { ADD_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, PRODUCTS_LOADING, PRODUCTS_LOADING_FAILED,ADD_CATEGORIES } from "../ActionTypes/ProductActionTypes";

export const addProducts = (products) => ({
    type: ADD_PRODUCTS,
    payload: products,
});
export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});
export const deleteProduct = (product) => ({
    type: REMOVE_PRODUCT,
    payload: product,
});
export const productsLoading = () => ({
    type: PRODUCTS_LOADING,
});
export const productsLoadingFailed = (errMess) => ({
    type: PRODUCTS_LOADING_FAILED,
    payload: errMess,
});
export const addCategories = (categories) => ({
    type: ADD_CATEGORIES,
    payload: categories,
});