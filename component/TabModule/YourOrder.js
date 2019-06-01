import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, ToastAndroid, ActivityIndicator } from "react-native";
import { Container, Header, Content, SwipeRow, Icon, Button } from 'native-base';
import PropTypes from "prop-types";

export default class YourOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/orders?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (

      <View style={styles.container}>

        <View >
          <ScrollView>
            <View >
              <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={this.state.dataSource}
                keyExtractor={({ id }, index) => id.toString()}
                renderItem={({ item }) => {
                  return (

                    <TouchableOpacity style={styles.storecard}
                      onPress={() => this.props.navigation.navigate('ViewDetailItem', {
                        product_id: item.id,
                      })}>
                      <Image style={styles.storeimage} source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/log.jpg' }} />
                      <View style={styles.storecardContent}>
                        <View>
                          {item.line_items.map((item) => (
                            <Text key={item.id} style={styles.name}>{item.name}</Text>
                          )
                          )
                          }
                        </View>
                        <View>
                          <Text key={item.id} style={styles.created_date}>Created at : {item.date_created}</Text>
                        </View>

                      </View>
                    </TouchableOpacity>
                  )
                }} />
            </View>
          </ScrollView>
        </View>

      </View>

    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 2,
  },
  name: {
    fontSize: 14,
    marginTop: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    borderBottomWidth: 1,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
  },
  inputIconMap: {
    width: 20,
    height: 20,
    marginLeft: 15,
    justifyContent: 'center',
    position: 'absolute',
    left: 5,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',

  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,

  },
  contentList: {
    flex: 1,
  },
  created_date: {
    color: '#0000FF',
    fontSize: 12,
    marginTop: 12,
  },

  storecardContent: {
    marginLeft: 10,
    marginTop: 5
  },
  storeimage: {
    width: 80,
    height: 80,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },

  storecard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 6,
  },
});

