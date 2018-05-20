import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
import { path } from 'ramda'
import Toast from 'react-native-simple-toast'

export function * getOrder (api, action) {
  const { order_id } = action
  // make the call to the api
  const response = yield call(api.getOrder, order_id)

  // success?
  if (response.ok) {
    yield put(OrderActions.orderSuccess(response.data))
  } else {
    yield put(OrderActions.orderFailure())
  }
}

export function * getOrderList (api) {
  const response = yield call(api.getOrders)

  if (response.ok) {
    const orders = path(['data'], response)
    yield put(OrderActions.orderListSuccess(orders.reverse()))
  } else {
    yield put(OrderActions.orderListFailure())
  }
}

export function * cancelOrder (api, action) {
  const { vendor_order_id } = action
  const response = yield call(api.cancelOrder, vendor_order_id)

  if (response.ok) {
    yield put(OrderActions.orderSuccess(response.data))
    Toast.show('Order cancelled!');
  } else {
    yield put(OrderActions.orderFailure())
    Toast.show('There was an issue cancelling your order, please try again.');
  }
}
