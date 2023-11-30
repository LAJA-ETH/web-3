import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// For top-right notification
import { ToastContainer } from 'react-toastify/dist/react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';

import Login from './components/Login';
import Register from './components/Register';

import Home from './components/Home';

// Transaction
import Transaction from "./components/Transaction";
import DepositFunds from "./components/Transaction/DepositFunds";
import WithdrawFunds from "./components/Transaction/WithdrawFunds";
import DepositHistory from "./components/Transaction/DepositHistory";
import WithdrawHistory from "./components/Transaction/WithdrawHistory";
import ArbitrageDetails from "./components/Transaction/ArbitrageDetails";
import CreateOrder from "./components/Transaction/CreateOrder";

// Manage
import Manage from "./components/Manage";

// Settings
import Settings from "./components/Settings";
import EditProfile from "./components/Settings/EditProfile";
import SecuritySettings from "./components/Settings/SecuritySettings";
import CryptoSettings from "./components/Settings/CryptoSettings";
import TradingMode from "./components/Settings/TradingMode";

// Dashboard
import Dashboard from "./components/Dashboard";

// Training
import Training from "./components/Training";

// Faqs
import Faqs from "./components/Faqs";

// My Team
import MyTeam from "./components/MyTeam";

// Referral
import Referral from "./components/Referral";

// Support
import Support from "./components/Support";

// Announcements
import Announcements from "./components/Announcements";

// redux
import { connect } from 'react-redux';

import './App.scss'
import { useEffect } from "react";
import setAuthToken from './utils/setAuthToken'
import {
  LOGOUT
} from './constants'
import store from './store'

import {
  loadUser
} from './actions/authAction'

if (localStorage.token) {
  // if there is a token set axios headers for all requests
  try {
    setAuthToken(JSON.parse(localStorage.token).accessToken);
    // store.dispatch(loadUser());
  } catch {
    setAuthToken();
    store.dispatch({ type: LOGOUT });
  }
}

function App({
  user,
}) {
  useEffect(() => {
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <Login />
            }
          />
          <Route
            path='/register'
            element={
              <Register />
            }
          />
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route
              path='/'
              element={<Layout />}
            >
              <Route index element={<Home />} />
              <Route path="transaction" element={<Transaction />}>
                <Route index element={<DepositFunds />} />
                <Route path="depositFunds" element={<DepositFunds />} />
                <Route path="withdrawFunds" element={<WithdrawFunds />} />
                <Route path="depositHistory" element={<DepositHistory />} />
                <Route path="withdrawHistory" element={<WithdrawHistory />} />
                <Route path="arbitrageDetails" element={<ArbitrageDetails />} />
                <Route path="createOrder" element={<CreateOrder />} />
              </Route>
              <Route path="manage" element={<Manage />} />
              <Route path="settings" element={<Settings />}>
                <Route index element={<EditProfile />} />
                <Route path="editProfile" element={<EditProfile />} />
                <Route path="securitySettings" element={<SecuritySettings />} />
                <Route path="cryptoSettings" element={<CryptoSettings />} />
                <Route path="tradingMode" element={<TradingMode />} />
              </Route>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="training" element={<Training />} />
              <Route path="faqs" element={<Faqs />} />
              <Route path="myTeam" element={<MyTeam />} />
              <Route path="referral" element={<Referral />} />
              <Route path="support" element={<Support />} />
              <Route path="announcement" element={<Announcements />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme='colored'
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
