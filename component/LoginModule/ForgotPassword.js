import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput,Image,TouchableOpacity,ScrollView} from "react-native";

export default class ForgotPassword extends Component {
  render() {
    return (
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={styles.container}>

    <Text style={{ marginTop:20 ,marginLeft: 10, color: 'black', fontSize: 15,textAlign: 'center',}}>
           Don't worry we will send you a new pin to your register mobile number
     </Text>

      <View style={styles.row}>

        <View style={styles.inputWrap}>
        <Image style={styles.inputIcon} source={{uri:'https://www.controlf5.in/website-template/Consulting/images/flag3.jpg'}}/>
        </View>

      <View style={styles.inputWrap}>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Mobile Number"
              underlineColorAndroid='#778899'/>
        </View>

       </View>


     </View>


 <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} >
     <Text style={styles.loginText}>SEND OTP</Text>
 </TouchableOpacity>

  </View>
</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
container:{
 backgroundColor:'white',
 justifyContent: 'center',
 alignItems: 'center',
 flex:1,
 },
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop:20,
  },
  row1: {
      flex: 1,
      flexDirection: "row",
      marginTop:50,
      padding:5,
    },
     row2: {
        flex: 1,
        flexDirection: "row",
      },
  inputWrap: {
    flex: 1,
  },
   inputIcon:{
      width:100,
      height:50,
      marginLeft:5,
    },
  inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginLeft:-70,
        marginTop:2,
        width:280,
        height:45,
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
        borderBottomColor: '#FFFFFF',
        flex:1,
      },


      header:{
          backgroundColor: 'black',
        },


      inputContainer1: {
             borderBottomColor: '#F5FCFF',
             backgroundColor: '#FFFFFF',
             borderBottomWidth: 1,
             marginTop:2,
             width:280,
             height:45,
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
           inputs1:{
             height:45,
             borderBottomColor: '#FFFFFF',
             flex:1,
           },

     buttonContainer: {
            height:45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:30,
            marginLeft:23,
            width:300,

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
               questionicon:{
                  width:30,
                  height:30,
                },
});