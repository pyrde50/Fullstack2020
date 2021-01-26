
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'

import thunk from 'redux-thunk'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const combinedStore = combineReducers({
  notification: notificationReducer,
  errorNotification: errorNotificationReducer,
  blogReducer: blogReducer,
  login: loginReducer,
  user: userReducer
})

const store = createStore(
  combinedStore,
  applyMiddleware(thunk),
  composeWithDevTools(),
)


store.subscribe(() => console.log(store.getState()))

export default store