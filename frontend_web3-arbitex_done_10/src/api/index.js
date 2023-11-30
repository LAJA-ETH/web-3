import axios from 'axios';
// import { displayMsg } from '../utils/toast';

const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiServer.interceptors.response.use(
  (res) => res,
  (err) => {

    if (err.code === "ERR_NETWORK") {
      return Promise.reject({
        code: err.code,
        message: err.message,
      });
    }

    return Promise.reject(err.response.data.error);
  }
);


export default apiServer;