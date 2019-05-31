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

      user_nicename1: '',
      user_email: '',
      ID1: '',
      mob_no: '',
      password: '',
      username: '',
      user_login: '',


      first_name: '',
      email: '',
      phone: '',
      address_1: '',
      postcode: '',
      city: '',


    }

    AsyncStorage.getItem('user_nicename').then(asyncStorageRes => {
      console.log(asyncStorageRes, "user name")
      this.setState({

        user_nicename1: asyncStorageRes

      });

    });

    AsyncStorage.getItem('user_email').then(asyncStorageRes => {
      console.log(asyncStorageRes, "Email")
      this.setState({

        user_email: asyncStorageRes

      });

    });

    AsyncStorage.getItem('ID').then(asyncStorageRes => {
      console.log(asyncStorageRes, "ID")
      this.setState({

        ID1: asyncStorageRes

      });

    });

  }



  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v3/customers/' + this.state.ID1 + '?per_page=100&page=1&consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].billing, "Response")

        this.setState({

          first_name: responseJson[0].billing.first_name,
          email: responseJson[0].billing.email,
          phone: responseJson[0].billing.phone,
          address_1: responseJson[0].billing.address_1,
          postcode: responseJson[0].billing.postcode,
          city: responseJson[0].billing.city,

        });


      })
      .catch((error) => {
        console.error(error);
      });

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

            <Text style={styles.name}>{this.state.user_nicename} </Text>
          </View>
          <Text style={styles.name1}>Personal Information </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder={this.state.first_name}
              secureTextEntry={true}
              editable={false}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />

          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={this.state.email}
              editable={false}
              secureTextEntry={true}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />

          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={this.state.phone}
              editable={false}
              secureTextEntry={true}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={this.state.address_1}
              editable={false}
              secureTextEntry={true}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={this.state.postcode}
              editable={false}
              secureTextEntry={true}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={this.state.city}
              editable={false}
              secureTextEntry={true}
              underlineColorAndroid='#778899'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Text style={styles.loginText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    padding: 30

  },
  header: {
    backgroundColor: "#DCDCDC",
    marginTop: 20,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 60,
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