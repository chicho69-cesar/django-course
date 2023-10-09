import axios from 'axios'

import * as constants from '../constants/blog'
import { API_URL } from '../constants/config'

export function updateBlogAction(blog) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.BLOG_UPDATE_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.put(
        `${API_URL}/blogs/update/${blog.id}/`, blog, config
      )

      dispatch({
        type: constants.BLOG_UPDATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: constants.BLOG_DETAILS_REQUEST,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: constants.BLOG_UPDATE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function deleteBlogAction(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.BLOG_DELETE_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      /* const { data } =  */await axios.delete(
        `${API_URL}/blogs/delete/${id}`, config
      )

      dispatch({
        type: constants.BLOG_DELETE_SUCCESS
      })
    } catch (error) {
      dispatch({
        type: constants.BLOG_DELETE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function createBlogComment(id, text) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.BLOG_CREATE_COMMENT_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post(
        `${API_URL}/blogs/comment/${id}/`, text, config
      )

      dispatch({
        type: constants.BLOG_CREATE_COMMENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constants.BLOG_CREATE_COMMENT_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function blogActionDetails(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: constants.BLOG_DETAILS_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.get(`${API_URL}/blogs/get/${id}/`, config);

      dispatch({
        type: constants.BLOG_DETAILS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: constants.BLOG_DETAILS_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })

    }
  }
}

export function createBlogAction(body) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.BLOG_CREATE_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post(
        `${API_URL}/blogs/create/`,
        { 'body': body },
        config
      )

      dispatch({
        type: constants.BLOG_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: constants.BLOG_CREATE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}

export function listBlogs() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: constants.BLOG_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.get(`${API_URL}/blogs/get/`, config);

      dispatch({
        type: constants.BLOG_LIST_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: constants.BLOG_LIST_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }
}
