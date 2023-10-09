import axios from 'axios'
import * as constants from '../constants/user'

export function editUser(user) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: constants.USER_EDIT_REQUEST })
      dispatch({ type: constants.USER_SOLO_RESET })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.put(
        'http://127.0.0.1:8000/users/put/', user, config
      )

      dispatch({
        type: constants.USER_EDIT_SUCCESS,
        payload: data
      })

      dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: constants.USER_EDIT_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function getSoloUser(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: constants.USER_SOLO_REQUEST })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.get(
        `http://127.0.0.1:8000/users/${id}/`,
        config
      )

      dispatch({
        type: constants.USER_SOLO_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: constants.USER_SOLO_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function getListUsers() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: constants.USER_LIST_REQUEST })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.get(
        `http://127.0.0.1:8000/users/getUsers/`,
        config
      )

      dispatch({
        type: constants.USER_LIST_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: constants.USER_LIST_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: constants.USER_LOGOUT })
  }
}

export function register(user_name, email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: constants.USER_REGISTER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post(
        'http://127.0.0.1:8000/users/register/',
        { 'user_name': user_name, 'email': email, 'password': password }, config
      )

      dispatch({
        type: constants.USER_REGISTER_SUCCESS,
        payload: data
      })

      dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: constants.USER_REGISTER_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: constants.USER_LOGIN_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post(
        'http://127.0.0.1:8000/users/login/',
        { 'email': email, 'password': password }, config
      )

      dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: constants.USER_LOGIN_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}
