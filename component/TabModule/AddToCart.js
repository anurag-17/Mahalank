import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Content,
  SwipeRow,
  Icon,
  Button
} from "native-base";
import PropTypes from "prop-types";

export default class AddToCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.start,
      // ID: "",
      product_id: "",
      quantity: "",
      product_name: "",
      price: "",
      product_image: "",
      user_id: "",
      dataSource: []
    };

    // bind functions..
    this.onPressMinus = this.onPressMinus.bind(this);
    this.onPressPlus = this.onPressPlus.bind(this);

    //   AsyncStorage.getItem("ID").then(ID => {
    //     console.log(ID, "Add to Cart user Id");
    //     this.setState({
    //       ID: ID
    //     });
    //   });
  }

  // componentDidMount() {
  //   return fetch(
  //     "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96"
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       // console.log(responseJson);

  //       this.setState({
  //         dataSource: responseJson
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  componentDidMount() {
    AsyncStorage.getItem("ID").then(user_id => {
      console.log(user_id, "USer Profile USer ID");

      const formData = new FormData();
      console.log(formData, "View Detail");
      const url =
        // "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/add?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96";
        "https://controlf5.in/client-demo/groznysystems/wp-json/api/view_cart";

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("Add to Cart Data show here", responseJson);

          if (responseJson.status == "false") {
            ToastAndroid.show("Cart is Empty!", ToastAndroid.SHORT);
            // this.setState({
            //   Error: "Cart is Empty!"
            // });
          } else {
            this.setState({
              product_id: responseJson[0].product_id,
              dataSource: responseJson
            });
            console.log("product_id", product_id);
          }
        })

        .catch(error => {
          this.setState({ error, loading: false });
        });
    });
  }

  onPressMinus() {
    const { number } = this.state;
    const minusNumber = number - 1;

    if (number == this.props.min) {
      return;
    }

    return this.setState({ number: minusNumber }, () =>
      this.props.onChange(minusNumber, "-")
    );
  }

  onPressPlus() {
    const { number } = this.state;
    const plusNumber = number + 1;

    if (number == this.props.max) {
      return;
    }

    return this.setState({ number: plusNumber }, () =>
      this.props.onChange(plusNumber, "+")
    );
  }

  renderMinusButton() {
    const {
      min,
      touchableDisabledColor,
      touchableColor,
      minusIcon
    } = this.props;
    const isMinusDisabled = min == this.state.number;
    const buttonStyle = {
      borderColor: isMinusDisabled ? touchableDisabledColor : touchableColor
    };

    return (
      <TouchableOpacity
        style={[Styles.touchable, buttonStyle]}
        onPress={this.onPressMinus}
        activeOpacity={isMinusDisabled ? 0.9 : 0.2}
      >
        {this.props.minusIcon ? (
          this.props.minusIcon(
            isMinusDisabled,
            touchableDisabledColor,
            touchableColor
          )
        ) : (
          <Text
            style={[
              Styles.iconText,
              {
                color: isMinusDisabled ? touchableDisabledColor : touchableColor
              }
            ]}
          >
            -
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  renderPlusButton() {
    const {
      max,
      touchableDisabledColor,
      touchableColor,
      plusIcon
    } = this.props;
    const isPlusDisabled = max == this.state.number;
    const buttonStyle = {
      borderColor: isPlusDisabled ? touchableDisabledColor : touchableColor
    };

    return (
      <TouchableOpacity
        style={[Styles.touchable, buttonStyle]}
        onPress={this.onPressPlus}
        activeOpacity={isPlusDisabled ? 0.9 : 0.2}
      >
        {this.props.plusIcon ? (
          this.props.plusIcon(
            isPlusDisabled,
            touchableDisabledColor,
            touchableColor
          )
        ) : (
          <Text
            style={[
              Styles.iconText,
              {
                color: isPlusDisabled ? touchableDisabledColor : touchableColor
              }
            ]}
          >
            +
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  removeItem(key) {
    let newData = this.state.dataSource;
    AsyncStorage.getItem("ID").then(user_id => {
      console.log(user_id, "USer Profile USer ID");

      const formData = new FormData();
      console.log(formData, "View Detail");
      // const url = "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/add";
      const url =
        "https://controlf5.in/client-demo/groznysystems/wp-json/api/delete_cart";

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: this.state.product_id,
          user_id: user_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "delete item response");
          let data = this.state.dataSource;
          // data = data.filter(item => item.product_id !== product_id);
          data = data.filter(item => item.key !== key);
          this.setState({
            dataSource: data
          });
          ToastAndroid.show("Your item is deleted!", ToastAndroid.SHORT);

        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    });
  }

  updateItem(key) {
    AsyncStorage.getItem("ID").then(user_id => {
      console.log(user_id, "USer Profile USer ID");

      const formData = new FormData();
      console.log(formData, "View Detail");

      const url =
        "https://controlf5.in/client-demo/groznysystems/wp-json/api/update_cart";

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: this.state.product_id,
          quantity: this.state.quantity,
          user_id: user_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          ToastAndroid.show("Your item is Updated!", ToastAndroid.SHORT);
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    });
  }

  render() {
    const { number } = this.state;

    return (
      <ScrollView>
        <View>
          <Content scrollEnabled={false}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <SwipeRow
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  left={
                    <Button
                      success
                      onPress={() => this.updateItem(item.product_id)}
                    >
                      <Icon active name="add" />
                    </Button>
                  }
                  body={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("ViewDetailItem", {
                            product_id: item.product_id,
                            product_image: item.product_image
                          })
                        }
                      >
                        <Image
                          style={Styles.image}
                          source={{ uri: item.product_image }}
                        />
                      </TouchableOpacity>

                      <View style={Styles.boxContent}>
                        <Text style={Styles.title}>{item.product_name}</Text>
                        {/* <Text style={Styles.title}>{item.product_id}</Text> */}
                        <View style={Styles.container}>
                          <View>
                            <Text style={Styles.text}>Quantity : </Text>
                          </View>
                          <View style={Styles.number}>
                            <Text
                              style={[
                                Styles.text,
                                { color: this.props.textColor }
                              ]}
                            >
                              {item.quantity}
                            </Text>
                          </View>
                          <View>
                            <Text style={Styles.text}>
                              Price : {item.total}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                  right={
                    <Button danger onPress={() => this.removeItem(item.key)}>
                      <Icon active name="trash" />
                    </Button>
                    //   <Button danger onPress={() => this.removeItem(item.product_id)}>
                    //   <Icon active name="trash" />
                    // </Button>
                  }
                />
              )}
            />
          </Content>

          <View style={Styles.addToCarContainer}>
            <TouchableOpacity
              style={Styles.shareButton}
              onPress={() => this.props.navigation.navigate("Checkout")}
            >
              <Text style={Styles.shareButtonText}>Checkout Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row"
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row"
  },

  text: {
    fontSize: 14,
    marginLeft: 10
  },
  image: {
    width: 90,
    height: 80
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    color: "#646464"
  },
  title: {
    fontSize: 18,
    color: "#151515"
  },

  product_name: {
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5
  },

  iconText: {
    fontSize: 22,
    marginTop: -3
  },

  number: {
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#421a8d",
    marginBottom: 20
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20
  },
  addToCarContainer: {
    marginHorizontal: 10
  },

  touchable: {
    width: 35,
    height: 26,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

AddToCart.propTypes = {
  start: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,

  textColor: PropTypes.string,
  touchableColor: PropTypes.string,
  touchableDisabledColor: PropTypes.string,

  minusIcon: PropTypes.func,
  plusIcon: PropTypes.func
};

AddToCart.defaultProps = {
  start: 0,
  min: 0,
  max: 10,
  onChange(number, type) {
    // Number, - or +
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#421a8d",
    marginBottom: 20
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20
  },
  addToCarContainer: {
    marginHorizontal: 10
  },

  textColor: "#196583",
  touchableColor: "#27AAE1",
  touchableDisabledColor: "#B5E9FF",

  minusIcon: null,
  plusIcon: null
};
