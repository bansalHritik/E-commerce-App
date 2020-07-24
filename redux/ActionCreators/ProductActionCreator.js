import * as ProductAction from "../Actions/ProductActions";
import * as CartAction from "../Actions/CartActions";
import { firebase } from "../../constants/firebase";
import { Permissions } from "expo";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator } from "expo";
import * as WishlistActions from "../Actions/WishlistActions";
import { ToastAndroid } from "react-native";
import * as UserActions from "../Actions/UserActions";
export const fetchProducts = () => (dispatch) => {
  dispatch(ProductAction.productsLoading());
  return firebase
    .firestore()
    .collection("Data")
    .get()
    .then(
      (products) => {
        products.forEach((product) => {
          dispatch(ProductAction.addProduct(product.data()));
        });
      },
      (error) => {
        var error = new Error("Error Occured");
        throw error;
      }
    )
    .catch((error) => {
      console.log("Product Action Creater", error);
      dispatch(CartAction.cartLoadingFailed(error));
    });
};

export const uploadNewProduct = (product) => (dispatch) => {};

export const removeProduct = (productID) => (dispatch) => {};

export const editProduct = (productID) => (dispatch) => {};

export const getImageFromCamera =  () => async (dispatch)=> {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }
  console.log("I have Got dispatch",dispatch)
  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing:true,
    aspect:[4,3]
  });
  let { uri } = pickerResult;
  console.log("Image Uri", uri);
  uploadImageToFirebase(uri,dispatch);
};

export const getImageFromGallery =  () => async(dispatch) => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }
  console.log("I have Got dispatch",dispatch)
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing:true,
    aspect:[4,3]
  });
  let { uri } = pickerResult;
  console.log("Image Uri", uri);
  uri = await processImage(uri);
  uploadImageToFirebase(uri,dispatch);
};
export const processImage = async (imageUri) => {
  let processImage = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 400 } }],
    { format: "png" }
  );
  return processImage;
};
export const getImage = async () => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }
  let pickerResult = await ImagePicker.launchCameraAsync();
  console.log(pickerResult);
};
export const getProduct = (productID) => {};

export const searchProduct = (name) => {};

export const uploadImageToFirebase = async (uri,dispatch) => {
  console.log("I have Got UploadImgeToFirebase",dispatch)

  const currentUser = firebase.auth().currentUser.email;
  let imageUrl = null;
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child(`userProfileImages/${currentUser}`);
  ref
    .put(blob)
    .then((u) => {
      return firebase
        .storage()
        .ref(`userProfileImages/${currentUser}`)
        .getDownloadURL().
        then((url) => {
          imageUrl = url;
          console.log("Here is Image Link",imageUrl)
        });
    })
    .then(() => {
        firebase.auth().currentUser.updateProfile({
          photoURL:imageUrl
        })
    })
    .then(()=> {
      console.log("updated inside database")
      dispatch(UserActions.updateProfileImageUri(imageUrl));
    })
    .catch((error) => {
      console.log("Not Uploaded", error);
    });
};

export const changeProfileImage = (url) => {
    
};
