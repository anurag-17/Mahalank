import React, { Component } from 'react';

import { View, StyleSheet, Alert, Button, Dimensions, Image, TouchableOpacity, Platform, Text, ImageBackground } from 'react-native';
import { createDrawerNavigator, createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';
import StoreProfile from './TabModule/StoreProfile';
import AddToCart from './TabModule/AddToCart';
import YourOrder from './TabModule/YourOrder';
import CheckoutScreen from './TabModule/CheckoutScreen';
import Help from './TabModule/Help';
import Settings from './TabModule/Settings';
import AboutUs from './TabModule/AboutUs';
import SearchTab from './TabModule/SearchTab';

import ViewDetailItem from './TabModule/ViewDetailItem';
import CustomSidebarMenu from './CustomSidebarMenu';
import SelectCityScreen from './MainModule/SelectCityScreen';
import SelectCityAreaScreen from './MainModule/SelectCityAreaScreen';
import ChangePassword from './TabModule/ChangePassword';
import SplashScreen from './LoginModule/SplashScreen';
import LoginScreen from './LoginModule/LoginScreen';
import LogIn from './LoginModule/LogIn';
import LanguageScreen from './LoginModule/LanguageScreen';
import MainMenuScreen from './MainModule/MainMenuScreen';
import StoreDetailTab from './TabModule/StoreDetailTab';
import SignUp from './LoginModule/SignUp';
import ForgotPassword from './LoginModule/ForgotPassword';


global.currentScreenIndex = 0;

class NavigationDrawerStructure extends Component {

  toggleDrawer = () => {

    this.props.navigationProps.toggleDrawer();

  };

  render() {

    return (

      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image style={{ width: 25, height: 25, marginLeft: 10 }} source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/sdf.png' }} />
        </TouchableOpacity>
       

      </View>

    );

  }

}
const AuthStack = createStackNavigator({
      LoginHome: {
        screen: LoginScreen,
      },
      SplashView: {
              screen: SplashScreen,
            },
      SelectLanguage: {
        screen: LanguageScreen,
      },
      SelectCity: {
        screen: SelectCityScreen,
      },
      StoreDetailTab: {
        screen: StoreDetailTab,
      },
      SelectArea: {
        screen: SelectCityAreaScreen,
      },
      // MainMenuTab: {
      //   screen: MainMenuScreen,
      // },

      LogIn: {
             screen: LogIn,
      },
      SignUp: {
         screen: SignUp,
      },

      ForgotPassword: {
         screen: ForgotPassword,
      },


});

const FirstActivity_StackNavigator = createStackNavigator({

  First: {
    screen: StoreProfile,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('AddToCart')}>
          <Image style={{ width: 25, height: 25, marginRight: 10,}} source={{ uri: 'https://www.controlf5.in/website-template/mobile/icon/cart.png' }} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#421a8d',
      },
      headerTintColor: '#000000',
    }),
  },
});


const Screen2_StackNavigator = createStackNavigator({

  Second: {
    screen: YourOrder,
    navigationOptions: ({ navigation }) => ({
      title: 'Your orders',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#421a8d',
      },
      headerTintColor: '#000000',
    }),
  },
});


const Screen3_StackNavigator = createStackNavigator({

  Third: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#421a8d',
      },
      headerTintColor: '#000000',
    }),
  },
});

const Screen4_StackNavigator = createStackNavigator({

  Fourth: {
    screen: Help,
    navigationOptions: ({ navigation }) => ({
      title: 'Help',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#421a8d',
      },
      headerTintColor: '#000000',
    }),
  },
});

const Screen5_StackNavigator = createStackNavigator({

  Fifth: {
    screen: AboutUs,
    navigationOptions: ({ navigation }) => ({
      title: 'About us',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#421a8d',
      },
      headerTintColor: '#000000',
    }),
  },
});

const drawerStack = createDrawerNavigator(
  {
    Home: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    orders: {
      screen: Screen2_StackNavigator,
      navigationOptions: {
        drawerLabel: 'View cart',
      },
    },
    Settings: {
      screen: Screen3_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Settings',
      },
    },
    help: {
      screen: Screen4_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Help',
      },
    },
    About: {
      screen: Screen5_StackNavigator,
      navigationOptions: {
        drawerLabel: 'About us',
      },
    },

  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - 130,
  }
);

const PrimaryNav = createStackNavigator({
 
  drawerStack: { screen: drawerStack },
  ViewDetailItem: { screen: ViewDetailItem },
  ChangePassword: { screen: ChangePassword },
  AddToCart: { screen: AddToCart },
  Checkout: { screen: CheckoutScreen },
  SelectCity: { screen: SelectCityScreen },
  SelectArea: { screen: SelectCityAreaScreen },
  SearchTab: { screen: SearchTab },
},
  {
    headerMode: 'none',
    initialRouteName: 'drawerStack',
    contentComponent: CustomSidebarMenu,
  
    

  },

)
 const name =createSwitchNavigator(
  {
      AuthLoading: SplashScreen,
      App: PrimaryNav,
      Auth: AuthStack,
  },
  {
      initialRouteName: 'AuthLoading',
      
  }
)
export default createAppContainer(name)





