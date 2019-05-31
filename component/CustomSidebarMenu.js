//This is an example code for Navigation Drawer with Custom Side bar//
//This Example is for React Navigation 3.+//
import React, { Component } from 'react';
import { View,Alert,AsyncStorage, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';



export default class CustomSidebarMenu extends Component {

  constructor() {
    super();
    this.proileImage =
      'https://www.controlf5.in/website-template/Consulting/images/log.jpg';
  
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'NavScreen1',
      },
      {
        navOptionThumb: 'crop',
        navOptionName: 'Your orders',
        screenToNavigate: 'NavScreen2',
      },
      {
        navOptionThumb: 'room',
        navOptionName: 'Settings',
        screenToNavigate: 'NavScreen3',
      },
      {
        navOptionThumb: 'help',
        navOptionName: 'Help',
        screenToNavigate: 'NavScreen4',
      },
      {
         navOptionThumb: 'error',
         navOptionName: 'About us',
         screenToNavigate: 'NavScreen5',
      },
      {
       navOptionThumb: 'error',
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
     },

    ];

  }
  setlog = () => {
    AsyncStorage.setItem('session_is', '');
    AsyncStorage.clear();
    AsyncStorage.setItem('user_email', '');
    AsyncStorage.setItem('ID', '');
    this.props.navigation.navigate('Auth');
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        />
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'blue' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                
               if(item.screenToNavigate =='Logout'){
                Alert.alert(
                  '',
                  'Are you sure you want to log out?',
                  [
                    { text: 'Cancel', onPress: () => { cancelable: false }, style: 'cancel' },
                    { text: 'OK', onPress: () => this.setlog() },
                  ],
                  { cancelable: false }
                )
               }else{
                  this.props.navigation.navigate(item.screenToNavigate);
               }
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 100 / 2,
  },
});