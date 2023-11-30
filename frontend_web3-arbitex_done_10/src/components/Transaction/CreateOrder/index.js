import {useState, useEffect} from 'react'
import Text from '../../Common/Text';
import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Hr from '../../Common/Hr';
import Modal from '../../Common/Modal';
import {copyToClipboard} from '../../../utils'
import { toast } from 'react-hot-toast';
import './style.scss'

import {connect} from 'react-redux';

import {
  getBalance,
} from '../../../actions/accountAction'

import {
  createOrder,
  isAutoMode,
} from '../../../actions/transactionAction'

import {
  isEmpty,
} from '../../../utils'

import {
  displayMsg,
} from '../../../utils/toast'


import {
  refactorBalances,
  calculateRealAvailableBalance,
} from '../../../utils/account'

const successMsg = 'Successfully Registered in Tether Trader';
const depositTitle = 'Your Deposit Address :';
const desc = 'After purchasing your money and the system start the service right.';
const btnTitle = 'Go Transaction';
const orderAmount = 500;

function CreateOrder({
  _mode,
  user,
  order,
  balance,
  createOrder,
  getBalance,
}) {
  const [token, setToken] = useState(10);
  const [copyStatus, setCopyStatus] = useState('copy')
  const [update, setUpdate] = useState(false);
  //const [amount, setAmount] = useState(1200);
  const [open, setOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [address, setAddress] = useState('0x208af78a16731e0baeb47ee7c7dd7305b30232ce')

  // new
  const [mode, setMode] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [orderTime, setOrderTime] = useState(2); //hour
  const [profit, setProfit] = useState(0.5); //profit
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('ERC20USDT');
  // 

  const copy = async () => {
    const res = await copyToClipboard(address);
    if(res) {
      setCopyStatus('check');
      toast.success('copied')
      setTimeout(() => setCopyStatus('copy'), 2000);
    }
  }

  const done = (value) => {
    setOpen(false)
    console.log(amount, currentBalance, amount > currentBalance)
    if(amount < orderAmount || amount > Math.floor(currentBalance)) {
      displayMsg('Please make sure if your amount is greater than 500 and less than your balance.', 'error')
      return false;
    }

    const {
      id: userId
    } = user;



    createOrder({
      userId,
      amount,
      currency,
      time: mode ? 7 * 24 : orderTime,
      profit: profit,
      mode,
    })
  }

  const onSelect = (value) => {
    setToken(value)
  }

  const sendToken = () => {
    const sendInfo = {
      token,
      amount,
      mode,
    };
    // if transaction successes
    setOpen(true);
  }

  const openTransactionWindow = () => {
    window.open("https://etherscan.io/address/"+address, "_blank");
  }

  useEffect(() => {
    setUpdate(true);
  }, [])

  useEffect(() => {
    if(order.data && update) {
      setResultOpen(true);
      setAddress(order.data)
    }

    return () => {
      setResultOpen(false);
    }
  }, [order])

  useEffect(() => {
    setMode(_mode)
  }, [_mode])

  useEffect(async () => {
    const {
      id: userId
    } = user;
    // isAutoMode()
    //   .then(res => {
    //     console.log('@@@', res.data)
    //     setMode(res.data.data.status)
    //   })
    getBalance(userId)
  }, [user])

  useEffect(() => {
    if(isEmpty(balance))
      return;
    const reflectBalanceState = refactorBalances(balance);
    const realAvailableBalance = calculateRealAvailableBalance(reflectBalanceState);
    setCurrentBalance(Math.fround(realAvailableBalance[0]).toFixed(2));
  }, [balance])

  return (
    <div className="create-order">
      <Text
        className={'H3 dark_1'}
        text={'Create Order'}
      />
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'The current mode: '+(mode ? 'Auto' : 'Manual')}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Order Time: ' + orderTime + ' Hour(s)'}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Currency: ' + currency}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Your balance: ' + (currentBalance > 0 ? currentBalance : 0) + ' (USDT)'}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Amount: '}
        />
        <Input
          text={amount}
          onChange={(value) => setAmount(value)}
        />
      </div>
      <Button 
        className='btn bg-main btn_lg dark_7'
        text={'Order'}
        onClick = {() => {
          sendToken()
        }}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className='create-order-modal'>
          <div className='create-order-modal-header'>
            <Text
              className={'H4 dark_1'}
              text={'Create Order'}
            />
          </div>
          <div className='create-order-modal-body'>
            <div>
              <Text
                className={'P3 dark_2'}
                text={'Order Mode: '}
              />
              <Text
                className={'P3 success'}
                text={mode ? 'Auto' : 'Manual'}
              />
            </div>
            <div>
              <Text
                className={'P3 dark_2'}
                text={'Current balance: '}
              />
              <Text
                className={'P3 success'}
                text={currentBalance+' USDT'}
              />
            </div>
            <div>
              <Text
                className={'P3 dark_2'}
                text={'Currency: '}
              />
              <Text
                className={'P3 success'}
                text={currency}
              />
            </div>
            <div>
              <Text
                className={'P3 dark_2'}
                text={'Order Amount: '}
              />
              <Text
                className={'P3 success'}
                text={amount + ' USDT'}
              />
            </div>
            {
              !mode && (
                <div>
                  <Text
                    className={'P3 dark_2'}
                    text={'Order Time:'}
                  />
                  <Text
                    className={'P3 success'}
                    text={orderTime + ' h'}
                  />
                </div>
              )
            }
            
            <Hr />
            <Button
              className={'btn bg-main btn_lg dark_7'}
              text={"Done"}
              onClick = {
                () => done()
              }
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={resultOpen}
        onClose={() => setResultOpen(false)}
      >
        <div className='create-order-modal'>
          <div className='create-order-modal-header'>
            <Text
              className={'H4 dark_1'}
              text={'Result'}
            />
          </div>
          <div className='create-order-modal-body'>
            <div>
              <Text
                className={'H3 dark_1'}
                text={'Successfully Delivered to Server !'}
              />
            </div>
            <div>
              <Text
                className={'P3 dark_2'}
                text={'Tx id: ' + (order && order.data)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  _mode: state.setting.mode,
  order: state.transaction.order,
  user: state.auth.user,
  balance: state.account.balance,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (userId) => dispatch(getBalance(userId)),
    createOrder: (payload) => dispatch(createOrder(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);