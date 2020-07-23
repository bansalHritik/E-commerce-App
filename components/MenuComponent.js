import React, { Component, PureComponent } from "react";
import { View, Modal, ActivityIndicator, Image } from "react-native";
import { styles } from "../styles";
import { Text, Button, ListItem, Input, Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Loading from "./LoadingComponent";
import { connect } from "react-redux";
import { fetchProducts } from "../redux/ActionCreators/ProductActionCreator";
import { firebase } from '../constants/firebase';
import { TouchableHighlight } from "react-native";
import { removeFromWishlist, markFavorite } from "../redux/ActionCreators/WishlistActionCreator";

const mapStateToProps = (state) => {
  return {
    user:state.user,
    products: state.products,
    wishlist: state.wishList
  };
};

const mapDispatchToProps = () => (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  removeFromWishlist:(userID,product) => dispatch(removeFromWishlist(userID,product)),
  addToWishlist:(userID,product) => dispatch(markFavorite(userID,product)) 
});

class Menu extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      limit: 9,
      lastVisible: null,
      loading: false,
      refreshing: false,
    };
  }

  database = firebase.firestore();
  componentDidMount = () => {
    try {
      this.retrieveData();
    }
    catch (error) {
      console.log(error);
    }
  };
  renderProduct = (item, index) => {
    //console.log("Wishlist is here",this.props.wishlist);
    const isFavorite = this.props.wishlist.wishlist.filter((p) => p.id === item.id).length === 1;
    return (
      <TouchableHighlight key={index} 
        onPress={() => this.props.navigation.navigate('Detail', { Product: item })}
        
      >
        <View >
          <ListItem
            key={item.id}
            title={
            <Text numberOfLines = {2}>
              {item.title}
              </Text>}
            
            titleStyle={{ fontWeight: 'bold' }}
            subtitle={
              <View>
                <Text>{item.description}</Text>
                <View style={{ flexDirection: "row" ,marginVertical:5}}>
                  <Button
                    buttonStyle={{ width: 60, height: 22, backgroundColor: "green", }}
                    titleStyle={{ fontSize: 12, marginHorizontal: 2 }}
                    title="4.0"
                    icon={{
                      name: "star",
                      size: 12,
                      color: "white"
                    }}
                    iconRight
                  />
                  <Text style={{ color: "rgb(175, 175, 175)" }}> (203) </Text>
                </View>
                <Text style={{fontSize:15,fontWeight:"900"}}>{item.Price}</Text>
              </View>
            }
            
            leftElement={
              <Image
                style={{ height: 100, width: 70, resizeMode: "contain", }}
                source={{ uri: item.imageLink }}
              />
            }
            
            rightElement={
                <Icon
                  raised
                  type="font-awesome" 
                  name={isFavorite?"heart":"heart-o"}
                  containerStyle={{alignSelf:"flex-start"}}
                  onPress = {() => {
                    (isFavorite)?this.props.removeFromWishlist(this.props.user.userDetail.email,item):
                                this.props.addToWishlist(this.props.user.userDetail.email,item);
                  }}
                  color="red"
                  size={15}
                />
            }
          />
          {/* <View style={styles.featureContainer} >
            <Text style={styles.featureText}>1 </Text>
          </View> */}
        </View>
      </TouchableHighlight>
    );
  }
  retrieveData = async () => {
    try {
      this.setState({
        loading: true,
      });
      let initialQuery = await this.database.collection('Products').doc("Category").collection("Mobile")
        .where('id', '<=', 9)
        .orderBy('id')
        .limit(this.state.limit)
      let documentSnapshots = await initialQuery.get();

      let documentData = documentSnapshots.docs.map(document => document.data());
      let lastVisible = documentData[documentData.length - 1].id;
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });
    }
    catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  };
  retrieveMore = async () => {
    try {
      this.setState({
        loading: true,
        refreshing: true
      });
      let additionalQuery = await this.database.collection('Products').doc("Category").collection("Mobile")
        .where('id', '<=',50)
        .orderBy('id')
        .limit(this.state.limit)
        .startAfter(this.state.lastVisible)
      let documentSnapshots = await additionalQuery.get();
      let documentData = documentSnapshots.docs.map(document => document.data());
      if (documentData.length === 0) {
        this.setState({ loading: false })
      }
      else {
        let lastVisible = documentData[documentData.length - 1].id;
        this.setState({
          documentData: [...this.state.documentData, ...documentData],
          lastVisible: lastVisible,
          refreshing: false
        });
      }

    }
    catch (error) {
      console.log(error);
    }
  };
  handleRefresh = () => {
    this.setState({ refreshing: true })
    alert("Refershing Yaar");
    this.setState({ refreshing: false })
  }
  renderHeader = () => {
    try {
      return (
        <Text style={styles.headerText}>Items</Text>
      )
    }
    catch (error) {
      console.log(error);
    }
  };
  renderFooter = () => {
    return (this.state.loading ?
      (<View style={{ marginVertical:15, alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>) :
      (<View></View>))
  };
  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: 120 }}>
          <Button
            title="New"
            onPress={() => { this.props.navigation.navigate('New Product') }}
          />
          <Icon type="font-awesome" name="shopping-cart"
            color="#fab"
            size={24}
            onPress={() => this.props.navigation.navigate('Cart')}
          />
        </View>
      ),
    });
    if (this.state.documentData.length === 0) {
      return (
        <Loading />
      );
    }
    //leftAvatar={{ source: require("../assets/images/logo.png") }}
    else {
      return (
        <View >
          <FlatList
            data={this.state.documentData}
            renderItem={({ item, index }) => this.renderProduct(item, index)}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.retrieveMore}
            onEndReachedThreshold={0.05}
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          />
        </View>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
