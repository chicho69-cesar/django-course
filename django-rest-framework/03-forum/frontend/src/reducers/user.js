import * as constants from '../constants/user'

export function userEditReducer(state = {}, action) {
  const { type, payload } = action
  
  switch (type) {
    case constants.USER_EDIT_REQUEST: {
      return { loading: true }
    }

    case constants.USER_EDIT_SUCCESS: {
      return { loading: false, success: true, userInfo: payload }
    }

    case constants.USER_EDIT_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.USER_EDIT_RESET: {
      return {}
    }

    default:
      return state
  }
}

export function userListReducer(state = { users: [] }, action) {
  const { type, payload } = action
  
  switch (type) {
    case constants.USER_LIST_REQUEST: {
      return { loading: true }
    }

    case constants.USER_LIST_SUCCESS: {
      return { loading: false, users: payload }
    }

    case constants.USER_LIST_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.USER_LIST_RESET: {
      return { users: [] }
    }

    default:
      return state
  }
}

export function userSoloReducer(state = { user: {} }, action) {
  const { type, payload } = action
  
  switch (type) {
    case constants.USER_SOLO_REQUEST: {
      return { ...state, loading: true }
    }

    case constants.USER_SOLO_SUCCESS: {
      return { loading: false, user: payload }
    }

    case constants.USER_SOLO_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.USER_SOLO_RESET: {
      return { user: {} }
    }

    default:
      return state
  }
}

export function userRegisterReducer(state = {}, action) {
  const { type, payload } = action
  
  switch (type) {
    case constants.USER_REGISTER_REQUEST: {
      return { loading: true }
    }

    case constants.USER_REGISTER_SUCCESS: {
      return { loading: false, userInfo: payload }
    }

    case constants.USER_REGISTER_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.USER_LOGOUT: {
      return {}
    }

    default:
      return state
  }
}

export function userLoginReducer(state = {}, action) {
  const { type, payload } = action
  
  switch (type) {
    case constants.USER_LOGIN_REQUEST: {
      return { loading: true }
    }

    case constants.USER_LOGIN_SUCCESS: {
      return { loading: false, userInfo: payload }
    }

    case constants.USER_LOGIN_FAIL: {
      return { loading: false, error: payload }
    }

    case constants.USER_LOGOUT: {
      return {}
    }

    default:
      return state
  }
}
