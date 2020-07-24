import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { firebase } from "../constants/firebase";
import { mobileData } from "../shared/aa";
import { mobileImagesLinks } from "../shared/images";
import { ActionSheet } from "native-base";
import { getImage, getImageFromCamera, getImageFromGallery } from "../redux/ActionCreators/ProductActionCreator";
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = () => (dispatch) => ({
  getImageFromGallery:() => dispatch(getImageFromGallery()),
  getImageFromCamera:() => dispatch(getImageFromCamera())
})
var BUTTONS = [
  { text: "Gallery", icon: "folder", iconColor: "#2c8ef4",size:"8" },
  { text: "Camera", icon: "camera", iconColor: "#f42ced" },
  { text: "Remove Profile Image", icon: "trash", iconColor: "#fa213b" },
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
            rounded = {true}
            containerStyle = {{alignSelf:"center"}}
            source = {
              (this.props.user.userDetail.photoUrl)?{uri:this.props.user.userDetail.photoUrl}:require("../assets/images/like.png")
            }
            avatarStyle = {{resizeMode:"cover"}}
            showAccessory = {true}
            accessory = {{iconName: 'edit-2', iconType: 'feather', iconColor: '#fff'}}
            onAccessoryPress = {() => {
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Choose From"
                },
                buttonIndex => {
                  this.setState({ clicked: BUTTONS[buttonIndex] });
                  switch (buttonIndex) {
                    case 0:
                      this.props.getImageFromGallery()
                      break;
                    case 1:
                      this.props.getImageFromCamera()
                      break;
                    default:
                      break;
                  }
                },
              
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
export default connect(mapStateToProps,mapDispatchToProps)(UserProfileView);
