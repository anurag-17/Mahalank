import React, { Component } from 'react';

import { Text, StyleSheet, View, ListView, TextInput,AsyncStorage, ActivityIndicator, Alert,TouchableOpacity ,TouchableHighlight} from 'react-native';

export default class SelectCityAreaScreen extends Component {
  static navigationOptions = {
    header: null
};
  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,
      selected_city:'',
      city_zipcode:'',
      city_area:'',
    }

    this.arrayholder = [] ;

    selected_city = this.props.navigation.state.params.Selected_city ;
    AsyncStorage.setItem('selected_city', selected_city);

//pls dont delete it
//      {this.props.navigation.state.params.Selected_city
//                           ? this.props.navigation.state.params.Selected_city
//                           : 'No Value Passed'}

  }

  componentDidMount() {
      fetch("https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/area/", {
          method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
               "city": selected_city
             })
      })
      .then((response) => response.json())
                  .then((responseJson) => {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                      isLoading: false,

                      dataSource: ds.cloneWithRows(responseJson),

                    }, function() {

                      this.arrayholder = responseJson ;

                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
  }

   SearchFilterFunction(text){

     const newData = this.arrayholder.filter(function(item){
         const itemData = item.area.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>
       <Text style={{ marginTop:10 ,marginLeft: 10, color: 'black', fontSize: 30,textAlign: 'center', fontWeight: 'bold',}}>
           Select Your Area
       </Text>
      <TextInput
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />

        <ListView

          dataSource={this.state.dataSource}

          renderSeparator= {this.ListViewItemSeparator}

          renderRow={(rowData) => <TouchableHighlight style = {styles.rowStyle} underlayColor = '#421a8d'
                                   onPress={() => this.props.navigation.navigate('StoreDetailTab', {  Selected_city: selected_city,
                                                                                                      city_area : rowData.area,
                                                                                                      city_zipcode : rowData.zipcode,

                                                                                                   } )  }>
                                                              <Text style = {styles.rowText}>{rowData.area}</Text>
                                   </TouchableHighlight>
                    }

          enableEmptySections={true}

          style={{marginTop: 10}}

        />

        </View>
//      </View>
    );
  }
}

const styles = StyleSheet.create({
 MainContainer :{
  justifyContent: 'center',
  flex:1,
  margin: 20,
  },
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },
  TextInputStyleClass:{
   textAlign: 'center',
   height: 40,
   marginTop:10,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
   },
     buttonContainer: {
       height:45,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom:10,
       width:280,
       borderRadius:30,
       backgroundColor:'transparent',
       position: 'absolute',
                 bottom:0,
                 marginTop:20,
                 alignItems:'center',
     },
      loginButton: {
           backgroundColor: "#421a8d",
           marginLeft:30,
           shadowColor: "#421a8d",
           shadowOffset: {
             width: 0,
             height: 9,
           },
           shadowOpacity: 0.50,
           shadowRadius: 12.35,

           elevation: 19,
         },
         loginText: {
           color: 'white',
           fontSize: 18,
         },
      rowText: {
             fontSize: 17,
             padding: 10,
             color: 'black'
         },
         rowStyle: {
             backgroundColor: '#FFFFFF',
             flex: 1,
             height: 40,
             margin: 2,
         },
});