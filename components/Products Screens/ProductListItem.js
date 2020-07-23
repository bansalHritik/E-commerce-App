import { View, Modal, ActivityIndicator, Image } from "react-native";
import { styles } from "../../styles";
import { Text, Button, ListItem, Input, Icon } from "react-native-elements";
import { TouchableHighlight } from "react-native";
import React from "react";
export const ProductListItem = (props) => {

    const item = props.item;
    const index = props.index;
    const navigation = props.navigation;
  return (
    <TouchableHighlight
      key={index}
      onPress={() => navigation.navigate("Menu", { screen:"Detail", params:{Product: item }})}
    >
      <View>
        <ListItem
          containerStyle={{ paddingRight: 0 }}
          title={item.title}
          titleStyle={{ fontWeight: "bold" }}
          subtitle={
            <View>
              <Text>{item.description}</Text>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  marginVertical: 5,
                }}
              >
                <Button
                  buttonStyle={{
                    width: 60,
                    height: 22,
                    backgroundColor: "green",
                  }}
                  titleStyle={{ fontSize: 12, marginHorizontal: 2 }}
                  title="4.00"
                  icon={{
                    name: "star",
                    size: 12,
                    color: "white",
                  }}
                  iconRight
                />
                <Text style={{ color: "rgb(175, 175, 175)" }}> (203) </Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.price}
              </Text>
            </View>
          }
          key={"1"}
          leftElement={
            <Image
              style={{ height: 100, width: 50, resizeMode: "stretch" }}
              source={{
                uri:
                  "https://rukminim1.flixcart.com/image/416/416/k7dnonk0/mobile/f/m/k/realme-6-pro-rbs0626in-original-imafpmfth8ymhekb.jpeg?q=70",
              }}
            />
          }
          rightContentContainerStyle={{ marginTop: 0, paddingTop: 0 }}
          rightElement={
            <View>
              <Icon
                type="font-awesome"
                name="heart"
                style={{ margin: 0 }}
                raised
                color="grey"
                size={15}
                onPress={() => navigation.navigate("Cart")}
              />
            </View>
          }
        />
        <View style={styles.featureContainer}>
          <Text style={styles.featureText}>1 </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
