import React, { Component } from 'react';
import { StyleSheet, View, Text,StatusBar } from 'react-native';

export default class Settings extends Component {

    render() {
        return (
            <View style={styles.MainContainer}>
            <StatusBar backgroundColor="#421a8d" barStyle="light-content" />
                <Text style={{ fontSize: 23 }}> Setting </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
});
