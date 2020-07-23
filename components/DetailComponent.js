import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Loading from "./LoadingComponent";
import { Icon, Image, Card, Tile } from "react-native-elements";
import { Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import InfiniteScroll from "./InfiniteScroll";
import {
  markFavorite,
} from "../redux/ActionCreators/WishlistActionCreator";
import {addToCart} from '../redux/ActionCreators/CartActionCreator';
import { connect } from "react-redux";
import { Button } from "native-base";
import { removeFromWishlist } from "../redux/ActionCreators/WishlistActionCreator";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    wishlist:state.wishList,
    cart:state.cart,
  };
};

const mapDispatchToProps = () => (dispatch) => ({
  markFavorite: (userID, productID) => dispatch(markFavorite(userID, productID)),
  addToCart: (userID, productID) => dispatch(addToCart(userID, productID)),
  removeFromWishlist:(userID,product) => dispatch(removeFromWishlist(userID,product)),
  addToWishlist:(userID,product) => dispatch(markFavorite(userID,product))
});
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  render() {
    const Product = this.props.route.params.Product;
    this.props.navigation.setOptions({
      title: Product.title,
    });
    const isFavorite = this.props.wishlist.wishlist.filter((p) => p.id === Product.id).length === 1;
    const isInCart = this.props.cart.cart.filter((p) => p.id === Product.id).length === 1;
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <ScrollView nestedScrollEnabled>
          <View>
            <Tile
              imageSrc={require("../assets/images/logo.png")}
              featured
              imageProps={{ resizeMode: "contain" }}
              captionStyle={{
                color: "black",
                fontWeight: "bold",
                fontSize: 30,
              }}
              caption={Product.title}
            />
            <Text>{Product.title}</Text>
            <Text>{Product.description}</Text>
            <Text>{Product.price}</Text>
            <Text>{Product.title}</Text>
            <Text>{Product.description}</Text>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "baseline",
            width: "100%",
            alignItems: "stretch",
          }}
        >
          <Button
            style = {{width:"50%",justifyContent:"center",backgroundColor:"white"}}
            onPress = {() => {
              (isFavorite)?this.props.removeFromWishlist(this.props.user.userDetail.email,Product):
                          this.props.addToWishlist(this.props.user.userDetail.email,Product);
              
            }}
          >
            <Text style = {{fontSize:15}}>{isFavorite?"Remove From Favorite":"Add To Favorite"}</Text>
          </Button>
          <Button
            disabled = {isInCart}
            style = {{width:"50%",backgroundColor:"#f96106",justifyContent:"center"}}
            onPress={() =>
              this.props.addToCart(this.props.user.userDetail.email, Product)
            }
          >
            <Text style = {{color:"white",fontSize:15}}>{isInCart?"Already In Cart":"Add To Cart"}</Text>
          </Button>
          
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {},
  commentButton: {},
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
