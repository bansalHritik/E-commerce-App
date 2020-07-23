import React, { Component } from 'react';
import { View, StyleSheet ,TouchableOpacity} from 'react-native';
import { DrawerItem, DrawerContentScrollView, } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { LogoutUser } from "../redux/ActionCreators/UserActionCreator";
const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = (dispatch) => ({
    LogoutUser: () => dispatch(LogoutUser())
})
// {this.props.user.userDetail.email}
class DrawerContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <DrawerContentScrollView {...this.props}>
                <View style={styles.drawerContent} >
                    {/**user Info */}
                   <TouchableRipple onPress = {()=> this.props.navigation.navigate('Profile')} 
                   rippleColor = "rgb(0,122,15,.99)">
                        <View style={styles.userInfoSection}>
                        <Avatar.Image size={50} source = {require("../assets/images/logo.png")} />
                        <Title style={styles.title}>Dawid Urbaniak</Title>
                        <Caption style={styles.caption}>Hello</Caption>
                    </View>
                   </TouchableRipple>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialCommunityIcons name="face-profile" color={color} size={size} />)}
                            label="Profile"
                            onPress={() => { this.props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}
                            label="Home"
                            onPress={() => { this.props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialCommunityIcons name="menu" color={color} size={size} />)}
                            label="Menu"
                            onPress={() => { this.props.navigation.navigate('Menu') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialCommunityIcons name="wunderlist" color={color} size={size} />)}
                            label="Wishlist"
                            onPress={() => { this.props.navigation.navigate('Wishlist') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialCommunityIcons name="cart" color={color} size={size} />)}
                            label="Cart"
                            onPress={() => { this.props.navigation.navigate('Cart') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (<MaterialCommunityIcons name="logout" color={color} size={size} />)}
                            label="Logout"
                            onPress={() => { this.props.LogoutUser(); }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
{/* <View style={styles.row}>
    <View style={styles.section}>
        <Paragraph style={[styles.paragraph, styles.caption]}>
            202
                                </Paragraph>
        <Caption style={styles.caption}>Following</Caption>
    </View>
    <View style={styles.section}>
        <Paragraph style={[styles.paragraph, styles.caption]}>
            159
                                </Paragraph>
        <Caption style={styles.caption}>Followers</Caption>
    </View>
// </View> */}
// <Drawer.Section title="Preferences">
//     <TouchableRipple onPress={() => { }}>
//         <View style={styles.preference}>
//             <Text>Dark Theme</Text>
//             <View pointerEvents="none">
//                 <Switch value={false} />
//             </View>
//         </View>
//     </TouchableRipple>
//     <TouchableRipple onPress={() => { }}>
//         <View style={styles.preference}>
//             <Text>RTL</Text>
//             <View pointerEvents="none">
//                 <Switch value={false} />
//             </View>
//         </View>
//     </TouchableRipple>
// </Drawer.Section>