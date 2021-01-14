
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

import thunk from 'redux-thunk'

const combinedStore = combineReducers({
  anecdote: reducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(
  combinedStore,
  applyMiddleware(thunk),
  composeWithDevTools(),
)


store.subscribe(() => console.log(store.getState()))

export default store