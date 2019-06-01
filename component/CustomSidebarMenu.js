//This is an example code for Navigation Drawer with Custom Side bar//
//This Example is for React Navigation 3.+//
import React, { Component } from 'react';
import { View, Alert, ScrollView, AsyncStorage, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class CustomSidebarMenu extends Component {

  constructor() {
    super();
    this.proileImage =
      'https://www.controlf5.in/website-template/Consulting/images/log.jpg';

  
  }
  setlog = () => {
    AsyncStorage.setItem('session_is', '');
    AsyncStorage.clear();
    AsyncStorage.setItem('user_email', '');
    AsyncStorage.setItem('ID', '');
    this.props.navigation.navigate('Auth');
  }
  Logout = () => {
    Alert.alert(
        '',
        'Are you want to sure logout ?',
        [
            { text: 'cancel', onPress: () => { cancelable: false }, style: 'cancel' },
            { text: 'Ok', onPress: () => this.setlog() },
        ],
        { cancelable: false }
    )

}

  renderDrawerItem = (route) => {
    const onpress = (route.key === 'Logins')
      ? () => AsyncStorage.clear().then(p => this.props.navigation.navigate(route.key))
              : (route.key === 'Logout')
                ? () => this.Logout()
                : () => {
                  this.setState({ currentpage: route.key })
                  this.props.navigation.navigate(route.key)
                  if (route.key == 'Home') {
                    this.props.navigation.closeDrawer();
                } else if (route.key == 'orders') {
                    this.props.navigation.closeDrawer();
                } else if (route.key == 'Settings') {
                    this.props.navigation.closeDrawer();
                } else if (route.key == 'help') {
                    this.props.navigation.closeDrawer();
                } else if (route.key == 'About') {
                    this.props.navigation.closeDrawer();
                } else {
                    this.props.navigation.closeDrawer();
                }
             
                }
    return (
      <TouchableOpacity onPress={onpress} style={{ flexDirection: 'row', width: '100%', height: 50, padding: 8, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
        <Image source={route.icon} style={{ height: 22, width: 22, alignItems: 'center' }}></Image>
        <Text style={{ padding: 8, marginLeft: 10, marginRight: 10, fontSize: 16 }}>{route.label}</Text>
      </TouchableOpacity>

    )
  }



  render() {
    return (
    
      <View style={styles.sideMenuContainer}>
        <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        />

        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: '#e2e2e2',
          marginTop: 15,
        }}
        />
          <View style={styles.sideMenuContainer1}>
        <ScrollView style={{ flex: 1 }} >
          {this.renderDrawerItem({icon: require('./TabModule/home.png'), label: 'Home', key: 'Home' })}
          {this.renderDrawerItem({icon: require('./TabModule/crop.png') ,label: 'Your orders', key: 'orders' })}
          {this.renderDrawerItem({icon: require('./TabModule/placeholder.png') ,label: "Settings", key: 'Settings' })}
          {this.renderDrawerItem({icon: require('./TabModule/info.png'), label: "Help", key: 'help' })}
          {this.renderDrawerItem({ icon: require('./TabModule/round.png'),label: "About us", key: 'About' })}
          {this.renderDrawerItem({ icon: require('./TabModule/logout.png'),label: 'Logout', key: 'Logout' })}

        </ScrollView>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
   // width: '80%',
   // height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuContainer1: {
    // width: '80%',
     height: '100%',
     backgroundColor: '#fff',
     //alignItems: 'center',
     paddingTop: 20,
   },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 80,
    height: 100,
    marginTop: 20,
    borderRadius: 100 / 2,
  },
});