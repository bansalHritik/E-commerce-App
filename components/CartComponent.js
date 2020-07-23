import React, { Component } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Card, ListItem, Tile } from "react-native-elements";
import { connect } from "react-redux";
import { fetchCart, reduceProductQuantity ,increseProductQuantity} from "../redux/ActionCreators/CartActionCreator";
import { mockData } from "../shared/mockdata";
import { styles } from "../styles";
import Loading from "./LoadingComponent";
import CartListitem from "./Products Screens/CartListitem";
import { Button } from "native-base";
import EmptyCart from "./EmptyCart";
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};
const mapDispatchToProps = () => (dispatch) => ({
  fetchCart: (userID) => dispatch(fetchCart(userID)),
  reduceQuantity:(productID) => dispatch(reduceProductQuantity(productID)),
  increaseQuantity:(productID) => dispatch(increseProductQuantity(productID))
});
class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.user.userDetail.email);
  }
  render() {
    if (this.props.cart.isLoading) {
      return (
        <View style={styles.container}>
          <Loading />
        </View>
      );
    } else if (this.props.cart.errMess) {
      console.log(this.props.cart.errMess);
      return (
        <View style={styles.container}>
          <Text>Error</Text>
        </View>
      );
    } else {
      const RenderItem = ({ item, index }) => {
        return (
          <CartListitem
            item={item}
            index={index}
            navigation={this.props.navigation}
            onMinusPressed = {this.props.reduceQuantity}
            onPlusPressed = {this.props.increaseQuantity}
          />
        );
      };
      if (this.props.cart.cart.length === 0) {
        return (
          <EmptyCart />
        );
      } else {
          var total = 0;
          this.props.cart.cart.map((a) => {
              //total += ((+(a.Price.replaceAll(',',''))) * (+a.quantity));
              return a;
          });
          total = total.toFixed(2)
        return (
          <View style={{ marginTop: 25 }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <ScrollView nestedScrollEnabled>
                <FlatList
                  data={this.props.cart.cart}
                  renderItem={RenderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "baseline",
                  width: "100%",
                }}
              >
                <View style = {{
                    paddingTop:6,
                    width: "50%",
                    backgroundColor:"white",
                    elevation:50,
                    shadowColor:"black",
                    shadowOffset:{height:2}
                  }}>
                    <Text style = {{paddingLeft:25,fontSize:16,fontWeight:"bold"}} >$ {total}</Text>
                    <Text style = {{paddingLeft:25,fontSize:10,color:"blue"}} >View price detail</Text>
                </View>
                <Button
                  style={{
                    width: "50%",
                    backgroundColor: "#f96106",
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    this.props.addToCart(
                      this.props.user.userDetail.email,
                      Product
                    )
                  }
                >
                  <Text style={{ color: "white", fontSize: 15 }}>
                    Proceed To Checkout
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
