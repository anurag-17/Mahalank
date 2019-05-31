import React, { Component } from "react";
import { Platform,AsyncStorage,StyleSheet, View, Button, Picker, Alert, Text } from "react-native";

export default class LanguageScreen extends Component {
  static navigationOptions = {
    header: null
};
  constructor() {
    super();
    this.state = {
      PickerSelectedVal: ''
    }
  }

  //  getSelectedPickerValue=()=>{
  //     Alert.alert("Selected country is : " +this.state.PickerSelectedVal);
  //   }
 
  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.PickerSelectedVal}
          onValueChange={(itemValue, itemIndex) => this.setState({ PickerSelectedVal: itemValue })} >

          <Picker.Item label="English" value="English" />
          <Picker.Item label="Arabic" value="Arabic" />


        </Picker>

        <Button color="#421a8d" title="Select Your Language" onPress={() => this.props.navigation.navigate('SelectCity')} />
  

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 30
  },
  color: {
    backgroundColor: "#421a8d"
  }
});