import {
  GET_BALANCE_REQUEST,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAIL,

  GET_QRCODE_REQUEST,
  GET_QRCODE_SUCCESS,
  GET_QRCODE_FAIL,
} from '../constants'

import apiServer from '../api'
import { 
  displayMsg,
} from '../utils/toast'

// Get account balance
export const getBalance = (userId) => async (dispatch) => {
  dispatch({
    type: GET_BALANCE_REQUEST,
  });
  try {
    const res = await apiServer.get('/dexarbitrage/balances/'+userId);
    dispatch({
      type: GET_BALANCE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_BALANCE_FAIL
    });
  }
};

// Get user qrcode
export const getQRcode = ({
  userId,
}) => async (dispatch) => {
  dispatch({
    type: GET_QRCODE_REQUEST,
  });
  try {
    const res = await apiServer.get('/dexarbitrage/qrcode/' + userId);
    dispatch({
      type: GET_QRCODE_SUCCESS,
      payload: res.data.data.qr,
    });
  } catch (err) {
    if(!err) 
      return;
    dispatch({
      type: GET_QRCODE_FAIL,
      payload: err.response.data
    });
  }
};