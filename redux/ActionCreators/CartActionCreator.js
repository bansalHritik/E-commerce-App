import * as CartAction from "../Actions/CartActions";
import { firebase } from "../../constants/firebase";
import { ToastAndroid } from "react-native";

export const fetchCart = (userID) => (dispatch) => {
  dispatch(CartAction.cartLoading());
  const database = firebase.firestore();
  database
    .collection("users")
    .doc(userID)
    .get()
    .then(
      (userDetails) => {
        const cart = userDetails.data().cart;
        dispatch(CartAction.addCart(cart));
      },
      (error) => {
        var err = new Error(error);
        throw err;
      }
    )
    .catch((error) => {
      console.log("Error In fetching Cart", error);
      dispatch(CartAction.cartLoadingFailed(error));
    });
};

export const uploadToCart = (productID) => (dispatch) => {};

export const removeFromCart = (productID) => (dispatch) => {};

export const addToCart = (userID, product) => (dispatch) => {
  console.log("Product", product);
  firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      cart: firebase.firestore.FieldValue.arrayUnion({
        ...product,
        quantity: 1,
      }),
    })
    .then(
      () => {
        dispatch(CartAction.addToCart({ ...product, quantity: 1 }));
        console.log("Added To Cart");
        ToastAndroid.show("Added Sucess", ToastAndroid.SHORT);
      },
      (error) => {
        var err = new Error(error);
        throw err;
      }
    )
    .catch((error) => {
      console.log("Something Went Wrong", error);
      alert("Something Went Wrong");
    });
};
export const reduceProductQuantity = (product) => (dispatch) => {
  const currentUser = firebase.auth().currentUser.email;
  if (product.quantity === 1) {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser)
      .update({
        cart: firebase.firestore.FieldValue.arrayRemove(product),
      })
      .then(
        () => {
          dispatch(CartAction.removeFromCart(product.id));
          console.log("Product removed From cart");
          ToastAndroid.show("Removed Success", ToastAndroid.SHORT);
        },
        (error) => {
          var err = new Error(error);
          throw err;
        }
      )
      .catch((error) => {
        console.log("Error While removig the item from the cart", error);
        alert("Something Went Wrong");
      });
  } else {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser)
      .update({
        cart: firebase.firestore.FieldValue.arrayRemove(product),
      })
      .then(() => {
        return firebase
        .firestore()
        .collection("users")
        .doc(currentUser)
        .update({
          cart: firebase.firestore.FieldValue.arrayUnion({
            ...product,
            quantity: product.quantity - 1,
          })
        })
        
      })
      .then(() => {
        dispatch(CartAction.reduceQuantity(product.id));
        ToastAndroid.show("Quantity Reduced Successfully", ToastAndroid.SHORT);
      });
  }
};
export const increseProductQuantity = (product) => (dispatch) => {
  const currentUser = firebase.auth().currentUser.email;
  firebase
    .firestore()
    .collection("users")
    .doc(currentUser)
    .update({
      cart: firebase.firestore.FieldValue.arrayRemove(product),
    })
    .then(() => {
        return firebase
        .firestore()
        .collection("users")
        .doc(currentUser)
        .update({
          cart: firebase.firestore.FieldValue.arrayUnion({
            ...product,
            quantity: product.quantity + 1,
          })
        })
        
      })
      .then(() => {
        dispatch(CartAction.increaseQuantity(product.id));
        ToastAndroid.show("Quantity Increased Sucessfully", ToastAndroid.SHORT);
      });
};
