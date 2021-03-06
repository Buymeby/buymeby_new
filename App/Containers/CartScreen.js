import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import CartActions from '../Redux/CartRedux'
import CartItemList from '../Components/CartItemList'
import LoadingSpinner from '../Components/LoadingSpinner'
import styles from './Styles/ItemDetailsScreenStyles'

class CartScreen extends Component {
  componentDidMount () {
    this.props.populateCart()
  }

  render () {
    const fetching = this.props.fetching

    if (fetching) {
      return (
        <View style={styles.mainContainer}>
          <LoadingSpinner />
        </View>
      )
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <CartItemList />
            {
              !(!this.props.cart || !this.props.populated_cart || this.props.emptyCart) &&
              <View style={styles.centered}>
                <Text style={styles.cautionText}>Before reserving these items, please make sure that you will be able to pick them up by the end of the day before closing!</Text>
                <TouchableOpacity style={styles.button} onPress={this.props.placeOrder.bind(this)}>
                  <Text style={styles.buttonText}>RESERVE ITEMS</Text>
                </TouchableOpacity>
              </View>
            }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    populated_cart: state.cart.populated_cart,
    cart: state.cart.cart,
    emptyCart: state.cart.emptyCart,
    fetching: state.cart.fetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  populateCart: () => dispatch(CartActions.populate()),
  clearCart: () => dispatch(CartActions.clear()),
  placeOrder: () => dispatch(CartActions.order())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)
