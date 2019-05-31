import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class BrowseTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Pizza",  count:4, image:"https://www.controlf5.in/website-template/Consulting/images/img5.jpg"},
        {id:2, title: "Bread",  count:4, image:"https://www.controlf5.in/website-template/Consulting/images/img6.jpg"} ,
        {id:3, title: "Fruits",  count:4, image:"https://www.controlf5.in/website-template/Consulting/images/img7.jpg"},
        {id:4, title: "Juice",  count:4, image:"https://www.controlf5.in/website-template/Consulting/images/img8.jpg"},
        {id:5, title: "Ka'ek & Grissini",  count:4, image:"https://www.controlf5.in/website-template/Consulting/images/img9.jpg"},
        {id:6, title: "Bread",  count:4, image:"https://www.controlf5.in/website-template/Consulting/images/img5.jpg"},
      ]
    };
  }

  addProductToCart = () => {
    Alert.alert('Success', 'The product has been added to your cart')
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  imageContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  /******** card components **************/
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:12,
    flex:1,
    color:"#000",

  },
  count:{
    fontSize:18,
    flex:1,
    color:"#B0C4DE"
  },
});