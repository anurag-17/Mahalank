import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class ChangePassword extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>


                <Text style={styles.name}>Create New Password </Text>
            </View>
            <Text style={styles.name1}>+962776674183 </Text>
          </View>

          <View style={styles.body}>
            <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        underlineColorAndroid='#778899'
                        onChangeText={(password) => this.setState({password})}/>
                    <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
          </View>
                 <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('LoginHome')}>
                    <Text style={styles.loginText}>Update Password</Text>
                 </TouchableOpacity>
         </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:20,
    color:"#000000",
    fontWeight:'400',
  },
   name1:{
      fontSize:15,
      color:"#000000",
      fontWeight:'300',
      marginLeft:10,
    },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#DCDCDC",
    height:500,
    alignItems:'center',

  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      width:400,
      height:45,
      marginTop:10,
      flexDirection: 'row',

      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.10,
      shadowRadius: 1.15,

      elevation: 1,
    },
    inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
    },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width:400,

        backgroundColor:'transparent'
      },
      loginButton: {
          backgroundColor: "#421a8d",

          shadowColor: "#421a8d",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.50,
          shadowRadius: 12.35,

          elevation: 3,
        },
        loginText: {
            color: 'white',
          },
});

export default withNavigation(ChangePassword);