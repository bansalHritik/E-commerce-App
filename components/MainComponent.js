import React, { Component } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import Home from "./HomeComponent";
import Detail from "./DetailComponent";
import Menu from "./MenuComponent";;
import SignUp from "./SignUpComponent";
import Login from "./LoginComponent";
import Cart from "./CartComponent";
import Loading from "./LoadingComponent";
import DrawerContent from "./CustomDrawer";
import UserProfileView from "./UserProfileComponent";
import Wishlist from "./WishlistComponent";
import InfiniteScroll from "./InfiniteScroll";
import NewProductScreen from "./NewProductScreen";
import { connect } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer,DefaultTheme,DarkTheme} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../styles";
import { isAlreadySignedIn } from "../redux/ActionCreators/UserActionCreator";
import { fetchWishlist } from "../redux/ActionCreators/WishlistActionCreator";

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => ({
  isAlreadySignedIn: () => dispatch(isAlreadySignedIn()),
});

class Main extends Component {
  componentDidMount() {
    this.props.isAlreadySignedIn()
  }

  render() {
    const MyTheme = {
      dark: false,
      colors: {
        primary: 'rgb(255, 45, 90)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(45, 49, 58)',
      },
    };
    if (this.props.user.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else if (this.props.user.errMess) {
      console.log("Error In Main Screen ", this.props.user.errMess)
      return (
        <View style={styles.container}>
          <Text>Error in User Login</Text>
          <Button onPress={() => this.props.isAlreadySignedIn()} title = "Retry"/>
        </View>
      );
    }
    else {
      const MaterialTopTab = createMaterialTopTabNavigator();
      const AuthenticationTopTab = () => {
        return (
          <MaterialTopTab.Navigator initialRouteName="Login">
            <MaterialTopTab.Screen name="Login" component={Login} />
            <MaterialTopTab.Screen name="SignUp" component={SignUp} />
          </MaterialTopTab.Navigator>
        );
      };
      if (!this.props.user.isLoading && this.props.user.userDetail === null) {
        return (
          <NavigationContainer>
            {AuthenticationTopTab()}
          </NavigationContainer>
        );
      }
      else {
        const Stack = createStackNavigator();
        const Drawer = createDrawerNavigator();
        const MenuStackNavigator = () => {
          return (
            <Stack.Navigator>
              <Stack.Screen name="Menu" component={Menu} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="New Product" component={NewProductScreen} />
            </Stack.Navigator>
          );
        };

        return (
          <NavigationContainer theme= {MyTheme}>
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="Login" component={AuthenticationTopTab} />
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Menu" component={MenuStackNavigator} />
              <Drawer.Screen name="Profile" component={UserProfileView} />
              <Drawer.Screen name="Wishlist" component={Wishlist} />
              <Drawer.Screen name="Cart" component={Cart} />
            </Drawer.Navigator>
          </NavigationContainer>
        );
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);