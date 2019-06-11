import React, { Component } from "react";
import { Text, View, StyleSheet, Switch, AppRegistry,Keyboard, TextInput, Image, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { AsyncStorage } from 'react-native';


export default class LogIn extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {

    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {

      mob_no: '',
      password: '',
      username: '',
      user_nicename: '',
      user_email: '',
      ID: '',

    }

  }

  // validation(){
  //   const {mob,pswd}= this.state;
  //   if(mob==""){
  //     alert('please fill the Email Id')
  //   }
  //   else if(pswd==""){
  //     alert('please fill the Password')
  //   }
  //   else{
  //     alert('Thank You')
  //   }

  //   Keyboard.dismiss();
  // }
  
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  __login = () => {
const {mob_no,password} = this.state;
    reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(mob_no==""){
      //alert('please fill the first name');
      this.setState({Error: 'please fill the Email ID'});
    }
    if(reg.test(mob_no) === false){
      this.setState({Error: 'Email is Not Correct'});
    }
    else if(password==""){
      this.setState({Error: 'please fill the password'});
    }
    else if(password.length <4){
      this.setState({Error: 'password  must be more than 4'});
    }
    else{
    fetch("https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/login?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        "username": this.state.mob_no,
        "password": this.state.password,

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson)

        if (responseJson.status == 'false') {

          ToastAndroid.show('Username or password is incorrect..Please try again !', ToastAndroid.SHORT);

        } else {

          this.setState({

            username: responseJson.data.user_login,
            user_nicename: responseJson.data.user_nicename,
            user_email: responseJson.data.user_email,
            ID: responseJson.data.ID,

          });

          console.log(this.state.username)
          console.log(this.state.ID, "idddddddddddddddddddddddddddddddddddddddddddddddddd11111111")

          AsyncStorage.setItem('session_is', this.state.username);
          AsyncStorage.setItem('user_nicename', this.state.user_nicename);
          AsyncStorage.setItem('user_email', this.state.user_email);
          AsyncStorage.setItem('ID', this.state.ID);

          ToastAndroid.show('You are successfully Login !', ToastAndroid.SHORT);

          this.props.navigation.navigate('SelectLanguage')

        }

      })
      .catch((error) => {
        console.error(error);
      });

  }
  }


  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Text style={{ marginTop: 20, color: 'black', fontSize: 20, textAlign: 'center', }}>
            Login with your account
     </Text>

          <View style={styles.row}>

            <View style={styles.inputWrap}>
              <Image style={styles.inputIcon} source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/flag4.jpg' }} />
            </View>

            <View style={styles.inputWrap}>

              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs} onChangeText={(mob) => this.setState({ mob_no: mob })}
                  placeholder="Email"
                  underlineColorAndroid='#778899' />
              </View>
            </View>
          </View>
          {/* <View style={{ flexDirection: 'row', flex: 1, marginTop: 20, padding: 10 }}>
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

          <View style={styles.row1}>
            <View style={styles.inputContainer1}>
              <TextInput style={styles.inputs1} secureTextEntry={true} onChangeText={(pswd) => this.setState({ password: pswd })}
                placeholder="Password"
                underlineColorAndroid='#778899' />
            </View>
          </View>
           <Text style={{color:'red', textAlign:'center'}}>
           {this.state.Error}
           </Text>

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.__login} >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.row3}>
            <View style={styles.inputWrap}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>FORGOT PASSWORD</Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{ marginTop: 30, marginLeft: 10, color: '#421a8d', fontSize: 15, textAlign: 'center' }}>DONT HAVE AN ACCOUNT?</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  row1: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
  },
  row2: {
    flex: 1,
    flexDirection: "row",
  },
  row3: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    alignItems: 'center'
  },
  inputWrap: {
    flex: 1,
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
    width: '135%',
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


  header: {
    backgroundColor: 'black',
  },


  inputContainer1: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginTop: 2,
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
    marginLeft: 25,
    marginRight: 10,
    marginTop: 20,
    width: 300,
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
  questionicon: {
    width: 18,
    height: 18,
    marginTop: 15,
    marginLeft: 20,

  },
});
