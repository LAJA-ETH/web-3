import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from '../constants'

const initialState = {
  loading: false,
  error: null,
}

function registerReducer(state = initialState, action) {
  switch (action.type) {
      case CREATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        }
      case CREATE_USER_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      default:
          return state;
  }
}

export default registerReducer;