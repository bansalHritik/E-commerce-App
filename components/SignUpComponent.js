import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { styles } from "../styles";
import { Input } from "react-native-elements";
import { TextInput, Button } from "react-native-paper";
import { firebase } from '../constants/firebase';
import { SignupUser } from "../redux/ActionCreators/UserActionCreator";
import { connect } from "react-redux";

const mapDispatchToProps = () => (dispatch) => ({
  SignupUser: (user) => dispatch(SignupUser(user))
})

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
class SignUp extends Component {
  render() {

    let email;
    let password;

    const setEmail = (mailID) => {
      email = mailID;
    };

    const setPassword = (passwordArg) => {
      password = passwordArg;
    };

    const handleSignUp = () => {
      const userDetail = {
        email,
        password
      }
      this.props.SignupUser(userDetail);
    }
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formItem}
          mode="outlined"
          label="Email"
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.formItem}
          mode="outlined"
          label="Password"
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Button mode="contained" style={styles.formButton}
          onPress={() => handleSignUp()}>
          Register Me
        </Button>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
