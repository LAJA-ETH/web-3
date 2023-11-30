import {
  SET_MODE_REQUEST,
  SET_MODE_SUCCESS,
  SET_MODE_FAIL,

  GET_COMPANY_ACCOUNT_REQUEST,
  GET_COMPANY_ACCOUNT_SUCCESS,
  GET_COMPANY_ACCOUNT_FAIL,
} from '../constants'

const initialState = {
  mode: false,
  deadline: null,
  loading: false,
  error: null,
  company: 1,
}

function settingReducer(state = initialState, action) {
  switch (action.type) {
      case SET_MODE_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case SET_MODE_SUCCESS:
        return {
          ...state,
          ...action.payload,
          loading: false,
        }
      case SET_MODE_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      case GET_COMPANY_ACCOUNT_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case GET_COMPANY_ACCOUNT_SUCCESS:
        return {
          ...state,
          company: action.payload,
          loading: false,
        }
      case GET_COMPANY_ACCOUNT_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      default:
          return state;
  }
}

export default settingReducer;