import * as ProductAction from "../Actions/ProductActions";
import * as CartAction from '../Actions/CartActions'
import { firebase } from '../../constants/firebase';
import { Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from "expo";
import * as WishlistActions from '../Actions/WishlistActions'
import { ToastAndroid } from "react-native";
export const fetchProducts = () => (dispatch) => {
    dispatch(ProductAction.productsLoading());
    return firebase.firestore().collection('Data')
        .get()
        .then((products) => {
            products.forEach((product) => {
                dispatch(ProductAction.addProduct(product.data()));
            })
        },
            error => {
                var error = new Error("Error Occured");
                throw error;
            })
        .catch((error) => {
            console.log("Product Action Creater", error)
            dispatch(CartAction.cartLoadingFailed(error))
        })
};

export const uploadNewProduct = (product) => (dispatch) => {

};

export const removeProduct = (productID) => (dispatch) => {

};

export const editProduct = (productID) => (dispatch) => {

};
export const getImageFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    let { uri } = pickerResult;
    console.log("Image Uri",uri);
    uploadToFirebase(uri);
};

export const getImageFromGallery = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    let { uri } = pickerResult;
    console.log("Image Uri",uri);
};
export const processImage = async (imageUri) => {
    let processImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [
            { resize: { width: 400 } }
        ],
        { format: 'png' }
    );
    this.setState({ imageUri: processImage.uri })
}
export const getImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }
    let pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult);
}
export const getProduct = (productID) => {
};

export const searchProduct = (name) => {

}
export const uploadToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("test/image");
    ref.put(blob)
        .then(() => { console.log("Success") })
        .catch((error) => { console.log("Not Uploaded", error) })
}
