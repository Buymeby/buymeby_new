import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
import { path } from 'ramda'

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
    return
  }
}
