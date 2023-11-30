import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,

  GET_PLATFORM_REQUEST,
  GET_PLATFORM_SUCCESS,
  GET_PLATFORM_FAIL,

  GET_PROFITS_REQUEST,
  GET_PROFITS_SUCCESS,
  GET_PROFITS_FAIL,

  GET_WITHDRAWS_REQUEST,
  GET_WITHDRAWS_SUCCESS,
  GET_WITHDRAWS_FAIL,

  GET_COMPANY_BALANCE_REQUEST,
  GET_COMPANY_BALANCE_SUCCESS,
  GET_COMPANY_BALANCE_FAIL,
} from '../constants'

const initialState = {
  users: {
    data: [],
    loading: false,
    error: null,
  },
  platform: {
    data: {},
    loading: false,
    error: null,
  },
  profits: {
    data: {
      models: [],
      pagination: {

      },
    },
    loading: false,
    error: null,
  },
  withdraws: {
    data: {
      models: [],
      pagination: {

      },
    },
    loading: false,
    error: null,
  },
  companyBalance: 0,
}

function manageReducer(state = initialState, action) {
  switch (action.type) {
      case GET_USERS_REQUEST:
        return {
          ...state,
          users: {
            ...state.users,
            loading: true,
          }
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          users: {
            ...state.users,
            data: action.payload,
            loading: false,
          }
        };
      case GET_USERS_FAIL:
        return {
          ...state,
          users: {
            ...state.users,
            error: action.payload,
            loading: false,
          }
        };
      case GET_COMPANY_BALANCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_COMPANY_BALANCE_SUCCESS:
        return {
          ...state,
          companyBalance: action.payload,
        };
      case GET_COMPANY_BALANCE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case GET_PLATFORM_REQUEST:
        return {
          ...state,
          platform: {
            ...state.platform,
            loading: true,
          }
        };
      case GET_PLATFORM_SUCCESS:
        return {
          ...state,
          platform: {
            ...state.platform,
            data: action.payload,
            loading: false,
          }
        };
      case GET_PLATFORM_FAIL:
        return {
          ...state,
          platform: {
            ...state.platform,
            error: action.payload,
            loading: false,
          }
        };
      case GET_PROFITS_REQUEST:
        return {
          ...state,
          profits: {
            ...state.profits,
            loading: true,
          }
        };
      case GET_PROFITS_SUCCESS:
        return {
          ...state,
          profits: {
            ...state.profits,
            data: action.payload,
            loading: false,
          }
        };
      case GET_PROFITS_FAIL:
        return {
          ...state,
          profits: {
            ...state.profits,
            error: action.payload,
            loading: false,
          }
        };
      case GET_WITHDRAWS_REQUEST:
        return {
          ...state,
          withdraws: {
            ...state.withdraws,
            loading: true,
          }
        };
      case GET_WITHDRAWS_SUCCESS:
        return {
          ...state,
          withdraws: {
            ...state.withdraws,
            data: action.payload,
            loading: false,
          }
        };
      case GET_WITHDRAWS_FAIL:
        return {
          ...state,
          withdraws: {
            ...state.withdraws,
            error: action.payload,
            loading: false,
          }
        };
      default:
        return state;
  }
}

export default manageReducer;