import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogUpdateReducer,
  createCommentReducer,
} from '../reducers/blog'
import {
  userEditReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userSoloReducer,
} from '../reducers/user'

const reducer = combineReducers({
  // User stuff
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userSolo: userSoloReducer,
  userList: userListReducer,
  userEdit: userEditReducer,

  // Blog stuff
  blogList: blogListReducer,
  soloBlog: blogDetailsReducer,
  blogCreate: blogCreateReducer,
  updateBlog: blogUpdateReducer,
  deleteBlog: blogDeleteReducer,
  commentBlog: createCommentReducer,
})

const userInfoStorage = window.localStorage.getItem('03_forum_userInfo')
  ? JSON.parse(window.localStorage.getItem('03_forum_userInfo'))
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
