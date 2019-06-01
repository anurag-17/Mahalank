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
import { AsyncStorage } from 'react-native';


class CustomerProfile extends Component {

  constructor(props) {

    super(props);

    this.state = {

      user_nicename: '',
      user_email: '',

    }

    AsyncStorage.getItem('user_nicename').then(asyncStorageRes => {

      this.setState({

        user_nicename: asyncStorageRes

      });

    });

    AsyncStorage.getItem('user_email').then(asyncStorageRes => {

      this.setState({

        user_email: asyncStorageRes

      });

    });

  }


  render() {
    return (
      <View style={styles5.container}>
        <View style={styles5.header}>
          <View style={styles5.headerContent}>
            <Image style={styles5.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

            <Text style={styles5.name}>{this.state.user_nicename} </Text>
          </View>
          <Text style={styles5.name1}>Personal Information </Text>
        </View>

        <View style={styles5.body}>
          <View style={styles5.inputContainer}>

            <TextInput style={styles5.inputs}
              placeholder={this.state.user_nicename}
            
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />

          </View>

          <View style={styles5.inputContainer}>
            <TextInput style={styles5.inputs}
              placeholder={this.state.user_email}
            
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />

          </View>
          <View style={styles5.inputContainer}>
            <TextInput style={styles5.inputs}
              placeholder="Mobile No"
             
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles5.inputContainer}>
            <TextInput style={styles5.inputs}
              placeholder="Address"
            
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles5.inputContainer}>
            <TextInput style={styles5.inputs}
              placeholder="Pin Code"
             
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles5.inputContainer}>
            <TextInput style={styles5.inputs}
              placeholder="City"
              secureTextEntry={true}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <TouchableOpacity style={[styles5.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Text style={styles5.loginText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles5 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    padding:30 

  },
  header: {
    backgroundColor: "#DCDCDC",
    marginTop:20,
  },
  headerContent: {
    alignItems: 'center',
    marginTop:60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: "#000000",
    fontWeight: '600',
  },
  name1: {
    fontSize: 17,
    color: "#000000",
    fontWeight: '300',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#DCDCDC",
    height: 500,
    alignItems: 'center',

  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: 400,
    height: 45,
    marginTop: 10,
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
  inputs: {
    height: 45,
    marginLeft: 20,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 400,

    backgroundColor: 'transparent'
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


export default withNavigation(CustomerProfile);