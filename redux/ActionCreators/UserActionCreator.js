import * as UserAction from "../Actions/UserActions";
import { firebase } from "../../constants/firebase";
import { ToastAndroid } from "react-native";

export const isAlreadySignedIn = () => (dispatch) => {
  dispatch(UserAction.Loading());
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(UserAction.Login(user));
    } else {
      console.log("No Exited or logged out");
    }
  });
};

export const SignupUser = (user) => (dispatch) => {
  return firebase.firestore().collection("users").doc(user.email).set({
    userName: null,
    wishlist: [],
    cart: [],
    pastOrders: [],
    profilePic: null,
    address: [],
    mobileNumber: null,
    FullName: null,
    isPremium: false,
  }).then(
      (doc) => {
          return doc;
      },
      (error) => {
          var err = new Error(error);
          throw err;
      })
      .then((doc) => {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      },
      error => {
          var err = new Error(err);
          throw err;
      })
      .then((user) => {
          console.log("User Successfully Registered",user.user.uid)
      })
      .catch((error) => {
          console.log("Error Occured in User Creation ",error)
          dispatch(UserAction.SignUpFailed(error))
      })
};

export const LoginUser = (user) => (dispatch) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((response) => {
      if (response) {
        console.log("Sucessfully Logged in")
      }
    });
};

export const LogoutUser = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(UserAction.Logout());
      console.log("LogOut Success");
    })
    .catch((error) => {
      console.log("Sign Out Failed" + error);
      alert("Sign Out Failed");
    });
};
