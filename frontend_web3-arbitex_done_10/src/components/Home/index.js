import {
  useState,
  useEffect,
} from 'react';

import Back from '../Common/Back'
import Text from '../Common/Text'
import Statistics from '../Common/Statistics';
import Card from '../Common/Card';
import Input from '../Common/Input';
import Modal from '../Common/Modal'
import Button from '../Common/Button';
import './style.scss';
import Hr from '../Common/Hr';
import {
  displayMsg,
} from '../../utils/toast'
 
import {connect} from 'react-redux';

import {
  getBalance,
} from '../../actions/accountAction'

import {
  refactorBalances,
  calculateRealAvailableBalance,
} from '../../utils/account'


import {
  createOrder,
  isAutoMode,
} from '../../actions/transactionAction'

import {
  isEmpty
} from '../../utils'

const help = [
  'If at any point you feel uncomfortable or an emergency arises requiring you to gain immediate access to your funds, there will be no questions asked. ',
  'We are willing to offer you an 80 percent money back guarantee on total funds availabe in your account at the time the request is being made!',
  'The process is simple, just fill out a ticket in the back office and in the next 5 business days you will have 80 percent of your capital returned back to you.',
]

function Home({
  _mode,
  user,
  order,
  balance,
  getBalance,
  createOrder
}) {
  const [orderShow, setOrderShow] = useState(false);
  const [token, setToken] = useState(10);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(false);
  const [profit, setProfit] = useState(0.5); //profit
  const [orderTime, setOrderTime] = useState(2); //hour
  const [currency, setCurrency] = useState('ERC20USDT');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [address, setAddress] = useState('0x208af78a16731e0baeb47ee7c7dd7305b30232ce')
  // const [info, setInfo] = useState({
  //   balance: {
  //     value: 30842,
  //     percent: 33.82,
  //   },
  //   transaction: {
  //     value: 51641,
  //     percent: 33.82,
  //   },
  //   profit: {
  //     value: 20852,
  //     percent: 33.82,
  //   },
  // })

  const [info, setInfo] = useState({
    orders: 0,
    accountBalance: 0,
    withdrawPending: 0,
  })

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
    if(isEmpty(balance))
      return;
    const reflectBalanceState = refactorBalances(balance);
    const realAvailableBalance = calculateRealAvailableBalance(reflectBalanceState);
    setInfo({
      orders: Math.fround(reflectBalanceState.reflectuserDeposits[0].depositBalance).toFixed(2),
      accountBalance: Math.fround(realAvailableBalance[0]).toFixed(2),
      withdrawPending: Math.fround(reflectBalanceState.reflectuserWithdraws[0].pendingWithdraw).toFixed(2),
    })
  }, [balance])

  useEffect(() => {
    const {
      id: userId
    } = user;
    getBalance(userId);
  }, [user])

  useEffect(() => {
    if(isEmpty(balance))
      return;
    const reflectBalanceState = refactorBalances(balance);
    const realAvailableBalance = calculateRealAvailableBalance(reflectBalanceState);
    setCurrentBalance(Math.fround(realAvailableBalance[0]).toFixed(2));
  }, [balance])

  const sendToken = () => {
    const sendInfo = {
      token,
      amount,
      mode,
    };
    // if transaction successes
    setOpen(true);
  }

  useEffect(() => {
    setUpdate(true);
  }, [])

  const orderAmount = 500;

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

  return (
    <div className="home">
      <div className='home-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Home'}
        />
      </div>
      <div className='section'>
        <div className='statistics-section'>
          <Statistics
            icon = {'fa fa-credit-card-alt'}
            iconColor = {'secondary'}
            title = {'On orders'}
            value = {info.orders}
            unit = {'USDT'}
            raise = {0}
            raiseColor = {'secondary'}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-usd'}
            iconColor = {'danger'}
            title = {'Balance'}
            value = {info.accountBalance}
            unit = {'USDT'}
            raise = {0}
            raiseColor = {'secondary'}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-credit-card-alt'}
            iconColor = {'info'}
            title = {'Withdraw Pending'}
            value = {info.withdrawPending}
            unit = {'USDT'}
            raise = {0}
            raiseColor = {'danger'}
            className = {''}
          />
        </div>
        <div className='search-section bg-dark_6'>
          <Text
            className={'H3 secondary'}
            text={'Click to search for Arbitrage Opportunities'}
            onClick = {
              () => {
                setOrderShow(true)
              }
            }
          />
        </div>
        <Hr 
          className={'hr-section'}
        />
        <div className='desc-section'>
          <Text 
            className={'title H3 dark_1'} 
            text={'Investment package'}
          />
          <div className='desc-section-list'>
            <Card
              title = {'Bronze'}
              content = {
                [
                  'Earn 2.5% daily',
                  'Principle invested for 30 days business days',
                  'Profit + Principle returned at end of term',
                  'No minimum',
                ]
              }
              progress = {20}
              btnTitle = {'Cancel Plan'}
              color = {'main'}
            />
            <Card
              title = {'Silver'}
              content = {
                [
                  'Earn 2.5% daily',
                  'Principle invested for 30 days business days',
                  'Profit + Principle returned at end of term',
                  'No minimum',
                ]
              }
              progress = {20}
              btnTitle = {'Active'}
              color = {'secondary'}
            />
            <Card
              title = {'Gold'}
              content = {
                [
                  'Earn 2.5% daily',
                  'Principle invested for 30 days business days',
                  'Profit + Principle returned at end of term',
                  'No minimum',
                ]
              }
              progress = {20}
              btnTitle = {'Active'}
              color = {'info'}
            />
            <Card
              title = {'Platinum'}
              content = {
                [
                  'Earn 2.5% daily',
                  'Principle invested for 30 days business days',
                  'Profit + Principle returned at end of term',
                  'No minimum',
                ]
              }
              progress = {20}
              btnTitle = {'Active'}
              color = {'danger'}
            />
          </div>
        </div>

        <div className='help-section bg-dark_6'>
          <Text
            className={'help-title H4 dark_1'}
            text={'Money back guarantee?'}
          />
          {
            help.map(item => (
              <Text 
                className={`help-item P4 dark_2`}
                text = {item}
              />
            ))
          }
        </div>
      </div>
      <Modal
        open={orderShow}
        onClose={() => setOrderShow(false)}
      >
        <div className='create-order'>
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
        </div>
      </Modal>
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
  error: state.account.error,
  user: state.auth.user,
  order: state.transaction.order,
  loading: state.account.loading,
  balance: state.account.balance,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (userId) => dispatch(getBalance(userId)),
    createOrder: (payload) => dispatch(createOrder(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);