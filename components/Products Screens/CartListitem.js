import React, { Component } from "react";
import { Text, View,Image } from "react-native";
import { ListItem, Button } from "react-native-elements";
export default function CartListitem({item,index,onMinusPressed,onPlusPressed}) {
    return (
        <View style = {{marginBottom:8}}>
        <ListItem
          key={item.id}
          title={
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={{ fontSize: 16, fontWeight: "600" }}
            >
              {item.title}
            </Text>
          }
          subtitle={
            <View>
              <Text style={{ fontSize: 13, color: "#777373" }}>{item.description}</Text>
              <Text style={{ fontSize: 12, color: "#777373",marginTop:10}}>{"fgdfg"}</Text>
            </View>
          }
          rightAvatar={
            <Image
              style={{ width: 50, height: 50, resizeMode: "contain" }}
              source={{uri:item.imageLink}}
            />
          }
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 5,
            backgroundColor: "white",
          }}
        >
          <View
            style={{ flexDirection: "row", marginLeft: 10,alignContent:"flex-start" }}
          >
            <Text style={{ marginRight: 5,fontSize:16 }}>{item.Price}</Text>
            <Text style = {{color:"green",fontSize:12}}>10% Off</Text>
          </View>
          <View
            style={{ flexDirection: "row", marginRight: 10, borderWidth: 0.25,borderRadius:8,backgroundColor:"#a3b0e326" }}
          >
            <Button
              containerStyle = {{borderRadius:8}}
              type="clear"
              icon={{
                name: "minus",
                type: "font-awesome",
                size: 12,
              }}
              onPress = {() => onMinusPressed(item)}
            />
            <Text
              style={{
                paddingHorizontal: 15,
                fontSize: 15,
                alignSelf: "center",
                borderRadius: 5,
                
              }}
            >
              {item.quantity}
            </Text>
            <Button
              type="clear"
              icon={{
                name: "plus",
                type: "font-awesome",
                size: 12,
              }}
              onPress = {() => onPlusPressed(item)}
            />
          </View>
        </View>
      </View>
    )
}
