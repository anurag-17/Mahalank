import React, { Component } from 'react';

import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert,TouchableOpacity,Image,CheckBox,TouchableHighlight,StatusBar } from 'react-native';

export default class SelectCityScreen extends Component {
  static navigationOptions = {
    header: null
};

  constructor(props) {

    super(props);

    this.state = {
      Selected_city:'',
      isLoading: true,
      text: '',

    }

    this.arrayholder = [] ;
  }

  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/city')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {

          // In this block you can do something with new state.
          this.arrayholder = responseJson ;

        });
      })
      .catch((error) => {
        console.error(error);
      });

  }
  ChangeGridValueFunction =()=> {

          if(this.state.GridColumnsValue === true)

          {
              this.setState({

                  GridColumnsValue: false,
                  ButtonDefaultText : "#FFFFFF"

              })
          }
          else{

              this.setState({

                  GridColumnsValue: true,
                  backgroundColor : "#F5FCFF"

              })

          }

   }


   SearchFilterFunction(text){

     const newData = this.arrayholder.filter(function(item){
         const itemData = item.city.toUpperCase()
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
      <StatusBar 
           backgroundColor = "#421a8d"
           barStyle= "light-content"/>
       <Text style={{ marginTop:10 ,marginLeft: 10, color: 'black', fontSize: 30,textAlign: 'center',fontWeight: 'bold',}}>
           Select City
       </Text>
       <Text style={{ marginBottom:10,marginTop:20, color: '#421a8d', fontSize: 20,textAlign: 'center',height:30,}}>
            Where do you want to shop today
       </Text>

        <ListView
          dataSource={this.state.dataSource}

          renderSeparator= {this.ListViewItemSeparator}

         renderRow={(rowData) => <TouchableHighlight style = {styles.rowStyle} underlayColor = '#421a8d' onPress={() => this.props.navigation.navigate('SelectArea', {
                                                                                                                                                           Selected_city: rowData.city,
                                                                                                                                                                         })  }>
              <Text style = {styles.rowText}>{rowData.city}</Text>
           </TouchableHighlight>
         }

          enableEmptySections={true}

          style={{marginTop: 10}}
        />


        </View>

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
   padding: 10,

  },
  ItemTextStyle:{
  backgroundColor:'black',
  },
  TextInputStyleClass:{
   textAlign: 'center',
   height: 40,
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
       width:300,
       marginLeft:10,
       borderRadius:30,
       backgroundColor:'transparent',
       position: 'absolute',
                 bottom:0,
                 marginTop:20,
                 alignItems:'center',
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

           elevation: 19,
         },
         loginText: {
           color: 'white',
           fontSize: 18,
         },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:7,
        borderBottomWidth: 1,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:20,
        shadowColor: "#808080",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
        inputs:{
        textAlign: 'center',
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        },
        inputIcon:{
        width:15,
        height:15,
        marginRight:15,
        justifyContent: 'center',
        position: 'absolute',
        right: 5,
        },
       inputIconMap:{
        width:15,
        height:15,
        marginLeft:15,
        justifyContent: 'center',
        position: 'absolute',
        left: 5,
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
