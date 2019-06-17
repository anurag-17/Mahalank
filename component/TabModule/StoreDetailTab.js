// import * as React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
//   AsyncStorage,
//   ImageBackground,
//   TouchableOpacity,
//   ScrollView,
//   FlatList
// } from "react-native";

// export default class StoreDetailTab extends React.Component {
//   static navigationOptions = {
//     header: null
//   };
//   constructor(props) {
//     super(props);

//     this.state = {
//       city_area: "",
//       selected_city: "",
//       city_zipcode: "",
//       cat_id: ""
//     };

//     selected_city = this.props.navigation.state.params.Selected_city;
//     city_area = this.props.navigation.state.params.city_area;
//     city_zipcode = this.props.navigation.state.params.city_zipcode;
//   }

//   componentDidMount() {
//     return fetch(
//       "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products/categories?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96"
//     )
//       .then(response => response.json())
//       .then(responseJson => {
//         this.setState({
//           cat_id: responseJson[0].id,
//           dataSource: responseJson
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }
//   getdata = value => {
//     AsyncStorage.setItem("id", value.id);
//     console.log(
//       value.id,
//       "id111111111111111111111111111111111111111111111111111111111111111111111111111111111"
//     );
//     AsyncStorage.setItem("store_name", value.store_name);
//     AsyncStorage.setItem("banner", value.banner);
//     console.log(
//       value.banner,
//       "bannerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
//     );
//     this.props.navigation.navigate("App");
//   };

//   renderStores() {
//     const url =
//       "https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/stores/catestore?cat_id=" +
//       this.state.cat_id;

//     fetch(url)
//       .then(res => res.json())
//       .then(responseJson => {
//         this.setState({
//           storedata: responseJson
//         });
//       })
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });

//     return (
//       <ScrollView>
//         <View>
//           <FlatList
//             style={styles.contentList}
//             columnWrapperStyle={styles.listContainer}
//             data={this.state.storedata}
//             keyExtractor={({ id }, index) => id.toString()}
//             renderItem={({ item }) => {
//               return (
//                 <TouchableOpacity
//                   style={styles.storecard}
//                   onPress={() => this.getdata(item)}
//                 >
//                   <Image
//                     style={styles.storeimage}
//                     source={{ uri: item.banner }}
//                   />

//                   <View style={styles.storecardContent}>
//                     <View>
//                       <Text style={styles.name}>{item.store_name}</Text>
//                       {/* <Text style={styles.followButtonText}>
//                         Same as store prizes{" "}
//                       </Text> */}
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       </ScrollView>
//     );
//   }

//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <Text
//             style={{
//               marginLeft: 10,
//               color: "black",
//               fontSize: 30,
//               textAlign: "center",
//               fontWeight: "bold"
//             }}
//           >
//             Welcome to Mahalak
//           </Text>
//           <Text style={{ color: "#421a8d", fontSize: 14, textAlign: "center" }}>
//             {selected_city},{city_area}
//           </Text>
//           <View style={styles.inputContainer}>
//             <Text
//               style={{
//                 color: "#421a8d",
//                 fontSize: 15,
//                 textAlign: "center",
//                 marginLeft: 150
//               }}
//             >
//               Stores in {selected_city}
//             </Text>
//             <Image source={require("./arrow.png")} style={styles.inputIcon} />
//             <Image source={require("./map.png")} style={styles.inputIconMap} />
//           </View>

//           <View>
//             <FlatList
//               data={this.state.dataSource}
//               horizontal={true}
//               keyExtractor={({ id }, index) => id.toString()}
//               renderItem={({ item }) => {
//                 return (
//                   <ScrollView>
//                     <View style={styles.card}>
//                       <TouchableOpacity
//                         onPress={() => this.setState({ cat_id: item.id })}
//                       >
//                         <View style={styles.imageContainer}>
//                           <View>
//                             <Text style={styles.name}>{item.name}</Text>
//                           </View>
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   </ScrollView>
//                 );
//               }}
//             />
//           </View>
//           <View>{this.renderStores()}</View>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//     marginTop: 15
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   button: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     padding: 10,
//     margin: 2
//   },
//   inputContainer: {
//     borderBottomColor: "#F5FCFF",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 7,
//     borderBottomWidth: 1,
//     height: 45,
//     marginBottom: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,

//     shadowColor: "#808080",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,

