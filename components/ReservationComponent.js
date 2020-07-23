import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";
import { DISHES } from '../shared/dishes';
import { firebase } from "../constants/firebase";
class Reserve extends Component {
  render() {
    // const addData = (Item) => {
    //   firebase.firestore().collection("DISHES")
    //     .add({
    //       Item
    //     })
    //     .then(() => { console.log("Added SucessFully") })
    //     .catch(() => { console.log("Error While Adding") });
    // }
    // DISHES.forEach((item) => {
    //   addData(item);
    // })
    return (
      <View style={styles.container}>
        <Text style={styles.text}></Text>
      </View>
    );
  }
}

export default Reserve;
