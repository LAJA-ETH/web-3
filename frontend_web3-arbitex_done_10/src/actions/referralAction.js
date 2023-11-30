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

import apiServer from '../api'
import { 
  displayMsg,
} from '../utils/toast'

// Get referral info
export const getReferralInfo = (payload) => async (dispatch) => {
  dispatch({
    type: GET_REFERRAL_INFO_REQUEST,
  });
  try {
    const res = await apiServer.get('/dexarbitrage/referral');
    dispatch({
      type: GET_REFERRAL_INFO_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REFERRAL_INFO_FAIL
    });
  }
};

// Get referral users
export const getReferralUsers = (payload) => async (dispatch) => {
  dispatch({
    type: GET_REFERRAL_USERS_REQUEST,
  });
  try {
    const res = await apiServer.get('/dexarbitrage/referraluserlist');
    dispatch({
      type: GET_REFERRAL_USERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REFERRAL_USERS_FAIL
    });
  }
};

// Get referral transactions
export const getReferralTransactions = (payload) => async (dispatch) => {
  dispatch({
    type: GET_REFERRAL_TRANSACTIONS_REQUEST,
  });
  try {
    const res = await apiServer.get('/dexarbitrage/referraltransactions/');
    dispatch({
      type: GET_REFERRAL_TRANSACTIONS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REFERRAL_TRANSACTIONS_FAIL
    });
  }
};
