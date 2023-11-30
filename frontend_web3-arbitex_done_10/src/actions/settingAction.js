import {
  SET_MODE_REQUEST,
  SET_MODE_SUCCESS,
  SET_MODE_FAIL,

  GET_COMPANY_ACCOUNT_REQUEST,
  GET_COMPANY_ACCOUNT_SUCCESS,
  GET_COMPANY_ACCOUNT_FAIL,
} from '../constants'

import apiServer from '../api'
import { 
  displayDate,
} from '../utils'
import { 
  displayMsg,
} from '../utils/toast'
import setAuthToken from '../utils/setAuthToken';

export function setModeSuccess(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_MODE_SUCCESS,
      payload,
    })
  }
}

export function setModeFail(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_MODE_FAIL,
      payload
    })
  }
}

export function setModeRequest(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_MODE_REQUEST
    });

    apiServer
      .put('/users/makeautomode/'+payload.id,
        payload
      )
      .then(res => {
        dispatch({
          type: SET_MODE_SUCCESS,
          payload: {
            mode: res.data.data.status,
            deadline: res.data.data.timeline,
          },
        }); 
        if(res.data.data.status) {
          displayMsg(`Your auto click service is activated until ${displayDate(res.data.data.timeline)}`);
        } else {
          displayMsg('Sorry! the server can not activate your service. \n Please double-check your available balance.', 'error');
        }
      })
      .catch(err => {        
        if(!err.details) 
          displayMsg(err.message, 'error');
          setModeFail(payload)
      })
  };
}

export function getCompanyAccount(payload) {
  return (dispatch) => {
    dispatch({
      type: GET_COMPANY_ACCOUNT_REQUEST
    });

    apiServer
      .get('/users/company')
      .then(res => {
        dispatch({
          type: GET_COMPANY_ACCOUNT_SUCCESS,
          payload: res.data.data.id,
        });
      })
      .catch(err => {        
        if(!err.details)
          displayMsg(err.message, 'error');
          dispatch({
            type: GET_COMPANY_ACCOUNT_FAIL,
          });
      })
  };
}
