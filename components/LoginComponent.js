import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { Input } from "react-native-elements";
import { TextInput, Button } from "react-native-paper";
import { LogoutUser } from "../redux/ActionCreators/UserActionCreator";
import { connect } from "react-redux";
import { LoginUser } from "../redux/ActionCreators/UserActionCreator";

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => ({
  LoginUser: (user) => dispatch(LoginUser(user)),
})

class Login extends Component {
  abortController = new AbortController();
  componentWillUnmount() {
    this.abortController.abort();
  }
  render() {

    let email;
    let password;
    const isSubmitted = false;

    const setEmail = (mailId) => {
      email = mailId;
    };
    const setPassword = (passwordArg) => {
      password = passwordArg;
    };
    const handleLogin = () => {
      const userDetail = {
        email,
        password,
      }
      this.props.LoginUser(userDetail);
    };

    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formItem}
          mode="outlined"
          label="Username"
          placeholder="Username"
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
        <Button mode="contained" onPress={() => handleLogin()}
          style={styles.formButton}>
          Submit
        </Button>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);