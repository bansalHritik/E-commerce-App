import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { firebase } from "../constants/firebase";
import { mobileData } from "../shared/aa";
import { mobileImagesLinks } from "../shared/images";
import { ActionSheet } from "native-base";
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
var BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 4;
class UserProfileView extends Component {
  render() {
    const list = [
      {
        type: "entypo",
        title: "Manage Address",
        icon: "location",
      },
      {
        type: "font-awesome",
        title: "Cards and payment options",
        icon: "credit-card",
      },
      {
        title: "Settings",
        icon: "settings",
      },
      {
        title: "Past Orders",
        icon: "shopping-bag",
        type: "feather",
      },
      {
        title: "Contact Us",
        icon: "customerservice",
        type: "antdesign",
      },
    ];
    return (
      <View style={{ marginTop: 25 }}>
        <ListItem
          title={
          <Avatar size ="xlarge"
          containerStyle = {{alignSelf:"center"}}
            source = {require("../assets/images/like.png")}
            avatarStyle = {{resizeMode:"contain"}}
            showAccessory = {true}
            onAccessoryPress = {() => {
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Testing ActionSheet"
                },
                buttonIndex => {
                  this.setState({ clicked: BUTTONS[buttonIndex] });
                }
              )
            }}
          />
        }
        subtitle = {this.props.user.userDetail.email}
        subtitleStyle = {{alignSelf:"center"}}
          style={{ paddingTop: 25 }}
        />
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon, type: item.type }}
            bottomDivider
            chevron
          />
        ))}
      </View>
    );
  }
}
export default connect(mapStateToProps)(UserProfileView);
