import React from 'react'
import { View, Text, Button } from 'react-native'
import { Card } from 'react-native-elements'

export default function EmptyCart() {
    return (
        <View style = {{marginTop:25,justifyContent:"center",flex:1}}>
        <Card
          image={require("../assets/images/cart.png")}
          imageStyle={{ resizeMode: "contain" }}
          featuredTitle="Empty Cart"
        >
          <Button
            title="Add Some Product"
            onPress={() => this.props.navigation.navigate("Menu")}
          />
        </Card>
      </View>
    )
}
