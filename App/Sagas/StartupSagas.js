import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { path } from 'ramda'

export function * startup (api) {
  yield put(AuthActions.tokenRequest());
}
