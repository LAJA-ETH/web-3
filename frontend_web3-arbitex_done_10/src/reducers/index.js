import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import accountReducer from "./accountReducer";
import transactionReducer from "./transactionReducer";
import manageReducer from "./manageReducer";
import settingReducer from "./settingReducer";
import referralReducer from './referralReducer.js'

import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
  account: accountReducer,
  transaction: transactionReducer,
  manage: manageReducer,
  setting: settingReducer,
  referral: referralReducer,
})

export default reducer;