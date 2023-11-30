import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,

  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAIL,

  SET_CURRENT_USER,

  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../constants'

import apiServer from '../api'
import {
  displayMsg,
} from '../utils/toast'
import setAuthToken from '../utils/setAuthToken';

export function setPassword(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_PASSWORD_REQUEST
    });

    apiServer
      .put('/users/' + payload.id,
        payload
      )
      .then(res => {
        displayMsg('Password updated');
        dispatch({
          type: SET_PASSWORD_SUCCESS,
          payload: res.data,
        })
      })
      .catch(err => {
        if (!err)
          displayMsg(err, 'error');
        dispatch({
          type: SET_PASSWORD_FAIL,
          payload: err || null,
        })
      })
  };
}

export function setCurrentUser(username) {
  return (dispatch) => {
    localStorage.setItem('token', JSON.stringify(username))
    dispatch({
      type: SET_CURRENT_USER,
      username,
    });
  };
}


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await apiServer.get('/users/2fa');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });

    setAuthToken()
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT
  });

  setAuthToken();
}

// export function userLoginRequest(payload) {
//   return (dispatch) => {
//     dispatch({
//       type: USER_LOGIN_REQUEST
//     });

//     apiServer
//       .post('/users/auth/signin',
//         payload
//       )
//       .then(res => {
//         localStorage.setItem('token', JSON.stringify(res.data))
//         setAuthToken(res.data.accessToken)
//         dispatch({
//           type: USER_LOGIN_SUCCESS,
//           payload: res.data,
//         })
//       })
//       .catch(err => {
//         if (!err)
//           displayMsg(err.message, 'error');

//         dispatch({
//           type: USER_LOGIN_FAIL,
//           payload: err || null,
//         })
//       })
//   };
// }

// export function userRegisterRequest(user, password) {
//   return (dispatch) => {
//     dispatch({
//       type: CREATE_USER_REQUEST
//     });

//     apiServer
//       .post('/register/',
//         user, password
//       )
//       .then(res => {
//         dispatch({
//           type: CREATE_USER_SUCCESS,
//         })
//         displayMsg('New user registered');
//         // window.location.href = '/login';
//       })
//       .catch(err => {
//         if (!err)
//           displayMsg(err, 'error');

//         dispatch({
//           type: CREATE_USER_FAIL,
//           payload: err || null,
//         })
//       })
//   };
// }

export const userRegisterRequest = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = { 'user': username, 'passwd': password };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_SERVER}register/`, body);

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: res.data
    });

    window.location.href = '/login'

    // return console.log('True');
  } catch (err) {
    dispatch({
      type: CREATE_USER_FAIL
    })
  }
};

export const userLoginRequest = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = { 'user': username, 'passwd': password };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_SERVER}login/`, body);


    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: res.data
    });

    if (await res.data === true) {
      localStorage.setItem('token', JSON.stringify(username))

      return window.location.href = '/dashboard'
    } else {
      displayMsg('Please make sure that the credentials are correct or make sure you have an account created', 'error')
    }

    console.log(res)

    // window.location.href = '/dashboard'

  } catch (err) {
    dispatch({
      type: CREATE_USER_FAIL
    })
  }
};