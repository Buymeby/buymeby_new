import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { reducer as formReducer } from 'redux-form'
import configureStore from './CreateStore'
import ReduxPersist from '../Config/ReduxPersist'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  // cart: require('./CartRedux').reducer,
  startup: require('./StartupRedux').reducer,
  vendor: require('./VendorRedux').reducer,
  // order: require('./OrderRedux').reducer,
  form: formReducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
