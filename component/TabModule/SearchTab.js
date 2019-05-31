import React, { Component } from 'react';

import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert,TouchableOpacity,Image,TouchableHighlight } from 'react-native';

export default class SearchTab extends Component {

  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,
      text: '',

    }

    this.arrayholder = [] ;
  }

  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products?search=Premium&consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
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

  GetListViewItem (name) {

   Alert.alert(name);

  }

   SearchFilterFunction(text){

     const newData = this.arrayholder.filter(function(item){
         const itemData = item.name.toUpperCase()
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

  _onPressButton() {
      console.log("On Press")
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  underlineColorAndroid='transparent'
                  placeholder="Search in Cozmo"/>
                 <Image source={require('./Search_icon.png')} style={styles.inputIcon}/>
             </View>
        <Text style={{ marginTop:10 ,marginLeft: 10, color: 'black', fontSize: 20,}}>
          popular searches
        </Text>
       <View style={{borderBottomColor: '#000',borderBottomWidth: .5,alignSelf: 'stretch',marginTop:20,}}/>

        <ListView
          dataSource={this.state.dataSource}

          renderSeparator= {this.ListViewItemSeparator}

          renderRow={(rowData) => <TouchableHighlight style = {styles.rowStyle} underlayColor = '#421a8d' onPress={() => this.props.navigation.navigate('MainMenuTab')}>
                   <Text style = {styles.rowText}>{rowData.name}</Text>
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
  margin: 10,
  flex:1,
  },
 rowViewContainer: {
   fontSize: 17,
   padding: 10,
   color:'#421a8d',
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
       width:350,
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
        backgroundColor: '#e8e8e8',
        borderBottomWidth: 1,
        height:45,
        marginBottom:20,
        borderRadius:7,
        marginTop:20,
        flexDirection: 'row',
        alignItems:'center',
        shadowColor: "#808080",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
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
        marginLeft:15,
        justifyContent: 'center',
        position: 'absolute',
        left: 5,
        },
       inputIconMap:{
        width:20,
        height:20,
        marginLeft:15,
        justifyContent: 'center',
        position: 'absolute',
        left: 5,
        },
        rowText: {
        fontSize: 17,
        padding: 10,
        color: '#421a8d'
        },
        rowStyle: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        height: 40,
        margin: 2,
        },



   row: {
       flex: 1,
       flexDirection: "row",
       marginTop:10,
       alignItems:'center',

     },
   inputWrap: {
      flex: 1,
    },
    inputIcon1:{
         width:30,
         height:30,
         marginLeft:5,
         marginBottom:17,
   },
    addCart:{
      width:25,
      height:25,
      marginLeft:15,
      justifyContent: 'center',
      position: 'absolute',
      left: 5,
   },
});




