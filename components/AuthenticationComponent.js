import React, { Component } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import Home from "./HomeComponent";
import Detail from "./DetailComponent";
import Menu from "./MenuComponent";
import SignUp from "./SignUpComponent";
import Login from "./LoginComponent";
import { connect } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../styles";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});
class Authentication extends Component {
  render() {
    const MaterialTopTab = createMaterialTopTabNavigator();

    if (this.props.user.userDetail === null) {
        console.log("User is Null")
      return (
        <NavigationContainer>
          <MaterialTopTab.Navigator initialRouteName="Login">
            <MaterialTopTab.Screen name="Login" component={Login} />
            <MaterialTopTab.Screen name="SignUp" component={SignUp} />
          </MaterialTopTab.Navigator>
        </NavigationContainer>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
