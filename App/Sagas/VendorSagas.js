import { call, put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import VendorActions from '../Redux/VendorRedux'
import { path } from 'ramda'
import Toast from 'react-native-simple-toast'

export function * getVendor (api, action) {
  const { vendor } = action
  // make the call to the api
  const response = yield call(api.getVendor, vendor)

  // success?
  if (response.ok) {
    yield put(VendorActions.vendorSuccess(response.data))
  } else {
    yield put(VendorActions.vendorFailure())
  }
}

export function * getVendorList (api) {

  const response = yield call(api.getVendors)

  if (response.ok) {
    const vendors = path(['data'], response)
    yield put(VendorActions.vendorListSuccess(vendors))
  } else {
    yield put(VendorActions.vendorListFailure())
    return
  }
}

export function * blockVendor (api, action) {
  const { vendor } = action
  // make the call to the api
  const response = yield call(api.blockVendor, vendor)

  // success?
  if (response.ok) {
    Toast.show('Succesfully flagged')
    yield put(VendorActions.blockSuccess())
    yield put(NavigationActions.navigate({ routeName: 'DiscoveryMapScreen' }))
  } else {
    yield put(VendorActions.vendorFailure())
  }
}