//     elevation: 5
//   },
//   inputIcon: {
//     width: 15,
//     height: 15,
//     marginRight: 15,
//     justifyContent: "center",
//     position: "absolute",
//     right: 5
//   },
//   inputIconMap: {
//     width: 20,
//     height: 20,
//     marginLeft: 15,
//     justifyContent: "center",
//     position: "absolute",
//     left: 5
//   },
//   card: {
//     shadowColor: "#00000021",
//     shadowOffset: {
//       width: 0,
//       height: 6
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     marginLeft: 10,
//     marginRight: 10,
//     backgroundColor: "white",
//     padding: 10,
//     flexDirection: "row"
//   },
//   imageContainer: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4
//     },
//     shadowOpacity: 0.32
//   },
//   contentList: {
//     flex: 1
//   },
//   followButtonText: {
//     color: "#000",
//     fontSize: 14
//   },
//   name: {
//     color: "#000",
//     fontSize: 14
//   },
//   storecardContent: {
//     marginLeft: 10,
//     marginTop: 5
//   },
//   storeimage: {
//     width: 90,
//     height: 90,
//     borderRadius: 2,
//     borderWidth: 2,
//     borderColor: "#ebf0f7"
//   },

//   storecard: {
//     shadowColor: "#00000021",
//     shadowOffset: {
//       width: 0,
//       height: 6
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     elevation: 12,
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 10,
//     backgroundColor: "white",
//     padding: 10,
//     flexDirection: "row",
//     borderRadius: 6
//   }
// });

// --------------------------------------New Code--------------------------------------------------------------

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";

export default class StoreDetailTab extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      city_area: "",
      selected_city: "",
      city_zipcode: "",
      cat_id: ""
    };

    selected_city = this.props.navigation.state.params.Selected_city;
    city_area = this.props.navigation.state.params.city_area;
    city_zipcode = this.props.navigation.state.params.city_zipcode;

    console.log(city_zipcode, "Zip code");
  }

  componentDidMount() {
    return fetch(
      "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products/categories?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          cat_id: responseJson[0].id,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  getdata = value => {
    AsyncStorage.setItem("id", value.id);
    console.log(
      value.id,
      "id111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    );
    AsyncStorage.setItem("store_name", value.store_name);
    AsyncStorage.setItem("banner", value.banner);
    console.log(
      value.banner,
      "bannerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
    );
    this.props.navigation.navigate("App");
  };

  renderStores() {
    const url =
      // "https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/stores/catestore?cat_id=" +
      // this.state.cat_id;
      "https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/area/store/";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        zipcode: city_zipcode
      })
    })
      .then(res => res.json())
      .then(responseJson => {
        this.setState({
          storedata: responseJson
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

    return (
      <ScrollView>
        <View>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.storedata}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.storecard}
                  onPress={() => this.getdata(item)}
                >
                  <Image
                    style={styles.storeimage}
                    source={{ uri: item.banner }}
                  />

                  <View style={styles.storecardContent}>
                    <View>
                      <Text style={styles.name}>{item.store_name}</Text>
                      {/* <Text style={styles.followButtonText}>
                        Same as store prizes{" "}
                      </Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              marginLeft: 10,
              color: "black",
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            Welcome to Mahalak
          </Text>
          <Text style={{ color: "#421a8d", fontSize: 14, textAlign: "center" }}>
            {selected_city},{city_area}
          </Text>
          <View style={styles.inputContainer}>
            <Text
              style={{
                color: "#421a8d",
                fontSize: 15,
                textAlign: "center",
                marginLeft: 150
              }}
            >
              Stores in {selected_city}
            </Text>
            <Image source={require("./arrow.png")} style={styles.inputIcon} />
            <Image source={require("./map.png")} style={styles.inputIconMap} />
          </View>

          <View>
            <FlatList
              data={this.state.dataSource}
              horizontal={true}
              keyExtractor={({ id }, index) => id.toString()}
              renderItem={({ item }) => {
                return (
                  <ScrollView>
                    <View style={styles.card}>
                      <TouchableOpacity
                        onPress={() => this.setState({ cat_id: item.id })}
                      >
                        <View style={styles.imageContainer}>
                          <View>
                            <Text style={styles.name}>{item.name}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                );
              }}
            />
          </View>
          <View>{this.renderStores()}</View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    marginTop: 15
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 2
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    borderBottomWidth: 1,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
    justifyContent: "center",
    position: "absolute",
    right: 5
  },
  inputIconMap: {
    width: 20,
    height: 20,
    marginLeft: 15,
    justifyContent: "center",
    position: "absolute",
    left: 5
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row"
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32
  },
  contentList: {
    flex: 1
  },
  followButtonText: {
    color: "#000",
    fontSize: 14
  },
  name: {
    color: "#000",
    fontSize: 14
  },
  storecardContent: {
    marginLeft: 10,
    marginTop: 5
  },
  storeimage: {
    width: 90,
    height: 90,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },

  storecard: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 6
  }
});
