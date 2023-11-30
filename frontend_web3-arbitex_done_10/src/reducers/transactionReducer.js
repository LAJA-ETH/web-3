import {
  GET_DEPOSIT_TRANSATION_REQUEST,
  GET_DEPOSIT_TRANSATION_SUCCESS,
  GET_DEPOSIT_TRANSATION_FAIL,

  CREATE_DEPOSIT_FUNDS_REQUEST,
  CREATE_DEPOSIT_FUNDS_SUCCESS,
  CREATE_DEPOSIT_FUNDS_FAIL,

  CREATE_WITHDRAW_FUNDS_REQUEST,
  CREATE_WITHDRAW_FUNDS_SUCCESS,
  CREATE_WITHDRAW_FUNDS_FAIL,

  GET_DEPOSIT_HISTORY_REQUEST,
  GET_DEPOSIT_HISTORY_SUCCESS,
  GET_DEPOSIT_HISTORY_FAIL,

  GET_WITHDRAW_HISTORY_REQUEST,
  GET_WITHDRAW_HISTORY_SUCCESS,
  GET_WITHDRAW_HISTORY_FAIL,

  GET_ARBITRAGE_DETAILS_REQUEST,
  GET_ARBITRAGE_DETAILS_SUCCESS,
  GET_ARBITRAGE_DETAILS_FAIL,

  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from '../constants'

const initialState = {
  depositFunds: {
    address: '',
    loading: false,
    error: null,
  },
  
  withdrawFunds: {
    address: '',
    loading: false,
    error: null,
  },

  depositHistory: {
    models: [],
    pagination: {
      page: 1,
      pageSize: 10,
      rowCount: 0,
      pageCount: 0,
    },
    loading: false,
    error: null,
  },

  withdrawHistory: {
    models: [],
    pagination: {
      page: 1,
      pageSize: 10,
      rowCount: 0,
      pageCount: 0,
    },
    loading: false,
    error: null,
  },

  arbitrageDetails: {
    models: [],
    pagination: {
      page: 1,
      pageSize: 10,
      rowCount: 0,
      pageCount: 0,
    },
    loading: false,
    error: null,
  },

  order: {
    data: null,
    loading: false,
    error: null,
  },

  depositTransactions: {
    models: [],
    pagination: {
      page: 1,
      pageSize: 10,
      rowCount: 0,
      pageCount: 0,
    }
  },
  loading: false,
  error: null,
}

function transactionReducer(state = initialState, action) {
  switch (action.type) {
      case GET_DEPOSIT_TRANSATION_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case GET_DEPOSIT_TRANSATION_SUCCESS:
        return {
          ...state,
          depositTransactions: action.payload.data,
          loading: false,
        }
      case GET_DEPOSIT_TRANSATION_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      case CREATE_DEPOSIT_FUNDS_REQUEST:
        return {
          ...state,
          depositFunds: {
            ...state.depositFunds,
            loading: true,
          }
        }
      case CREATE_DEPOSIT_FUNDS_SUCCESS:
        return {
          ...state,
          depositFunds: {
            ...state.depositFunds,
            address: action.payload,
            loading: false,
          }
        }
      case CREATE_DEPOSIT_FUNDS_FAIL:
        return {
          ...state,
          depositFunds: {
            ...state.depositFunds,
            error: action.payload,
            loading: false,
          }
        }
      case CREATE_WITHDRAW_FUNDS_REQUEST:
        return {
          ...state,
          withdrawFunds: {
            ...state.withdrawFunds,
            loading: true,
          }
        }
      case CREATE_WITHDRAW_FUNDS_SUCCESS:
        return {
          ...state,
          withdrawFunds: {
            ...state.withdrawFunds,
            address: action.payload,
            loading: false,
          }
        }
      case CREATE_WITHDRAW_FUNDS_FAIL:
        return {
          ...state,
          withdrawFunds: {
            ...state.withdrawFunds,
            error: action.payload,
            loading: false,
          }
        }
      case GET_DEPOSIT_HISTORY_REQUEST:
        return {
          ...state,
          depositHistory: {
            ...state.depositHistory,
            loading: true,
          }
        }
      case GET_DEPOSIT_HISTORY_SUCCESS:
        return {
          ...state,
          depositHistory: {
            ...state.depositHistory,
            models: action.payload,
            //pagination: action.payload.pagination,
            loading: false,
          }
        }
      case GET_DEPOSIT_HISTORY_FAIL:
        return {
          ...state,
          depositHistory: {
            ...state.depositHistory,
            error: action.payload,
            loading: false,
          }
        }
      case GET_WITHDRAW_HISTORY_REQUEST:
        return {
          ...state,
          withdrawHistory: {
            ...state.withdrawHistory,
            loading: true,
          }
        }
      case GET_WITHDRAW_HISTORY_SUCCESS:
        return {
          ...state,
          withdrawHistory: {
            ...state.withdrawHistory,
            models: action.payload.models,
            pagination: action.payload.pagination,
            loading: false,
          }
        }
      case GET_WITHDRAW_HISTORY_FAIL:
        return {
          ...state,
          withdrawHistory: {
            ...state.withdrawHistory,
            error: action.payload,
            loading: false,
          }
        }
      case GET_ARBITRAGE_DETAILS_REQUEST:
        return {
          ...state,
          arbitrageDetails: {
            ...state.arbitrageDetails,
            loading: true,
          }
        }
      case GET_ARBITRAGE_DETAILS_SUCCESS:
        return {
          ...state,
          arbitrageDetails: {
            ...state.arbitrageDetails,
            models: action.payload.models,
            pagination: action.payload.pagination,
            loading: false,
          }
        }
      case GET_ARBITRAGE_DETAILS_FAIL:
        return {
          ...state,
          arbitrageDetails: {
            ...state.arbitrageDetails,
            error: action.payload,
            loading: false,
          }
        }
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          order: {
            ...state.order,
            loading: true,
          }
        }
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          order: {
            ...state.order,
            data: action.payload,
            loading: false,
          }
        }
      case CREATE_ORDER_FAIL:
        return {
          ...state,
          order: {
            ...state.order,
            error: action.payload,
            loading: false,
          }
        }
      default:
        return state;
  }
}

export default transactionReducer;