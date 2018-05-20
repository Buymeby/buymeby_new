import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Title, View, Button, Divider, Text, Row, Image, Subtitle, Caption } from '@shoutem/ui'

import OrderActions from '../Redux/OrderRedux'
import styles from './Styles/ScreenStyles'
import LoadingSpinner from '../Components/LoadingSpinner'
import CenteredButton from '../Components/CenteredButton'

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
                <View>
                  <Row styleName="small">
                    <View styleName="horizontal space-between">
                      <Title>{vendor_order.vendor_name}</Title>
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
                            <Subtitle styleName="md-gutter-right">${item.total_cost}</Subtitle>
                          </View>
                          <View styleName="horizontal">
                            <Caption>Quantity: {item.quantity} x </Caption>
                            <Caption>${item.total_cost}</Caption>
                          </View>
                        </View>
                      </Row>
                    ))
                  }
                  <Divider styleName="line" />
                  <Row>
                    <View styleName="horizontal space-between">
                      <Title>Total</Title>
                      <Title styleName="right">{'$' + vendor_order.total_amount}</Title>
                    </View>
                  </Row>
                  <Divider styleName="line" />
                </View>
                {
                  vendor_order.status == 'RESERVED' && (<CenteredButton onPress={this.props.cancelOrder.bind(this, vendor_order.id)} text={'CANCEL'}/>)
                }
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
  cancelOrder: (vendor_order_id) => dispatch(OrderActions.orderCancel(vendor_order_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)
