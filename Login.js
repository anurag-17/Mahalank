import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import {LoginManager,AccessToken,GraphRequestManager,GraphRequest} from'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  _fbAuth(){
    var that=this;
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result){
    if(result.isCancelled){
     console.log("Login Cancelled");
    }
    else{
      console.log("Login AccessToken");


      AccessToken.getCurrentAccessToken().then(
      (data)=>{
      let accessToken= data.accessToken;
            const responseInfoCallback =(error,result)=>{
            setTimeout(()=>{
              if (error){
              Alert.alert('Error' + error.toString());
              }
              else{
              if(result.email == undefined){
                Alert.alert('Error',"Email Address Requied.");
              }
              else{
               Alert.alert('Success',result.email);
              }
              }
            },200);
      }



      const infoRequest = new GraphRequest(
      '/me',
      {
      accessToken:accessToken,
      parameters:{
      fields:{
      string:'email,name,first_name,middle_name,last_name'
      }
      }
      },
      responseInfoCallback
      );

      new GraphRequestManager().addRequest(infoRequest).start();
      })
    }
    },function (error){
    console.log("some error occured",error);
  })
  }

render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle= "NoActionBar" />
        <Image style={styles.bgImage} source={{ uri: "https://www.controlf5.in/website-template/mobile/Groccery/Grozny_Login.jpg" }}/>
      <View style={styles.container1}>
        <TouchableOpacity style={[styles.buttonContainer, styles.fbButoon]} onPress={this._fbAuth.bind(this)}>
        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF'}}/>
          <Text style={styles.fbText}>SING IN WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>

      </View>
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',


      },
       container1: {
          position: 'absolute',
          bottom:0,
          marginTop:20,

        },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnByRegister: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20,
    width:300,
    backgroundColor:'transparent'
  },
  fbButoon: {
    backgroundColor: "#36579b",

    shadowColor: "#36579b",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  fbText: {
    color: 'white',
    fontSize: 18,
  },
   loginButton: {
      backgroundColor: "#f4f63e",

      shadowColor: "#f4f63e",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,

      elevation: 19,
    },
    loginText: {
      color: 'black',
      fontSize: 18,
    },
   registerButton: {
   backgroundColor: 'rgba(255, 255, 255, 0)',
   borderRadius: 20,
   borderWidth: 0.5,
   borderColor: '#fff',
     shadowOffset: {
           width: 0,
           height: 9,
         },
         shadowOpacity: 0.50,
         shadowRadius: 12.35,

         elevation: 19,
    },
   registerText: {
       color: 'white',
       fontSize: 18,
    },
  bgImage:{
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
   icon:{
      width:30,
      height:30,
      marginRight:20,
    },
});