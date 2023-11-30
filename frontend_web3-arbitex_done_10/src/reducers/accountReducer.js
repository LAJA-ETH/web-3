import {
  GET_BALANCE_REQUEST,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAIL,

  GET_QRCODE_REQUEST,
  GET_QRCODE_SUCCESS,
  GET_QRCODE_FAIL,
} from '../constants'

const initialState = {
  balance: null,
  qrcode: {
    url: null,
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_BALANCE_SUCCESS:
      return {
        ...state,
        balance: 0,
        loading: false,
      }
    case GET_BALANCE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GET_QRCODE_REQUEST:
      return {
        ...state,
        qrcode: {
          ...state.qrcode,
          loading: true
        }
      }
    case GET_QRCODE_SUCCESS:
      return {
        ...state,
        qrcode: {
          ...state.qrcode,
          url: action.payload,
          loading: false,
        }
      }
    case GET_QRCODE_REQUEST:
      return {
        ...state,
        qrcode: {
          ...state.qrcode,
          error: action.payload,
          loading: false,
        }
      }
    default:
      return state;
  }
}

export default accountReducer;