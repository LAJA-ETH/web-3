import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAIL,

  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,

  SET_CURRENT_USER,
} from '../constants'

const initialState = {
  user: localStorage.token ? JSON.parse(localStorage.token.toString()) : null,
  loading: false,
  error: null,
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        }
      case USER_LOGIN_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      case SET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case SET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        }
      case SET_PASSWORD_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      case SET_CURRENT_USER:
        return {
          ...state,
          user: action.payload,
        }
      case USER_LOADED:
        return state;
        break;
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          user: null,
        }
        break;
      default:
          return state;
  }
}

export default loginReducer;