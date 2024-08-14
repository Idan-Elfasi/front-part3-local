import { combineReducers, compose, legacy_createStore as createStore, } from 'redux'
import { toyReducer } from './reducers/toy.reducer.js'
import { userreducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({

  toyModule: toyReducer,
  userModule:userreducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
