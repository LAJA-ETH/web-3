import {
  GET_REFERRAL_INFO_REQUEST,
  GET_REFERRAL_INFO_SUCCESS,
  GET_REFERRAL_INFO_FAIL,

  GET_REFERRAL_USERS_REQUEST,
  GET_REFERRAL_USERS_SUCCESS,
  GET_REFERRAL_USERS_FAIL,

  GET_REFERRAL_TRANSACTIONS_REQUEST,
  GET_REFERRAL_TRANSACTIONS_SUCCESS,
  GET_REFERRAL_TRANSACTIONS_FAIL,
} from '../constants'

const initialState = {
  info: {
    data: {
      allpartners: 0,
      totalearnedfrompartner: 0,
      receivedamount: 0,
      activeusercount: 0,
    },
    loading: false,
    error: null,
  },
  users: {
    data: [],
    loading: false,
    error: null,
  },
  transactions: {
    data: [],
    loading: false,
    error: null,
  },
}

function referralReducer(state = initialState, action) {
  switch (action.type) {
      case GET_REFERRAL_INFO_REQUEST:
        return {
          ...state,
          info: {
            ...state.info,
            loading: true,
          }
        };
      case GET_REFERRAL_INFO_SUCCESS:
        return {
          ...state,
          info: {
            ...state.info,
            loading: false,
            data: action.payload,
          }
        };
      case GET_REFERRAL_INFO_FAIL:
        return {
          ...state,
          info: {
            ...state.info,
            loading: false,
            error: action.payload,
          }
        };
      case GET_REFERRAL_USERS_REQUEST:
        return {
          ...state,
          users: {
            ...state.users,
            loading: true,
          }
        };
      case GET_REFERRAL_USERS_SUCCESS:
        return {
          ...state,
          users: {
            ...state.users,
            loading: false,
            data: action.payload,
          }
        };
      case GET_REFERRAL_USERS_FAIL:
        return {
          ...state,
          users: {
            ...state.users,
            loading: false,
            error: action.payload,
          }
        };
      case GET_REFERRAL_TRANSACTIONS_REQUEST:
        return {
          ...state,
          transactions: {
            ...state.transactions,
            loading: true,
          }
        };
      case GET_REFERRAL_TRANSACTIONS_SUCCESS:
        return {
          ...state,
          transactions: {
            ...state.transactions,
            loading: false,
            data: action.payload,
          }
        };
      case GET_REFERRAL_TRANSACTIONS_FAIL:
        return {
          ...state,
          transactions: {
            ...state.transactions,
            loading: false,
            error: action.payload,
          }
        };
      default:
        return state;
  }
}

export default referralReducer;