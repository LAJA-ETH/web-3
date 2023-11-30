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

  GET_COMPANY_WITHDRAW_REQUEST,
  GET_COMPANY_WITHDRAW_SUCCESS,
  GET_COMPANY_WITHDRAW_FAIL,
} from '../constants'

import apiServer from '../api'
import { 
  displayMsg,
} from '../utils/toast'

// Get company withdraw
export const getCompanyWithdraw = (payload) => async (dispatch) => {
  dispatch({
    type: GET_COMPANY_WITHDRAW_REQUEST,
  });
  try {
    const res = await apiServer.post(`withdraws/`+payload.user_id, payload);
    const result = res.data.data;
    if(result) {
      displayMsg('Successfully withdrawed server in Thther Trader');
    } else {
      displayMsg('There are some problems with server operation.', 'error');
    }
  } catch (err) {
    displayMsg('There are some problems with server operation.', 'error');
  }
};

// Get company balance
export const getCompanyBalance = () => async (dispatch) => {
  dispatch({
    type: GET_COMPANY_BALANCE_REQUEST,
  });
  try {
    const res = await apiServer.get(`dexarbitrage/company`);
    dispatch({
      type: GET_COMPANY_BALANCE_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_COMPANY_BALANCE_FAIL
    });
  }
};
// Get users
export const getUsers = ({
  page = 1,
  pageSize = 10,
}) => async (dispatch) => {
  dispatch({
    type: GET_USERS_REQUEST,
  });
  try {
    const res = await apiServer.get(`users/admin?page=${page}&pageSize=${pageSize}`);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: res.data.data.models,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL
    });
  }
};

// Get platform
export const getPlatform = () => async (dispatch) => {
  dispatch({
    type: GET_PLATFORM_REQUEST,
  });
  try {
    const res = await apiServer.get(`statistics/byone`);
    dispatch({
      type: GET_PLATFORM_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PLATFORM_FAIL
    });
  }
};

// Get profits
export const getProfits = ({
  userId = 0,
  page = 1,
  pageSize = 10,
  order = 'DESC'
}) => async (dispatch) => {
  dispatch({
    type: GET_PROFITS_REQUEST,
  });
  try {
    const res = await apiServer.get(`deposits/${userId}?page=${page}&pageSize=${pageSize}&order=${order}`);
    dispatch({
      type: GET_PROFITS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFITS_FAIL
    });
  }
};

// Get withdraws
export const getWithdraws = ({
  userId = 16, // company
}) => async (dispatch) => {
  dispatch({
    type: GET_WITHDRAWS_REQUEST,
  });
  try {
    const res = await apiServer.get(`withdraws/${userId}`);
    dispatch({
      type: GET_WITHDRAWS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_WITHDRAWS_FAIL
    });
  }
};