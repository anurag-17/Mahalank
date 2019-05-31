
import React, { Component } from 'react';
import { StyleSheet, View, Text ,Image} from 'react-native';

export default class AboutUs extends Component {

  constructor(props) {

    super(props);

    this.state = {
      aboutus:'',

    }

  }

  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/aboutus')
      .then((response) => response.json())
      .then((responseJson) => {
 
        this.setState({
       
          aboutus: responseJson.aboutus,

        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    return (
      <View style={styles2.topContainer}>

          <View style={styles2.Container}>
             <Image style={styles2.image} source={{uri: 'https://www.controlf5.in/website-template/Consulting/images/log.jpg'}}/>
          </View>

          <View style={styles2.MainContainer}>
                  <Text style={{ fontSize: 16 }}> {this.state.aboutus} </Text>
          </View>
      </View>
     
    );
  }
}

const styles2 = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 20,
  },
  image: {
    width:110,
    height:110,
    marginTop:30,
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer:{
    padding:10,
    flex: 1,
  
  },


});