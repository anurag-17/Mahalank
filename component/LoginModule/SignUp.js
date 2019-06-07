import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image, Switch, AppRegistry, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { withNavigation } from 'react-navigation';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      mobile_as_username: '',
      password: '',
      pincode: '',
      state: '',
      address: '',
      city: '',
      town: '',
      showPassword: true,

    }
  }
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  responseInfoCallback = (error, result) => {

    setTimeout(() => {
      if (error) {
        Alert.alert('Error' + error.toString());
      }
      else {
        if (result.email == undefined) {

          Alert.alert('Error', "Email Address Requied.");
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())

        }
        else {
          this.props.navigation.navigate('SelectCity')
        }
      }
    }, 200);

  }

  _fbAuth() {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        console.log("Login Cancelled");
      }
      else {
        console.log("Login AccessToken");

        AccessToken.getCurrentAccessToken().then(
          (data) => {
            const infoRequest = new GraphRequest(
              '/me?fields=email,name,first_name,middle_name,last_name',
              null,
              this.responseInfoCallback
            )
            new GraphRequestManager().addRequest(infoRequest).start();
          })
      }
    }, function (error) {
      console.log("some error occured", error);
    })
  }

  __register = () => {

    fetch("https://controlf5.in/client-demo/groznysystems/wp-json/wc/v3/customers?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        "email": this.state.email,
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "password": this.state.password,
        "billing": {
          "address_1": this.state.address,
          "address_2": this.state.address_2,
          "city": this.state.city,
          "state": this.state.state,
          "postcode": this.state.postcode,
        }


      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        ToastAndroid.show('You are successfully registered !', ToastAndroid.SHORT);

        this.props.navigation.navigate('LogIn')


      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#DCDCDC' }}>
        <View style={styles.container}>

          <TouchableOpacity style={[styles.buttonContainer1, styles.fbButoon]} onPress={this._fbAuth.bind(this)}>
            <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF' }} />
            <Text style={styles.fbText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, marginLeft: 10, color: '#421a8d', fontSize: 18, textAlign: 'center', }}>
            Or Register With Email
         </Text>



          <View style={styles.containeradd}>

            <View style={styles.rowadd}>

              <View style={styles.inputWrapadd}>
                <View style={styles.inputContainer2add}>
                  <TextInput style={styles.inputs2add} onChangeText={(f_name) => this.setState({ first_name: f_name })}
                    placeholder="First Name"
                    placeholderTextColor="#a8a8a8"
                    placeholerTextSize="10" />
                </View>
              </View>

              <View style={styles.inputWrapadd}>
                <View style={styles.inputContainer2add}>
                  <TextInput style={styles.inputs2add} onChangeText={(l_name) => this.setState({ last_name: l_name })}
                    placeholder="Last Name"
                    placeholderTextColor="#a8a8a8"
                    placeholerTextSize="10"
                  />
                </View>
              </View>

            </View>

            <View style={styles.row3add}>
              <View style={styles.inputContainer3add}>
                <TextInput style={styles.inputs3add} onChangeText={(e_mail) => this.setState({ email: e_mail })}
                  placeholder="Email"
                  placeholderTextColor="#a8a8a8"
                  placeholerTextSize="10"
                />
              </View>
            </View>

            {/* <View style={{ flexDirection: 'row', flex: 1, marginTop: 20,}}>
              <TextInput style={{ height: 45, width: 330, backgroundColor: 'white' }}
                placeholderTextColor="gray"
                placeholder="Password"
                secureTextEntry={this.state.showPassword}
                underlineColorAndroid='#778899'
                onChangeText={(pswd) => this.setState({ password: pswd })}
              />
              <Switch style={{ height: 45, width: 50, backgroundColor: 'white', marginLeft: 5, justifyContent: 'flex-end' }}
                onValueChange={this.toggleSwitch}
                value={!this.state.showPassword}
              />
            </View> */}

            <View style={styles.row3add}>
              <View style={styles.inputContainer3add}>
                <TextInput style={styles.inputs3add} secureTextEntry={true} onChangeText={(pswd) => this.setState({ password: pswd })}
                  placeholder="Create Password"
                  placeholderTextColor="#a8a8a8"
                  placeholerTextSize="10" />
              </View>
            </View>

          </View>
          <View style={{ justifyContent: "flex-start", flex: 1, flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginTop: 8, color: '#4a4a4a', fontSize: 15 }}>
              MOBILE
          </Text>
          </View>

          <View style={styles.row5}>
            <View style={styles.inputWrap}>
              <Image style={styles.inputIcon} source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/flag4.jpg' }} />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Mobile Number"
                  placeholderTextColor="#a8a8a8"
                  placeholerTextSize="10" />
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "flex-start", flex: 1, flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginTop: 8, color: '#4a4a4a', fontSize: 15, }}>
              ADDRESS
          </Text>
          </View>

          <View style={styles.containeradd}>

            <View style={styles.rowadd}>

              <View style={styles.inputWrapadd}>
                <View style={styles.inputContainer2add}>
                  <TextInput style={styles.inputs2add} onChangeText={(postcode) => this.setState({ postcode: postcode })}
                    placeholder="PinCode"
                    placeholderTextColor="#a8a8a8"
                    placeholerTextSize="10" />
                </View>
              </View>

              <View style={styles.inputWrapadd}>
                <View style={styles.inputContainer2add}>
                  <TextInput style={styles.inputs2add} onChangeText={(state) => this.setState({ state: state })}
                    placeholder="State"
                    placeholderTextColor="#a8a8a8"
                    placeholerTextSize="10"
                  />
                </View>
              </View>

            </View>

            <View style={styles.row3add}>
              <View style={styles.inputContainer3add}>
                <TextInput style={styles.inputs3add} onChangeText={(address_1) => this.setState({ address_1: address_1 })}
                  placeholder="Address(Home No,Building,Streat,Area)"
                  placeholderTextColor="#a8a8a8"
                  placeholerTextSize="10"
                />
              </View>
            </View>

            <View style={styles.row3add}>
              <View style={styles.inputContainer3add}>
                <TextInput style={styles.inputs3add} onChangeText={(address_2) => this.setState({ address_2: address_2 })}
                  placeholder="Locality/Town"
                  placeholderTextColor="#a8a8a8"
                  placeholerTextSize="10" />
              </View>
            </View>
            <View style={styles.row3add}>
              <View style={styles.inputContainer3add}>
                <TextInput style={styles.inputs3add} onChangeText={(city) => this.setState({ city: city })}
                  placeholder="City/District"
                  placeholderTextColor="#a8a8a8"
                  placeholerTextSize="10" />
              </View>
            </View>


          </View>

          <View style={{ alignSelf: 'stretch', backgroundColor: 'white', marginTop: 15, alignItems: 'center', padding: 10, }}>
            <Text style={{ color: 'black', fontSize: 13, }}>
              By registering, I confirm that i have read and agree to the
 </Text>

            <Text style={{ color: '#421a8d', fontSize: 15, }}>
              TERMS & CONDITION and PRIVACY POLICY
  </Text>
          </View>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.__register}   >
            <Text style={styles.loginText}>REGISTER</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: 'white'
  },
  row5: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  row1: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  row2: {
    flex: 1,
    flexDirection: "row",
  },

  row3: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  inputContainer3: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: '100%',
    height: 45,
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
  inputs3: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },

  row4: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: 'white'
  },
  inputIcon: {
    width: 100,
    height: 50,
    marginLeft: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginLeft: -75,
    marginTop: 2,
    width: 280,
    height: 45,
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
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputContainer2: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginTop: 2,
    marginLeft: 5,
    width: '95%',
    height: 45,
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
  inputs2: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },


  header: {
    backgroundColor: 'black',
  },
  inputContainer1: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginTop: 2,
    width: 280,
    height: 45,
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
  inputs1: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '80%',
    marginTop: 20,

    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: "#421a8d",
    marginBottom: 30,

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
  questionicon: {
    width: 30,
    height: 30,
  },
  buttonContainer1: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    backgroundColor: 'transparent'
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

    elevation: 9,
  },
  fbText: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  containeradd: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 1,

  },
  rowadd: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,

  },
  row5: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  row1add: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  row2add: {
    flex: 1,
    flexDirection: "row",
  },

  row3add: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  inputContainer3add: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: '100%',
    height: 45,
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
  inputs3add: {
    height: 45,
    borderBottomColor: '#cacaca',
    flex: 1,
  },

  row4add: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  inputWrapadd: {
    flex: 1,
  },
  inputIconadd: {
    width: 100,
    height: 50,
    marginLeft: 5,
  },
  inputContaineradd: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginLeft: -75,
    marginTop: 2,
    width: 280,
    height: 45,
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
  inputsadd: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputContainer2add: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginTop: 2,
    marginLeft: 5,
    width: '95%',
    height: 45,
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
  inputs2add: {
    height: 45,
    borderBottomColor: '#cacaca',
    flex: 1,
  },


  headeradd: {
    backgroundColor: 'black',
  },
  inputContainer1add: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginTop: 2,
    width: 280,
    height: 45,
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
  inputs1add: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContaineradd: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '90%',
    marginTop: 100,

    backgroundColor: 'transparent'
  },
  loginButtonadd: {
    backgroundColor: "#421a8d",
    marginBottom: 30,

    shadowColor: "#421a8d",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 3,
  },
  loginTextadd: {
    color: 'white',
  },
  questioniconadd: {
    width: 30,
    height: 30,
  },
  buttonContainer1add: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: '80%',
    backgroundColor: 'transparent'
  },
  fbButoonadd: {
    backgroundColor: "#36579b",

    shadowColor: "#36579b",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 9,
  },
  fbText: {
    color: 'white',
    fontSize: 18,
  },
  iconadd: {
    width: 30,
    height: 30,
    marginRight: 20,
  },

});