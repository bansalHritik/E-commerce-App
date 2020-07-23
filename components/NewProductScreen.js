import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from "react-native-paper";
import { addProduct } from "../redux/Actions/ProductActions";
import { styles } from "../styles";
import { Button, ListItem, Input, Icon, Image } from "react-native-elements";
import { getImage, getImageFromCamera, getImageFromGallery } from "../redux/ActionCreators/ProductActionCreator";
export default class NewProductScreen extends Component {

    addProduct(product) {
        let result = this.props.uploadNewProduct(product);
        if (result === 'Success') {
            console.log("New Product Added Success");
        }
        else {
            console.log("Can't add Product", error);
        }
    }
    render() {
        let productName = "";
        const setProductName = (product) => {
            productName = product;
        }
        let category = "";
        const setCategory = (categoryA) => {
            category = categoryA;
        }
        let price = "";
        const setPrice = (priceA) => {
            price = priceA;
        }
        let description = "";
        const setDescription = (descriptionA) => {
            description = descriptionA;
        }
        let imageUri = "";
        const setImageUri = (uri) => {
            imageUri = uri;
        }

        return (
            <View>
                <TextInput
                    style={styles.formItem}
                    mode="outlined"
                    label="Product Name"
                    placeholder="Product Name"
                    onChangeText={(productName) => setProductName(productName)}
                />
                <TextInput
                    style={styles.formItem}
                    mode="outlined"
                    label="Category"
                    placeholder="Category"
                    onChangeText={(category) => setCategory(category)}
                />
                <TextInput
                    style={styles.formItem}
                    mode="outlined"
                    label="Price"
                    placeholder="Price"
                    onChangeText={(price) => setPrice(price)}
                />
                <TextInput
                    style={styles.formItem}
                    mode="outlined"
                    label="Description"
                    placeholder="Description"
                    onChangeText={(description) => setDescription(description)}
                />
                {console.log("Image Uri", imageUri)}
                <Button
                    title="New Image from gallery"
                    onPress={() => getImageFromGallery()}
                />
                <Button
                    title="New Image from Camera"
                    onPress={() => getImageFromCamera()}
                />
                <Button
                    title="Submit"
                    onPress={() => addProduct({ productName, category, price, imageUri, description })}
                />
            </View>
        )
    }
}
