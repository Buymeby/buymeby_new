import React, { Component } from 'react'
import { StyleSheet, Text, Image, ScrollView, View, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import CartActions from '../Redux/CartRedux'
import QuantitySelector from '../Components/QuantitySelector'
import {
  DropDownMenu,
  Title,
  Subtitle,
  Caption,
  Tile
} from '@shoutem/ui';

import styles from './Styles/ItemDetailsScreenStyles'

class ItemDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuantity: 1
    };
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <ConnectedHeaderTitle navigation={navigation} />
    };
  };

  setQuantity = (quantity) => {
    this.setState({ selectedQuantity: quantity })
  }

  render () {
    const item = this.props.item
    const vendor = this.props.vendor
    const selectedQuantity = this.state.selectedQuantity

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.centered}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.image_file_src }}
                >
              </Image>
            </View>
            <Subtitle styleName="md-gutter-top">{item.description}</Subtitle>
            <Title styleName="md-gutter-top">${item.price} / {item.unit}</Title>
            <QuantitySelector
        			value={selectedQuantity}
        			minQuantity={1}
        			maxQuantity={item.quantity}
              onChange={this.setQuantity} />
            <TouchableOpacity style={styles.button} onPress={this.props.addToCart.bind(this, vendor.id, item.id, selectedQuantity)}>
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props.navigation.state.params,
    vendor: state.vendor.selected_vendor
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (vendor_id, item_id, quantity) => {
    dispatch(CartActions.add(vendor_id, item_id, quantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsScreen)

const HeaderTitle = ({ navigation, text }) => <Subtitle navigation={navigation}>{text}</Subtitle>;
const ConnectedHeaderTitle = connect((state, props) => ({ text: props.navigation.state.params.item.name }))(HeaderTitle);
