import React, { Component } from 'react';

import { StyleSheet, Text, Alert, View, AsyncStorage, Image, ListView, ImageBackground, ActivityIndicator, TouchableHighlight, TouchableOpacity, ScrollView, FlatList, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


class StoreProfile extends Component {

  constructor(props) {

    super(props);

    this.state = {
      storeid: '',
      store_id: '',
      isLoading: true,
      categorydata: [],
      product_id: '',
      dataSource: {},
      selected_city,
      store_name: '',
      banner: '',
      ID: '',
      hasCategories: false,
    };

    this.makeCategoryRequest()

  }


  componentWillMount() {
    AsyncStorage.getItem('selected_city')
      .then(selected_city => {
        this.setState({
          selected_city: selected_city,
        })
      })
    AsyncStorage.getItem('id').then(store_id => {
      // console.log(store_id, "idddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
      this.setState({
        store_id: store_id,
      })
    })
    AsyncStorage.getItem('store_name')
      .then(store_name => {
        this.setState({
          store_name: store_name,
        })
      })
    AsyncStorage.getItem('banner').then(banner => {
      // console.log(banner, "Baneeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      this.setState({
        banner: banner,
      })
    })
    //   const { navigation } = this.props;
    //   const itemId = navigation.getParam('store_name' );
    //  Alert.alert(+itemId)

  }

  makeCategoryRequest = () => {

    const url = "https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/stores/category";

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "storeid": this.state.store_id
      })
    })
      .then((response) => response.json()).then((responseJson) => {

        this.setState({

          isLoading: false,
          categorydata: responseJson.data,
        });

        this._fetchProducts(responseJson.data);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

  }

  async _fetchProducts(categories) {


    for (var i = 0; i < categories.length; i++) {

      const url = 'https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/stores/'+this.state.store_id+'/products?cat_id=' + categories[i].id;


      let response = null;
      let responseJson = null;


      try {
        response = await fetch(url);
        responseJson = await response.json();
      } catch (error) {
        console.log(error);
        this.setState({ error, loading: false });
        return;
      }


      let newData = this.state.dataSource;

      newData["c" + categories[i].id] = responseJson;
      this.setState({
        isLoading: false,
        dataSource: newData,
      });

      if (i == categories.length - 1) {

        this.setState({
          hasCategories: true
        })
      }
    }

  }

  __renderCategories = () => {

    return (
      <ScrollView>
        <View style={styles1.container}>
          <FlatList
            contentContainerStyle={styles1.listContainer}
            data={this.state.categorydata}
            horizontal={false}

            keyExtractor={({ id }, index) => id.toString()}

            renderItem={({ item }) => {

              let i = 0;
              return (

                <View style={styles1.categorycard} key={i++}>
                  <View style={styles1.cardContent}>

                    <Text style={styles1.categoryname}> {item.name} </Text>

                    <View>

                      {this.__renderProducts(item.id, item.name)}

                    </View>

                  </View>
                </View>

              )
            }
            }
          />
        </View>
      </ScrollView>
    )
  }


  __renderProducts = (cat_id, cat_name) => {

    let listData = this.state.dataSource["c" + cat_id];

    return (
      <ScrollView>
        <View style={styles1.container}>
          <FlatList
            contentContainerStyle={styles1.listContainer}
            data={listData}
            horizontal={true}

            keyExtractor={({ id }, index) => id.toString()}

            renderItem={({ item }) => {

              let i = 1;

              let productImage = { uri: 'https://controlf5.in/client-demo/groznysystems/wp-content/uploads/2013/06/T_3_front.jpg' };
              let _productImage = item.meta_data;
              let _sendProduct = 'https://controlf5.in/client-demo/groznysystems/wp-content/uploads/2013/06/T_3_front.jpg';
              for (var j = 0; j < _productImage.length; j++) {
                if (_productImage[j].key == "product_thumbnail") {
                  productImage = { uri: _productImage[j].value }
                  _sendProduct = _productImage[j].value;
                  break;
                }
              }

              return (

                <View style={styles1.card} key={i++}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewDetailItem', {
                    product_id: item.id,
                    product_image: _sendProduct,
                  })}>

                    <View>
                      <Image key={item.id} style={styles1.cardImage} source={productImage} />
                      <Text style={styles1.name}>{item.name}</Text>
                      <Text style={styles1.count}>Price :  {item.price}</Text>
                    </View>

                  </TouchableOpacity>
                </View>

              )
            }
            }
          />
        </View>
      </ScrollView>

    )
  }


  renderAsync() {
    return (

      <ScrollView >
        <View style={styles1.headerContent}>

          <View style={styles1.storeheaderContent}>
            <View style={styles1.storeheader}>
              <ImageBackground
                source={require('./Banner_2.jpg')}
                style={{
                  height: 230,
                  width: 450,
                  position: 'relative',
                }}>
                <View style={{ height: 40, padding: 10, alignItems: 'center' }}>

                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles1.storename}>
                      {this.state.selected_city}</Text>
                  </View>

                </View>
                {/* <View style={{ flex: 1, flexDirection: 'row',padding:8,alignItems:'center'}}> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                  <Text style={{ fontSize: 14, color: "#FFFFFF", textAlign: 'center', alignItems: 'center' }}>
                    {this.state.store_name}</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectCity')}>
                    <Image style={{ width: 12, height: 12, alignItems: 'center', marginTop: 5, marginLeft: 10 }} source={{ uri: 'https://www.controlf5.in/website-template/mobile/icon/arrow-n.png' }} />
                  </TouchableOpacity>
                </View>
                {/* </View> */}
                <View style={{ alignItems: 'center' }}>
                  <Image style={styles1.avatar}
                    source={{ uri: this.state.banner }} />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchTab')}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles1.inputContainer1}>
                      <TextInput
                        style={styles.inputs}
                        editable={false}
                        underlineColorAndroid='transparent'
                        placeholder={this.state.store_name}
                        placeholderTextColor="#421a8d" />

                      <Image source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/search.png' }} style={styles.inputIconMap} />
                    </View>
                  </View>
                </TouchableOpacity>
              </ImageBackground>

            </View>
            <View>
              <Image style={{ height: 100, width: 450, position: 'relative', marginTop: 10 }} source={require('./Banner2.jpg')} />
            </View>

          </View>

          <View>

            {this.__renderCategories()}

          </View>

        </View>

      </ScrollView >


    );
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('store_id');

    return (

      <View>
        {this.state.hasCategories && this.renderAsync()}
        {!this.setState.hasCategories &&

          <Text style={styles1.loadingbar}>Loading...</Text>

        }
      </View>

    );
  }
}

