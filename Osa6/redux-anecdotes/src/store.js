
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combinedStore = combineReducers({
  anecdote: reducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(
  combinedStore,
  composeWithDevTools(),
  applyMiddleware(thunk)
)


store.subscribe(() => console.log(store.getState()))

export default store