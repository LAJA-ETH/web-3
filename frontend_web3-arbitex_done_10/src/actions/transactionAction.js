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

import apiServer from '../api'
import { 
  displayMsg,
} from '../utils/toast'

// stop transactions
export const stopAutoTransaction = async (payload) => {
  return await apiServer.put('/deposits/stop/'+payload.id, {
    expiredtime:new Date()
  });
};

// Get deposit transactions
export const getDepositTransactions = ({
  userId,
  page = 0,
  pageSize = 10,
  order = 'DESC',
}) => async (dispatch) => {
  dispatch({
    type: GET_DEPOSIT_TRANSATION_REQUEST,
  });
  try {
    const res = await apiServer.get(`deposits/${userId}?page=${page}&pageSize=${pageSize}&order=${order}`);
    dispatch({
      type: GET_DEPOSIT_TRANSATION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_DEPOSIT_TRANSATION_FAIL
    });
  }
};

// Create deposit funds
export const createDepositFunds = ({
  amount,
  userId,
  currency = "ERC20USDT",
}) => async (dispatch) => {
  dispatch({
    type: CREATE_DEPOSIT_FUNDS_REQUEST,
  });
  try {
    const res = await apiServer.post(`/addfunds/${userId}`, {
      amount,
      user_id: userId,
      currency,
    });
    dispatch({
      type: CREATE_DEPOSIT_FUNDS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_DEPOSIT_FUNDS_FAIL
    });
  }
};


// Create withdraw funds
export const createWithdrawFunds = ({
  userId,
  amount,
  address,
  verifyToken,
  currency= "ERC20USDT",
  mode = false,
}) => async (dispatch) => {
  dispatch({
    type: CREATE_WITHDRAW_FUNDS_REQUEST,
  });
  try {
    const res = await apiServer.post(`/withdraws/${userId}`, {
      user_id: userId,
      amount,
      receiver: address,
      token2fa: verifyToken,
      currency,
      mode,
    });
    dispatch({
      type: CREATE_WITHDRAW_FUNDS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_WITHDRAW_FUNDS_FAIL,
      payload: err.message,
    });
  }
};

// Get deposit histories
export const getDepositHistory = ({
  userId,
  page = 1,
  pageSize = 10,
  order = 'DESC',
}) => async (dispatch) => {
  dispatch({
    type: GET_DEPOSIT_HISTORY_REQUEST,
  });
  try {
    const res = await apiServer.get(`/addfunds/${userId}?page=${page}&pageSize=${pageSize}&order=${order}`);
    dispatch({
      type: GET_DEPOSIT_HISTORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_DEPOSIT_HISTORY_FAIL,
      payload: err.message,
    });
  }
};


// Get withdraw histories
export const getWithdrawHistory = ({
  userId,
  page = 1,
  pageSize = 10,
  order = 'DESC',
}) => async (dispatch) => {
  dispatch({
    type: GET_WITHDRAW_HISTORY_REQUEST,
  });
  try {
    const res = await apiServer.get(`/withdraws/${userId}?page=${page}&pageSize=${pageSize}&order=${order}`);
    dispatch({
      type: GET_WITHDRAW_HISTORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_WITHDRAW_HISTORY_FAIL,
      payload: err.message,
    });
  }
};

// Get arbitrage details
export const getArbitrageDetails = ({
  userId,
  page = 1,
  pageSize = 10,
  order = 'DESC',
}) => async (dispatch) => {
  dispatch({
    type: GET_ARBITRAGE_DETAILS_REQUEST,
  });
  try {
    const res = await apiServer.get(`/deposits/${userId}?page=${page}&pageSize=${pageSize}&order=${order}`);
    dispatch({
      type: GET_ARBITRAGE_DETAILS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ARBITRAGE_DETAILS_FAIL,
      payload: err.message,
    });
  }
};

// Create order
export const createOrder = ({
  mode,
  userId,
  amount,
  currency,
  time,
  profit,
}) => async (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  try {
    const res = await apiServer.post(`/deposits/${userId}`, {
      user_id: userId,
      amount,
      currency,
      time,
      profit,
      mode,
    });
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: err.message,
    });
  }
};

// Get current mode
export const isAutoMode = async () => {
  return await apiServer.get(`/users/automodetimeline`);
}