import * as WishlistAction from '../Actions/WishlistActions';
import { firebase } from "../../constants/firebase"
import { ToastAndroid } from 'react-native';

export const fetchWishlist = (userID) => (dispatch) => {
    dispatch(WishlistAction.wishlistLoading());
    const database = firebase.firestore();
    database.collection("users")
        .doc(userID)
        .get()
        .then((userDetails) => {
            const wishlist = userDetails.data().wishlist;
            dispatch(WishlistAction.addWishlist(wishlist))
        },
            (error) => {
                var err = new Error(error);
                throw err
            }
        )
        .catch((error) => {
            console.log("Error Occured in fetching wishlist",error)
            dispatch(WishlistAction.wishlistLoadingFailed(error))
        })
};
export const uploadNewWish = (productID) => (dispatch) => {

}

export const removeFromWishlist = (userID, product) => (dispatch) => {
    firebase.firestore().collection("users").doc(userID).update({
        wishlist: firebase.firestore.FieldValue.arrayRemove(product)
    }).then(() => {
        dispatch(WishlistAction.removeFromWishlist(product))
        ToastAndroid.show("Removed from Favorite",ToastAndroid.SHORT);
    }
        , (error) => {
            console.log("Error",error)
            var err = new Error(error)
            throw err;
        })
        .catch((error) => {
            console.log("Item Is not removed form wishlist ",error)
            alert("Something Went Wrong")
        })
}
export const markFavorite = (userID, product) => (dispatch) => {
    firebase.firestore().collection("users").doc(userID).update({
        wishlist: firebase.firestore.FieldValue.arrayUnion(product)
    }).then(() => {
        dispatch(WishlistAction.addToWishlist(product))
        ToastAndroid.show("Added As Favorite",ToastAndroid.SHORT);
    }
        , (error) => {
            var err = new Error(error)
            throw err;
        })
        .catch((error) => {
            console.log("Cant add to favorite",error)
            alert("Something Went Wrong")
        })
}