const styles1 = StyleSheet.create({

  categoryname: {
    fontSize: 14,
    flex: 1,
    color: "#000",
    marginLeft: 4,
    fontWeight: 'bold',
  },
  loadingbar: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 300,
    fontWeight: 'bold',
  },
  contentList: {
    flex: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 6,
  },
  categorycard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    backgroundColor: "white",
    padding: 5,
    flexDirection: 'row',
    borderRadius: 6,
  },
  container: {
    flex: 1,
  },

  listContainer: {

  },

  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },

  headerContent: {
    alignItems: 'center',
  },
  avatar1: {
    width: 300,
    height: 300,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 14,
    color: "#000000",
    fontWeight: '300',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  cardImage: {
    flex: 1,
    height: 75,
    width: 90,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

  },
  count: {
    marginTop: 10,
    fontSize: 12,
    color: "#0000FF",
    fontWeight: '300',
  },


  storeheader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  storeheaderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 10,
  },
  storename: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: '300',
    alignItems: 'center',
  },
  inputContainer1: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    height: 35,
    width: 300,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  inputs: {
    textAlign: 'center',
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIconMap: {
    width: 15,
    height: 15,
    marginLeft: 15,
    justifyContent: 'center',
    position: 'absolute',
    left: 5,
  },

});
class SearchTab extends Component {

  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,
      text: '',
      storeid: '',
      selected_city,



    }
    // storeid = this.props.navigation.state.params.id ;
    this.arrayholder = [];

    AsyncStorage.getItem('selected_city')
      .then(selected_city => {
        this.setState({
          selected_city: selected_city,
        })
      });
  }

  componentDidMount() {

    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products?search=' + this.state.text + '&consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson, "Response22222222222222222222222222222222222222222222222222222222")
        // console.log("url", 'https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products?search=' + this.state.text + '&consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {

          // In this block you can do something with new state.
          this.arrayholder = responseJson;

        });
      })
      .catch((error) => {
        console.error(error);
      });

  }
  getshow = () => {
    return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products?search=' + this.state.text + '&consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, "Response3333333333333333333333333333333333333333333")
        console.log("url111111111111111111111111", 'https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products?search=' + this.state.text + '&consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {

          // In this block you can do something with new state.
          this.arrayholder = responseJson;

        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  GetListViewItem(name) {

    Alert.alert(name);

  }

  SearchFilterFunction(text) {

    const newData = this.arrayholder.filter(function (item) {
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
        <View style={{ flex: 1, paddingTop: 20 }}>
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
            value={this.state.text}
            onChangeText={(text) => { this.setState({ text: text }) }}
            placeholder={this.state.selected_city} />

          <Image source={require('./Search_icon.png')} style={styles.inputIcon} />
        </View>
        <Button style={{ width: 50, height: 20 }} color="#421a8d" title="search" onPress={this.getshow.bind(this.state.text)} />

        <Text style={{ marginTop: 10, marginLeft: 10, color: 'black', fontSize: 20, }}>
          popular searches
        </Text>
        <View style={{ borderBottomColor: '#000', borderBottomWidth: .5, alignSelf: 'stretch', marginTop: 20, }} />

        <ListView
          dataSource={this.state.dataSource}

          renderSeparator={this.ListViewItemSeparator}

          renderRow={(rowData) => <TouchableHighlight style={styles.rowStyle} underlayColor='#421a8d' onPress={() => this.props.navigation.navigate('StoreProfile')}>
            <Text style={styles.rowText}>{rowData.name}</Text>
          </TouchableHighlight>
          }
          enableEmptySections={true}

          style={{ marginTop: 10 }}
        />

      </View>
      //      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    margin: 10,
    flex: 1,
  },
  button: {
    width: 40,

    padding: 10,
    backgroundColor: '#DE7A0A',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,

  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10,
    color: '#421a8d',
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 350,
    marginLeft: 10,
    borderRadius: 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    marginTop: 20,
    alignItems: 'center',
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
    height: 45,
    marginBottom: 20,
    borderRadius: 7,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  inputs: {
    textAlign: 'center',
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 15,
    height: 15,
    marginLeft: 15,
    justifyContent: 'center',
    position: 'absolute',
    left: 5,
  },
  inputIconMap: {
    width: 20,
    height: 20,
    marginLeft: 15,
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
    marginTop: 10,
    alignItems: 'center',

  },
  inputWrap: {
    flex: 1,
  },
  inputIcon1: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginBottom: 17,
  },
  addCart: {
    width: 25,
    height: 25,
    marginLeft: 15,
    justifyContent: 'center',
    position: 'absolute',
    left: 5,
  },
});
class AboutUs extends Component {

  constructor(props) {

    super(props);

    this.state = {
      aboutus: '',

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
          <Image style={styles2.image} source={{ uri: 'https://www.controlf5.in/website-template/Consulting/images/log.jpg' }} />
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
    width: 110,
    height: 110,
    marginTop: 30,
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    padding: 10,
    flex: 1,

  },


});
// class CustomerProfile extends Component {

//   constructor(props) {

//     super(props);

//     this.state = {

//       user_nicename: '',
//       user_email: '',

//     }

//     AsyncStorage.getItem('user_nicename').then(asyncStorageRes => {

//       this.setState({

//         user_nicename: asyncStorageRes

//       });

//     });

//     AsyncStorage.getItem('user_email').then(asyncStorageRes => {

//       this.setState({

//         user_email: asyncStorageRes

//       });

//     });

//   }


//   render() {
//     return (
//       <View style={styles5.container}>
//         <View style={styles5.header}>
//           <View style={styles5.headerContent}>
//             <Image style={styles5.avatar}
//               source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

//             <Text style={styles5.name}>{this.state.user_nicename} </Text>
//           </View>
//           <Text style={styles5.name1}>Personal Information </Text>
//         </View>

//         <View style={styles5.body}>
//           <View style={styles5.inputContainer}>

//             <TextInput style={styles5.inputs}
//               placeholder={this.state.user_nicename}

//               underlineColorAndroid='#778899'
//               onChangeText={(password) => this.setState({ password })} />

//           </View>

//           <View style={styles5.inputContainer}>
//             <TextInput style={styles5.inputs}
//               placeholder={this.state.user_email}

//               underlineColorAndroid='#778899'
//               onChangeText={(password) => this.setState({ password })} />

//           </View>
//           <View style={styles5.inputContainer}>
//             <TextInput style={styles5.inputs}
//               placeholder="Mobile No"

//               underlineColorAndroid='#778899'
//               onChangeText={(password) => this.setState({ password })} />
//           </View>
//           <View style={styles5.inputContainer}>
//             <TextInput style={styles5.inputs}
//               placeholder="Address"

//               underlineColorAndroid='#778899'
//               onChangeText={(password) => this.setState({ password })} />
//           </View>
//           <View style={styles5.inputContainer}>
//             <TextInput style={styles5.inputs}
//               placeholder="Pin Code"

//               underlineColorAndroid='#778899'
//               onChangeText={(password) => this.setState({ password })} />
//           </View>
//           <View style={styles5.inputContainer}>
//             <TextInput style={styles5.inputs}
//               placeholder="City"

//               underlineColorAndroid='#778899'
//               onChangeText={(password) => this.setState({ password })} />
//           </View>
//           <TouchableOpacity style={[styles5.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('ChangePassword')}>
//             <Text style={styles5.loginText}>Update Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }
class CustomerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user_nicename1: '',
      // user_email: '',

      user_id: "",
      mob_no: "",
      password: "",
      username: "",
      user_login: "",
      id: "",
      first_name: "",
      email: "",
      phone: "",
      address_1: "",
      postcode: "",
      city: ""
    };

    // AsyncStorage.getItem('user_nicename').then(asyncStorageRes => {
    //   console.log(asyncStorageRes, "user name")
    //   this.setState({

    //     user_nicename1: asyncStorageRes

    //   });

    // });

    // AsyncStorage.getItem('user_email').then(asyncStorageRes => {
    //   console.log(asyncStorageRes, "Email")
    //   this.setState({

    //     user_email: asyncStorageRes

    //   });

    // });

    // AsyncStorage.getItem("ID").then(ID => {
    //   console.log(ID, "USer Profile USer ID");
    //   this.setState({
    //     ID: ID
    //   });
    // });

    // AsyncStorage.getItem('ID')
    //   .then(ID => {
    //     console.log(ID, "ID_PRofileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    //     this.setState({
    //       ID: ID
    //     });
    //   });
  }

  // componentDidMount() {
  //   const url =
  //     "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v3/customers/"+this.state.ID+"/?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96";
  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson, "Response");
  //       console.log(
  //         "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v3/customers/"+this.state.ID+"/?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96",
  //         "user_profile"
  //       );
  //       this.setState({
  //         first_name: responseJson.first_name,
  //         email: responseJson.email,
  //         // phone: responseJson[0].billing.phone,
  //         // address_1: responseJson[0].billing.address_2,
  //         // postcode: responseJson[0].billing.postcode,
  //         // city: responseJson[0].billing.city,
  //       });

  //       AsyncStorage.setItem("first_name", this.state.first_name);
  //       AsyncStorage.setItem("email", this.state.email);
  //       AsyncStorage.setItem("phone", this.state.phone);
  //       AsyncStorage.setItem("address_1", this.state.address_1);
  //       AsyncStorage.setItem("postcode", this.state.postcode);
  //       AsyncStorage.setItem("city", this.state.city);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  componentDidMount() {
    AsyncStorage.getItem("ID").then(user_id => {
      console.log(user_id, "USer Profile USer ID");

      const formData = new FormData();
      console.log(formData, "form data");

      fetch(
        "https://controlf5.in/client-demo/groznysystems/wp-json/dokan/v1/userinfo",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: user_id
          })
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log("User Profile Data", responseJson);
          this.setState({
            id: responseJson.user.id,
            first_name: responseJson.user.firstname,
            email: responseJson.user.email,
            // postcode: responseJson.billing.postcode
            // phone: responseJson.billing.phone,
            // address_1: responseJson.billing.address_1,
            // postcode: responseJson.billing.postcode,

            // phone: responseJson[0].billing.phone,
            // address_1: responseJson[0].billing.address_2,
            // postcode: responseJson[0].billing.postcode,
            // city: responseJson[0].billing.city,
          });
          console.log("hello");
          console.log(this.state.id, "id");
          console.log(this.state.first_name, "firstname");
          console.log(this.state.email, "email");
          // console.log(this.state.postcode, "postcode");
          // console.log(this.state.phone, "phone");
          // console.log(this.state.address_1, "address_1");
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles5.container}>
          <View style={styles5.header}>
            <View style={styles5.headerContent}>
              <Image
                style={styles5.avatar}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                }}
              />

              <Text style={styles5.name}>{this.state.user_nicename} </Text>
            </View>
            <Text style={styles5.name1}>Personal Information </Text>
          </View>

          <View style={styles5.body}>
            <View style={styles5.inputContainer}>
              <TextInput
                style={styles5.inputs}
                placeholder={this.state.first_name}
                secureTextEntry={true}
                editable={false}
                underlineColorAndroid="#778899"
                onChangeText={password => this.setState({ password })}
              />
            </View>

            <View style={styles5.inputContainer}>
              <TextInput
                style={styles5.inputs}
                placeholder={this.state.email}
                editable={false}
                secureTextEntry={true}
                underlineColorAndroid="#778899"
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles5.inputContainer}>
              <TextInput
                style={styles5.inputs}
                placeholder={this.state.phone}
                editable={false}
                secureTextEntry={true}
                underlineColorAndroid="#778899"
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles5.inputContainer}>
              <TextInput
                style={styles5.inputs}
                placeholder={this.state.address_1}
                editable={false}
                secureTextEntry={true}
                underlineColorAndroid="#778899"
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles5.inputContainer}>
              <TextInput
                style={styles5.inputs}
                placeholder={this.state.postcode}
                editable={false}
                secureTextEntry={true}
                underlineColorAndroid="#778899"
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles5.inputContainer}>
              <TextInput
                style={styles5.inputs}
                placeholder={this.state.city}
                editable={false}
                secureTextEntry={true}
                underlineColorAndroid="#778899"
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <TouchableOpacity
              style={[styles5.buttonContainer, styles.loginButton]}
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              <Text style={styles5.loginText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles5 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    padding: 20

  },
  header: {
    backgroundColor: "#DCDCDC",
    marginTop: 10,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: "#000000",
    fontWeight: '600',
  },
  name1: {
    fontSize: 17,
    color: "#000000",
    fontWeight: '300',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#DCDCDC",
    height: 400,
    alignItems: 'center',
    padding: 10

  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: 400,
    height: 45,
    marginTop: 10,
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
  inputs: {
    height: 45,
    marginLeft: 20,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 400,

    backgroundColor: 'transparent'
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
});

// const { navigation } = this.props;
// const storeId = navigation.getParam('store_id', '0');
const RootStack = createBottomTabNavigator(

  {
    StoreProfile: {
      screen: StoreProfile,
      params: { id: 0 },
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={25} />
        )
      }
    },
    Search: {
      screen: SearchTab,
      params: { id: 0 },
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={25} />
        )
      }
    },
    Aboutus: {
      screen: AboutUs,
      navigationOptions: {
        tabBarLabel: 'About us',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-more" color={tintColor} size={25} />
        )
      }
    },
    CustomerProfile: {
      screen: CustomerProfile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={25} />
        )
      }
    },
  },
  {
    initialRouteName: "StoreProfile"
  },
);


export default createAppContainer(RootStack);

//export default withNavigation(StoreProfile);
