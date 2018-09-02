import apisauce from 'apisauce'
import { NativeModules } from 'react-native'

let scriptHostname;
if (__DEV__) {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

// const create = (baseURL = 'http://10.0.2.2:3000/api/') => {
// const create = (baseURL = 'http://localhost:3000/api/') => {
// const create = (baseURL = 'https://buymeby-dev.cfapps.io/api/') => {
// const create = (baseURL = 'https://buymeby-prod.cfapps.io/api/') => {
const create = (baseURL = `http://${scriptHostname}:3000/api/`) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const getVendors = () => api.get('vendors')
  const getVendor = (vendor) => api.get('vendors/' + vendor.id)
  const blockVendor = (vendor) => api.post('vendors/' + vendor.id + '/block')

  const getOrders = () => api.get('user_orders')
  const getOrder = (order_id) => api.get('user_orders/' + order_id)
  const cancelOrder = (vendor_order_id) => api.put('user_orders/' + vendor_order_id + '/cancel')

  const populateCart = (cart) => api.post('populate_cart', cart)
  const placeOrder = (cart) => api.post('place_order', cart)

  const registerUser = (userAttributes) => api.post('auth', userAttributes)
  const loginUser = (credentials) => api.post('auth/sign_in', credentials)
  const verifyToken = (tokenParams) => api.get('auth/validate_token', tokenParams)
  const registerDevice = (token) => api.post('push', token)

  const config = api
  return {
    getRoot,
    getRate,
    getUser,
    getVendors,
    getVendor,
    blockVendor,
    getOrders,
    getOrder,
    registerUser,
    loginUser,
    verifyToken,
    registerDevice,
    populateCart,
    placeOrder,
    cancelOrder,
    config
  }
}

export default {
  create
}
