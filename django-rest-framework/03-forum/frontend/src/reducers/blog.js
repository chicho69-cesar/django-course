import * as constants from '../constants/blog'

export function blogUpdateReducer(state = { blog: {} }, action) {
  const { type, payload } = action

  switch (type) {
    case constants.BLOG_UPDATE_REQUEST: {
      return { loading: true }
    }

    case constants.BLOG_UPDATE_SUCCESS: {
      return { loading: false, success: true, blog: payload }
    }

    case constants.BLOG_UPDATE_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.BLOG_UPDATE_RESET: {
      return { blog: {} }
    }

    default: 
      return state
  }
}

export function blogDeleteReducer(state = {}, action) {
  const { type, payload } = action

  switch (type) {
    case constants.BLOG_DELETE_REQUEST: {
      return { loading: true }
    }

    case constants.BLOG_DELETE_SUCCESS: {
      return { loading: false, success: true }
    }

    case constants.BLOG_DELETE_FAIL: {
      return { loading: false, error: payload }
    }

    default:
      return state
  }
}

export function createCommentReducer(state = {}, action) {
  const { type, payload } = action

  switch (type) {
    case constants.BLOG_CREATE_COMMENT_REQUEST: {
      return { loading: true }
    }

    case constants.BLOG_CREATE_COMMENT_SUCCESS: {
      return { loading: false, success: true }
    }

    case constants.BLOG_CREATE_COMMENT_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.BLOG_CREATE_COMMENT_RESET: {
      return { blog: {} }
    }

    default:
      return state
  }
}

export function blogDetailsReducer(state = { blog: [] }, action) {
  const { type, payload } = action

  switch (type) {
    case constants.BLOG_DETAILS_REQUEST: {
      return { loading: true, ...state }
    }

    case constants.BLOG_DETAILS_SUCCESS: {
      return { loading: false, blog: payload }
    }

    case constants.BLOG_DETAILS_FAIL: {
      return { loading: false, error: payload }
    }

    default:
      return state
  }
}

export function blogCreateReducer(state = {}, action) {
  const { type, payload } = action

  switch (type) {
    case constants.BLOG_CREATE_REQUEST: {
      return { loading: true }
    }

    case constants.BLOG_CREATE_SUCCESS: {
      return { loading: false, success: true, blog: payload }
    }

    case constants.BLOG_CREATE_FAIL: {
      return { loading: false, error: payload }
    }

    default:
      return state
  }
}

export function blogListReducer(state = { blogs: [] }, action) {
  const { type, payload } = action

  switch (type) {
    case constants.BLOG_LIST_REQUEST: {
      return { loading: true, blogs: [] }
    }

    case constants.BLOG_LIST_SUCCESS: {
      return { loading: false, blogs: payload }
    }

    case constants.BLOG_LIST_FAIL: {
      return { loading: false, error: payload }
    }

    default:
      return state
  }
}
