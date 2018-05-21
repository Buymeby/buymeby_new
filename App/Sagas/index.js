import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { VendorTypes } from '../Redux/VendorRedux'
import { OrderTypes } from '../Redux/OrderRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { CartTypes } from '../Redux/CartRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getVendor, getVendorList, blockVendor } from './VendorSagas'
import { getOrder, getOrderList, cancelOrder } from './OrderSagas'
import { register, login, verifyToken } from './AuthSagas'
import { initializeCart, addToCart, removeFromCart, clearCart, populateCart, placeOrder } from './CartSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup, api),

    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(AuthTypes.TOKEN_REQUEST, verifyToken, api),
    takeLatest(AuthTypes.REGISTRATION_REQUEST, register, api),

    takeLatest(CartTypes.INITIALIZE, initializeCart),
    takeLatest(CartTypes.POPULATE, populateCart, api),
    takeLatest(CartTypes.ORDER, placeOrder, api),
    takeLatest(CartTypes.ADD, addToCart),
    takeLatest(CartTypes.REMOVE, removeFromCart),
    takeLatest(CartTypes.CLEAR, clearCart),

    takeLatest(VendorTypes.VENDOR_LIST_REQUEST, getVendorList, api),
    takeLatest(VendorTypes.VENDOR_REQUEST, getVendor, api),
    takeLatest(VendorTypes.VENDOR_BLOCK, blockVendor, api),

    takeLatest(OrderTypes.ORDER_LIST_REQUEST, getOrderList, api),
    takeLatest(OrderTypes.ORDER_REQUEST, getOrder, api),
    takeLatest(OrderTypes.ORDER_CANCEL, cancelOrder, api)
  ])
}
