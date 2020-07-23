import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { firebase } from '../constants/firebase';
const { height, width } = Dimensions.get('window');
export default class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
        };
    }
    database = firebase.firestore();
    componentDidMount = () => {
        try {
            this.retrieveData();
        }
        catch (error) {
            console.log(error);
        }
    };
    retrieveData = async () => {
        try {
            this.setState({
                loading: true,
            });
            console.log('Retrieving Data');
            let initialQuery = await this.database.collection('Data')
                .where('id', '<=', 20)
                .orderBy('id')
                .limit(this.state.limit)
            let documentSnapshots = await initialQuery.get();
            let documentData = documentSnapshots.docs.map(document => document.data());
            console.log("Documents Data", documentData);
            let lastVisible = documentData[documentData.length - 1].id;
            this.setState({
                documentData: documentData,
                lastVisible: lastVisible,
                loading: false,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    retrieveMore = async () => {
        try {
            this.setState({
                refreshing: true,
            });
            console.log('Retrieving additional Data');
            let additionalQuery = await this.database.collection('Data')
                .where('id', '<=', 20)
                .orderBy('id')
                .startAfter(this.state.lastVisible)
                .limit(this.state.limit)
            let documentSnapshots = await additionalQuery.get();
            let documentData = documentSnapshots.docs.map(document => document.data());
            console.log("Document Data", documentData)
            let lastVisible = documentData[documentData.length - 1].id;
            this.setState({
                documentData: [...this.state.documentData, ...documentData],
                lastVisible: lastVisible,
                refreshing: false,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    handleRefresh = () => {
        this.setState({ refreshing: true })
        alert("Refershing Yaar");
        this.setState({ refreshing: false })
    }
    renderHeader = () => {
        try {
            return (
                <Text style={styles.headerText}>Items</Text>
            )
        }
        catch (error) {
            console.log(error);
        }
    };
    renderFooter = () => {
        return (
            <View style={{ marginTop: 20, alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    };
    render() {
        return (
            <SafeAreaView >
                <View style ={styles.container}>
                    <FlatList
                        data={this.state.documentData}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text>{item.title}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => String(index)}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.retrieveMore}
                        onEndReachedThreshold={0.01}
                        
                    />
                </View>
            </SafeAreaView>
        )
    }
}
// Styles
const styles = StyleSheet.create({
    container: {
        marginTop:25
    },
    headerText: {
        fontFamily: 'System',
        fontSize: 36,
        fontWeight: '600',
        color: '#000',
        marginLeft: 12,
        marginBottom: 12,
    },
    itemContainer: {
        height: 80,
        width: width,
        borderWidth: .2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
});