import React from 'react';
import { View, Text,ToastAndroid ,Alert,Image} from 'react-native';
import {AsyncStorage} from 'react-native';

class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null
};

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {

    const data = await this.performTimeConsumingTask();

    if (data !== null) {

       AsyncStorage.getItem('session_is').then(asyncStorageRes => {

               console.log(asyncStorageRes)
             try {

                    if (asyncStorageRes == null) {

                      this.props.navigation.navigate('LoginHome');

                    }else{

                         this.props.navigation.navigate('SelectLanguage');

                    }

               } catch (error) {
                            // Error retrieving data
               }
         });


  }

  }


  render() {
    return (
      <View style={styles.viewStyles}>
         <Image style={styles.image} source={{uri: 'https://www.controlf5.in/website-template/Consulting/images/log.jpg'}}/>
      </View>
    );
  }


}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'

  },
  image: {
    width:110,
    height:110,
    marginTop:30,
    borderRadius: 100 / 4,
  },
 
}

export default SplashScreen ;