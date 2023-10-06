import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

/* TODO: Import the blog and users reducers and user for the reducer */

const reducer = combineReducers({})

const userInfoStorage = window.localStorage.getItem('03_forum_userInfo')
  ? JSON.parse(window.localStorage.getItem('03_forum_userInfo') as string)
  : {}

const initialState = {
  userLogin: {
    userInfo: userInfoStorage
  }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
