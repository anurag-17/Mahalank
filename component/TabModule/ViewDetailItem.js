import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image,Alert, ScrollView, FlatList,Button} from 'react-native';
import PropTypes from "prop-types";
import { withNavigation } from 'react-navigation';


class ViewDetailItem  extends Component  {
   constructor(props) {
     super(props);

     this.state = {
       productImg:'',
       productId:'',
       product_name:'',
       description:'',
       average_rating:'',
       price:'',
       number: this.props.start,
     };

      productImg = this.props.navigation.state.params.product_image ;
      productId = this.props.navigation.state.params.product_id ;

      this.onPressMinus = this.onPressMinus.bind(this);
      this.onPressPlus = this.onPressPlus.bind(this);

   }

    componentDidMount() {

       return fetch('https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/products/'+ productId +'?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96')
           .then((response) => response.json())
           .then((responseJson) => {

                 this.setState({

                   product_name:responseJson.name,
                   description:responseJson.description,
                   average_rating:responseJson.average_rating,
                   price:responseJson.price,

                 });

           })
           .catch((error) => {
             console.error(error);
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

   addtocart = () => {

          const url = "https://controlf5.in/client-demo/groznysystems/wp-json/wc/v2/cart/add?consumer_key=ck_a1cfd8083dabcebeba07f7597c9958b7f2354295&consumer_secret=cs_cb6cd3ea6f225ce04c254f9525ae12fa88399d96";

          console.log(productId , 'product id view' )

            fetch(url, {
                    method: 'POST',
                       headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                         "product_id": productId,
                         "quantity": '1'
                       })
              })
            .then((response) => response.json()).then((responseJson) => {

                  console.log(responseJson)
        
                  this.props.navigation.navigate('AddToCart')       

            })
            .catch(error => {
              this.setState({ error, loading: false });
            });

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
         style={[styles.touchable, buttonStyle]}
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
               styles.iconText,
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
         style={[styles.touchable, buttonStyle]}
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
               styles.iconText,
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


  render() {
  const { number } = this.state;
    return (

        <ScrollView>
          <View style={styles.container}>

              <View style={{alignItems:'center', backgroundColor:'white'}}>

                <Image style={styles.productImg} source={{uri:productImg}}/>
                <Text style={styles.name}>{this.state.product_name}</Text>

                <Text style={styles.price}>{this.state.price} /- Rs</Text>

                <View style={{borderBottomColor: '#000',borderBottomWidth: .5,alignSelf: 'stretch',marginTop:10,}}/>

               <View style={styles.containerbtn}>
                 <View>{this.renderMinusButton()}</View>
                    <View style={styles.number}>
                   <Text style={[styles.text, { color: this.props.textColor }]}>
                       {number}
                   </Text>
                 </View>
                <View>{this.renderPlusButton()}</View>
               </View>

               <View style={{borderBottomColor: '#000',borderBottomWidth: .5,alignSelf: 'stretch',marginTop:10,}}/>

                <View style={{backgroundColor:'white',height:180,}}>
                   <View style={styles.Description}>
                     <View style={styles.row}>
                        <Text style={{ marginLeft: 20, color: '#421a8d', fontSize: 14,textAlign: 'center',textAlign: 'justify',lineHeight: 20,}}>Department:</Text>
                        <Text style={{ color: 'black', fontSize: 14,textAlign: 'center',textAlign: 'justify',lineHeight: 20,marginLeft: 10,}}>Clothing</Text>
                     </View>
                   </View>

                  <View style={{backgroundColor:'white',marginTop:10}}>
                    <Text style={{ marginLeft: 20, color: '#421a8d', fontSize: 14,textAlign: 'center',textAlign: 'justify',lineHeight: 20,}}>Description :</Text>
                   <Text style={styles.description}> {this.state.description}  </Text>
                 </View>
                </View>


              </View>

              <View style={styles.addToCarContainer}>
                 <TouchableOpacity style={styles.shareButton1} onPress={this.addtocart}  >
                   <Text style={styles.shareButtonText1}>ADD TO CART</Text>
                 </TouchableOpacity>
               </View>

          </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container5: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:50,
  },
   container:{
      flex:1,
      marginTop:30,
      backgroundColor:'white',
    },
    productImg:{
      width:200,
      height:200,
    },
    name:{
      marginTop:30,
      fontSize:18,
      color:"#696969",
      fontWeight:'bold'
    },
    price:{
      marginTop:10,
      fontSize:15,
      color:'#421a8d',
      fontWeight:'bold'
    },
    quantity:{
        marginTop:10,
        fontSize:15,
        color:'#421a8d',
      },
    description:{
      color:"#696969",
      padding:20,
      marginTop:-17,
      fontSize:15,
      textAlign: 'justify',
      lineHeight: 24,
    },
    star:{
      width:50,
      height:50,
    },
    btnColor: {
      height:30,
      width:30,
      borderRadius:30,
      marginHorizontal:3
    },
    btnSize: {
      height:40,
      width:40,
      borderRadius:40,
      borderColor:'#778899',
      borderWidth:1,
      marginHorizontal:3,
      backgroundColor:'white',

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    starContainer:{
      flexDirection:'row',
      marginTop:30,
    },
    Description:{
        flexDirection:'row',
        marginTop:20,
        backgroundColor:'white'
      },
    Description1:{
        flexDirection:'row',
        backgroundColor:'white',
        marginTop:8,
      },
    contentColors:{
      justifyContent:'center',
      marginHorizontal:30,
      flexDirection:'row',
      marginTop:20
    },
    contentSize:{
      justifyContent:'center',
      marginHorizontal:30,
      flexDirection:'row',
      marginTop:20
    },
    separator:{
      height:2,
      backgroundColor:"#eeeeee",
      marginTop:20,
      marginHorizontal:30
    },
     separator1:{
        height:10,
        backgroundColor:'black',
        marginTop:20,
        marginHorizontal:30
      },
    shareButton: {
      marginTop:10,
      height:45,
      width:180,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#00BFFF",
      marginLeft:10,
    },
    shareButtonText:{
      color: "#FFFFFF",
      fontSize:10,
    },
    shareButton1: {
      marginTop:40,
      height:40,
      width:'80%',
      borderRadius:60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#421a8d",
      padding:15,
      marginLeft:50,
    },
    shareButtonText1:{
      color: "white",
      fontSize:20,
    },
    addToCarContainer:{
      flex:1,
      flexDirection: 'row',
      marginTop:32,

    },
    row: {
      flex: 1,
      flexDirection: "row",
    },
   inputWrap: {
      flex: 1,
    },
   containerbtn: {
      flexDirection: "row",
      marginTop:10,
      backgroundColor:'white'
    },
   text: {
      fontSize: 16,
      paddingLeft: 15,
      paddingRight: 15
    },
      iconText: {
        fontSize: 22,
        marginTop: -3
      },

      number: {
        minWidth: 40,
        alignItems: "center",
        justifyContent: "center"
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

    ViewDetailItem.propTypes = {
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

    ViewDetailItem.defaultProps = {
      start: 0,
      min: 0,
      max: 10,
      onChange(number, type) {
        // Number, - or +
      },

      textColor: "#196583",
      touchableColor: "#27AAE1",
      touchableDisabledColor: "#B5E9FF",

      minusIcon: null,
      plusIcon: null
};



export default withNavigation(ViewDetailItem);


















