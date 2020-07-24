import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Main from "./components/MainComponent";
import configureStore from './redux/configureStore';
import { Provider } from "react-redux";
import {decode, encode} from 'base-64'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

console.disableYellowBox = true;
const { persistor, store } = configureStore();
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root>
        <Main />
        </Root>
      </Provider>
    );
  }
}
export default App;