import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Title, View, Button, Divider, Text, Row, Image, Subtitle, Caption } from '@shoutem/ui'

import CartActions from '../Redux/CartRedux'
import styles from './Styles/ScreenStyles'
import LoadingSpinner from '../Components/LoadingSpinner'

class OrderDetailsScreen extends Component {
  render () {
    const fetching = this.props.fetching
    const order_details = this.props.order_details

    if (fetching) {
      return (
        <View style={styles.mainContainer}>
          <LoadingSpinner />
        </View>
      )
    }

    return (
      <View>
        <ScrollView>
          {
            order_details.vendor_orders.map((vendor_order, i) => (
              <View key={vendor_order.id}>
                <Divider styleName="line" />
                <View>
                  <Row styleName="small">
                    <View styleName="horizontal space-between">
                      <Title>{vendor_order.name}</Title>
                      <Caption styleName="right">{vendor_order.status}</Caption>
                    </View>
                  </Row>
                    {
                      vendor_order.order_details.map((item, j) => (
                        <Row key={vendor_order.id + '-' + item.id}>
                          <Image
                            styleName="small rounded-corners"
                            source={{ uri: item.image_file_src }}
                          />
                          <View styleName="vertical stretch space-between">
                            <Subtitle>{item.name}</Subtitle>
                            <View styleName="horizontal">
                              <Caption styleName="line-through md-gutter-right">${item.price}</Caption>
                            </View>
                            <View styleName="horizontal">
                              <Caption>Quantity: {item.quantity} | </Caption>
                              <Caption>Total: ${item.total_cost}</Caption>
                            </View>
                          </View>
                        </Row>
                      ))
                    }
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    order_details: state.order.selected_order,
    fetching: state.order.fetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  completeOrder: () => dispatch({ type: 'NavigateBack' })
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)
