import { createReducer, createActions } from 'reduxsauce'
import { calculateRegion } from '../Lib/MapHelpers'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderRequest: ['order_id'],
  orderCancel: ['vendor_order_id'],
  orderSuccess: ['order'],
  orderFailure: null,
  orderListRequest: null,
  orderListSuccess: ['orders'],
  orderListFailure: null
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  selected_order: null,
  orders: [],
  error: null
})

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ fetching: true, payload: null })

export const cancel = (state) =>
  state.merge({ fetching: true })

export const success = (state, action) => {
  const { order } = action
  return state.merge({ fetching: false, error: null, selected_order: order })
}

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const listRequest = (state) =>
  state.merge({ fetching: true })

export const listSuccess = (state, action) => {
  const { orders } = action
  return state.merge({ fetching: false, error: null, orders })
}

export const listFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_REQUEST]: request,
  [Types.ORDER_CANCEL]: cancel,
  [Types.ORDER_SUCCESS]: success,
  [Types.ORDER_FAILURE]: failure,
  [Types.ORDER_LIST_REQUEST]: listRequest,
  [Types.ORDER_LIST_SUCCESS]: listSuccess,
  [Types.ORDER_LIST_FAILURE]: listFailure
})
