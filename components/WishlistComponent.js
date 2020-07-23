import React, { Component } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { styles } from "../styles";
import {
  Text,
  ListItem,
  Tile,
  Avatar,
  Button,
  Icon,
} from "react-native-elements";
import Loading from "./LoadingComponent";
import { connect } from "react-redux";
import { fetchWishlist } from "../redux/ActionCreators/WishlistActionCreator";
import { firebase } from "../constants/firebase";
import {addToCart} from '../redux/ActionCreators/CartActionCreator';
import { removeFromWishlist } from "../redux/ActionCreators/WishlistActionCreator";
const mapStateToProps = (state) => {
  return {
    user: state.user,
    wishlist: state.wishList,
  };
};

const mapDispatchToProps = () => (dispatch) => ({
  fetchWishlist: (userID) => dispatch(fetchWishlist(userID)),
  addToCart: (userID, productID) => dispatch(addToCart(userID, productID)),
  removeFromWishlist:(userID,product) => dispatch(removeFromWishlist(userID,product)),
});

class Wishlist extends Component {
  componentDidMount() {}

  render() {
    if (this.props.wishlist.isLoading) {
      return (
        <View style={styles.container}>
          <Loading />
        </View>
      );
    } else if (this.props.wishlist.errMess) {
      return (
        <View style={styles.container}>
          <Text>Error</Text>
        </View>
      );
    } else {
      const RenderItem = ({ item, index }) => {
        return (
          <View
            style={{
              height: 210,
              width: "50%",
              marginRight: 5,
              marginVertical: 4,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Image
              style={{ height: 120, width: "100%", resizeMode: "contain" }}
              source={{ uri: item.imageLink }}
            />
            <Text
              style={{ textAlign: "center", marginTop: 5 }}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly",marginVertical:8 }}
            >
              <Icon
                name="delete-outline"
                type="material-community"
                containerStyle={{ marginHorizontal: 5 }}
                color="red"
                size = {22}
                onPress = {() => this.props.removeFromWishlist(this.props.user.userDetail.email,item)}
              />
              <Icon name="shopping-bag" type="feather" size ={20} onPress ={() =>{this.props.addToCart(this.props.user.userDetail.email,item)
                this.props.removeFromWishlist(this.props.user.userDetail.email,item)}}/>
            </View>
          </View>
        );
      };
      if (this.props.wishlist.wishlist.length === 0) {
        return (
          <View style={styles.container}>
            <Avatar
              source={require("../assets/images/like.png")}
              size={150}
              avatarStyle={{ resizeMode: "contain" }}
            />
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              You Haven't liked any items
            </Text>
            <Button
              title="Press to like some items"
              color="green"
              onPress={() => this.props.navigation.navigate("Menu")}
            />
          </View>
        );
      } else {
        return (
          <View style={{ marginTop: 25, flex: 1, marginHorizontal: 10 }}>
            <FlatList
              data={this.props.wishlist.wishlist}
              renderItem={RenderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
            />
          </View>
        );
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
