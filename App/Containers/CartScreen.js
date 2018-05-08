import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'


import CartActions from '../Redux/CartRedux'
import CartItemList from '../Components/CartItemList'
import styles from './Styles/ItemDetailsScreenStyles'

class CartScreen extends Component {
  componentDidMount () {
    this.props.populateCart()
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <CartItemList />
          <View style={styles.centered}>
            <TouchableOpacity style={styles.button} onPress={this.props.placeOrder.bind(this)}>
              <Text style={styles.buttonText}>RESERVE ITEMS</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  populateCart: () => dispatch(CartActions.populate()),
  clearCart: () => dispatch(CartActions.clear()),
  placeOrder: () => dispatch(CartActions.order())
})

export default connect(null, mapDispatchToProps)(CartScreen)
