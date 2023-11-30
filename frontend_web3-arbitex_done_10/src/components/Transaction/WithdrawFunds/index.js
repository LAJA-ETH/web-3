import {useState, useEffect} from 'react'
import Text from '../../Common/Text';
import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Hr from '../../Common/Hr';
import Modal from '../../Common/Modal';
import {copyToClipboard} from '../../../utils'
import { toast } from 'react-hot-toast';
import qrImg from '../../../assets/img/QR.png'
import './style.scss'

import {connect} from 'react-redux';
import {
  isEmpty
} from '../../../utils'

import {
  getQRcode,
  getBalance,
} from '../../../actions/accountAction'

import {
  createWithdrawFunds
} from '../../../actions/transactionAction'

import {
  getWeekDay,
} from '../../../actions/commonAction'

import {
  displayMsg
} from '../../../utils/toast'

import {
  refactorBalances,
  calculateRealAvailableBalance,
} from '../../../utils/account'

function WithdrawFunds({
  user,
  balance,
  qrcode,
  withdrawFunds,
  getQRcode,
  getBalance,
  createWithdrawFunds,
}) {
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [fee, setFee] = useState(0.03);
  const [realAmount, setRealAmount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(false);

  useEffect(() => {
    setRealAmount(amount - amount*fee);
  }, [amount]);

  useEffect(() => {
    getQRcode({
      userId: user.id
    })
    getBalance(user.id);
  }, [user]);

  useEffect(() => {
    setUpdate(true);
  })

  useEffect(() => {
    if(isEmpty(balance))
      return;
    const reflectBalanceState = refactorBalances(balance);
    const realAvailableBalance = calculateRealAvailableBalance(reflectBalanceState);
    setAvailableBalance(Math.fround(realAvailableBalance[0]).toFixed(4));
  }, [balance])

  useEffect(() => {
    if(update) {
      if(withdrawFunds.message)
        displayMsg(withdrawFunds.message, 'error')
      if(withdrawFunds.error)
        displayMsg(withdrawFunds.error, 'error')
    }
  }, [withdrawFunds])

  const onSelect = (value) => {
    setToken(value)
  }

  const done = (value) => {
    createWithdrawFunds({
      userId: user.id,
      amount,
      address,
      verifyToken: token,
    })
    setOpen(false);
  }

  const withdraw = () => {
    const info = {
      token,
      amount,
      address,
      fee
    };
  }

  const confirmWithdraw = async () => {
    const weekDay = await getWeekDay();
    if(weekDay !== 5 && weekDay !== 6) {
      displayMsg('Withdrawals are possible on weekends.', 'error')
      return;
    }

    if (!token) {
      displayMsg("Please make sure if you inputed verify token.", 'error');
      return;
    }

    if(amount <= 0) {
      displayMsg("Amount can't be lower or equal than zero. Please try it to check!", 'error');
      return;
    }
    if(Number(amount) > Number(availableBalance)) {
      displayMsg("Amount can't be bigger than your available balance. Please try it to check!", 'error');
      return;
    }

    if (address.length < 15) {
      displayMsg("Address type is invalid! Please try it to check!", 'error');
      return;
    }

    setOpen(true);
  }

  return (
    <div className="withdraw-funds">
      <Text
        className={'H3 dark_1'}
        text={'Withdraw Funds'}
      />
      <Text
        className={'cap H6 dark_1'}
        text={'Available balance: ' + (availableBalance > 0 ? availableBalance : 0) + ' USDT'}
      />
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Verify Token'}
        />
        <Input
          text={token}
          onChange={(value) => setToken(value)}
          placeholder = {'verify token'}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Amount to withdraw'}
        />
        <Input
          text={amount}
          onChange={(amount) => setAmount(amount)}
          placeholder = {'amount'}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Withdraw address'}
        />
        <Input
          text={address}
          placeholder={'0x35fe04a885b2d1f419987281bf8d061CC1b3df7a'}
          onChange={(address) => setAddress(address)}
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Withdrawal fee'}
        />
        <Input
          text={fee}
          placeholder={'Withdrawal fee amount .03%'}
          onChange={(fee) => setFee(fee)}
          disabled
        />
      </div>
      <Text 
        className={'desc P4 dark_1'}
        text={'You will get ' + ((realAmount > 0) ? realAmount : 0) + 'USDT'}
      />
      <Text 
        className={'desc P4 dark_3'}
        text={'Make sure withdrawal address is correct. Funds can not be recovered if sent to wrong address '}
      />
      <Button 
        className='btn bg-main btn_lg dark_7'
        text={'Withdraw'}
        onClick={() => {
          confirmWithdraw();
        }}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className='withdraw-funds-modal'>
          <div className='withdraw-funds-modal-header'>
            <Text
              className={'H4 dark_3'}
              text={'Confirm Withdraw'}
            />
          </div>
          <div className='withdraw-funds-modal-content'>
            <Text
              className={'H3 dark_2'}
              text={'Enter the amount to withdraw your wallet.'}
            />
            <Text
              className={'P3 dark_2'}
              text={'Copy your unique address or use the QR code to make a withdraw to wallet.'}
            />
            <div className='img'>
              <img src={qrcode.url} />
            </div>
            <div className='total-amount'>
              <Text
                className={'P3 dark_2'}
                text={'your available balance: '}
              />
              <Text
                className={'P3 success'}
                text={availableBalance + ' USDT'}
              />
            </div>
            <div className='to-address'>
              <Text
                className={'P3 dark_2'}
                text={'To Address:'}
              />
              <Text
                className={'P3 success'}
                text={address}
              />
            </div>
            <div className='verify-token'>
              <Text
                className={'P3 dark_2'}
                text={'Verify Token: '}
              />
              <Text
                className={'P3 success'}
                text={token}
              />
            </div>
            <div className='amount'>
              <Text
                className={'P3 dark_2'}
                text={'Amount'}
              />
              <Text
                className={'P3 success'}
                text={amount + ' USDT'}
              />
            </div>
            <div className='fee'>
              <Text
                className={'P3 dark_2'}
                text={'Commission: '}
              />
              <Text
                className={'P3 success'}
                text={fee + ' USDT'}
              />
            </div>
            <div className='real-amount'>
              <Text
                className={'P3 dark_2'}
                text={'You will get '}
              />
              <Text
                className={'P3 success'}
                text={realAmount + ' USDT'}
              />
            </div>
            <Hr

            />
            <Button
              className={'btn bg-success btn_lg dark_7'}
              text={"Withdraw"}
              onClick={() => {
                done()
              }}
            />
          </div>
        </div>  
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  withdrawFunds: state.transaction.withdrawFunds,
  user: state.auth.user,
  balance: state.account.balance,
  qrcode: state.account.qrcode,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getQRcode: (payload) => dispatch(getQRcode(payload)),
    getBalance: (userId) => dispatch(getBalance(userId)),
    createWithdrawFunds: (payload) => dispatch(createWithdrawFunds(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawFunds);