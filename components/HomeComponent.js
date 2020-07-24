import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
  Image,
  ImageBackground
} from "react-native";
import { styles } from "../styles";
import {
  Input,
  ListItem,
  Button,
  Icon,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { DISHES } from "../shared/dishes";
import { Appbar, Searchbar } from "react-native-paper";
import { fetchWishlist } from "../redux/ActionCreators/WishlistActionCreator";
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = () => (dispatch) => ({
  fetchWishlist: (userID) => dispatch(fetchWishlist(userID)),
});

class Home extends Component {
  componentDidMount() {
    this.props.fetchWishlist(this.props.user.userDetail.email);
  }
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;
    if (!this.props.user.userDetail) {
      return (
        <View style={styles.container}>
          <Text>User Detail is Null</Text>
        </View>
      );
    } else {
      const list = [
        {
          id: 1,
          type: "simple-line-icon",
          icon: "screen-smartphone",
          title: "Smartphone",
        },
        {
          id: 2,
          type: "font-awesome",
          title: "Laptop",
          icon: "laptop",
        },
        {
          id: 3,
          title: "Fashon",
          type: "material-community",
          icon: "tshirt-crew-outline",
        },
        {
          id: 4,
          title: "Stationary",
          type: "simple-line-icon",
          icon: "notebook",
        },
        {
          id: 5,
          title: "Kitchen",
          type: "font-awesome-5",
          icon: "utensils",
        },
        {
          id: 6,
          title: "Shoes",
          type: "material-community",
          icon: "shoe-formal",
        },
      ];
      const RenderCategoryListItem = ({ item, index }) => {
        return (
          <View key={index} style={{ padding: 10 }}>
            <Icon size={30} name={item.icon} type={item.type} />
            <Text>{item.title}</Text>
          </View>
        );
      };

      return (
        <View>
          <Appbar.Header>
            <Appbar.Action
              icon="menu"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
            <Appbar.Content title="Home" />
          </Appbar.Header>
          <View>
            <FlatList
              data={list}
              renderItem={RenderCategoryListItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Searchbar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              lightTheme = {true}              
            />
          </View>
        </View>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
