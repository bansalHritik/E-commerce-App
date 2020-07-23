import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

class Favorite extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Favorite Screen</Text>
      </View>
    );
  }
}

export default Favorite;
