import axios from 'axios'

import * as constants from '../constants/user'
import { API_URL } from '../constants/config'

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
        `${API_URL}/users/update-user/`, user, config
      )

      dispatch({
        type: constants.USER_EDIT_SUCCESS,
        payload: data
      })

      dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: data
      })

      localStorage.setItem('03_forum_userInfo', JSON.stringify(data))
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
        `${API_URL}/users/user-info/${id}/`,
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
        `${API_URL}/users/users-list/`,
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
    localStorage.removeItem('03_forum_userInfo')
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
        `${API_URL}/users/register/`,
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

      localStorage.setItem('03_forum_userInfo', JSON.stringify(data))
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
        `${API_URL}/users/login/`,
        { 'email': email, 'password': password }, config
      )

      dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: data
      })

      localStorage.setItem('03_forum_userInfo', JSON.stringify(data))
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
