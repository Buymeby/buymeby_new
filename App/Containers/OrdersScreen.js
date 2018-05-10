import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  Divider,
  TouchableOpacity,
  Image,
  Subtitle,
  View,
  Caption,
  Row,
  Title,
  Text
} from '@shoutem/ui';

import OrderActions from '../Redux/OrderRedux'
import Chevron from '../Components/Chevron'
import LoadingSpinner from '../Components/LoadingSpinner'
import styles from './Styles/ItemDetailsScreenStyles'

class OrdersScreen extends Component {
  componentDidMount() {
    this.props.getOrderList()
  }

  render () {
    const orders = this.props.orders;
    const fetching = this.props.fetching;

    if (fetching) {
      return (
        <ScrollView style={styles.mainContainer}>
          <LoadingSpinner />
        </ScrollView>
      )
    }

    return (
      <View>
        <ScrollView>
        {
          orders.map((order) => (
            <TouchableOpacity key={order.id} onPress={this.props.openOrderDetails.bind(this, order)}>
              <Row>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri: order.image_src || " " }}
                />
                <View styleName="vertical stretch space-between">
                  <Subtitle>{order.name}</Subtitle>
                  <Caption>Total: {order.total_description}</Caption>
                  <View styleName="horizontal">
                    <Caption>0.8 miles away | </Caption>
                    <Caption>{order.created_description}</Caption>
                  </View>
                </View>
                <Chevron />
              </Row>
            </TouchableOpacity>
          ))
        }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    fetching: state.order.fetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderList: () => dispatch(OrderActions.orderListRequest()),
  openOrderDetails: (order) => {
    dispatch(OrderActions.orderRequest(order.id))
    dispatch(NavigationActions.navigate({ routeName: 'OrderDetailsScreen', params: { order: order }}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen)
