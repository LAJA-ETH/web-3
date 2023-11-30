import {useState, useEffect} from 'react'
import Text from '../../Common/Text';
import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import {copyToClipboard} from '../../../utils'
import { toast } from 'react-hot-toast';
import './style.scss'

import { 
  displayMsg,
} from '../../../utils/toast'

import {connect} from 'react-redux';

import {
  createDepositFunds,
} from '../../../actions/transactionAction'

import QRCode from 'qrcode';

const successMsg = 'Successfully Registered in Tether Trader';
const depositTitle = 'Your Deposit Address :';
const desc = 'After purchasing your money and the system start the service right.';
const btnTitle = 'Go Transaction';

function DepositFunds({
  user,
  depositFunds,
  createDepositFunds,
}) {
  const [update, setUpdate] = useState(false);
  const [token, setToken] = useState(10);
  const [tokenOptions, setTokenOptions] = useState([
    {
      value: 10,
      title: '10',
    },
    {
      value: 50,
      title: '50',
    },
    {
      value: 100,
      title: '100',
    },
    {
      value: 500,
      title: '500',
    },
  ])
  const [copyStatus, setCopyStatus] = useState('copy')
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setUpdate(true);
  })

  const copy = async () => {
    const res = await copyToClipboard(depositFunds.address);
    if(res) {
      setCopyStatus('check');
      displayMsg('copied')
      setTimeout(() => setCopyStatus('copy'), 2000);
    }
  }

  const onSelect = (value) => {
    setToken(value)
  }

  const sendToken = () => {
    const sendInfo = {
      token,
      amount
    };

    const {
      id: userId,
    } = user;

    // Validate if amount is smaller than 20
    if(amount < 500) {
      displayMsg('Please make sure if your amount is over 500.', 'error');
      return;
    }

    createDepositFunds({
      amount,
      userId,
    })
    // if transaction successes
    //setOpen(true);
  }

  const openTransactionWindow = () => {
    window.open("https://etherscan.io/address/"+depositFunds.address, "_blank");
  }

  useEffect(() => {
    if(update) {
      if(depositFunds.address) {
        QRCode.toDataURL(depositFunds.address)
        .then((res) => {
          setImage(res);
        })
        .catch(err => {
          console.log('@@@', err)
        })
      }
    }
  }, [depositFunds]);

  useEffect(() => {
    if(update) {
      setOpen(true);
    }
  }, [image])

  return (
    <div className="deposit-funds">
      <Text
        className={'H3 dark_1'}
        text={'Deposit Funds'}
      />
      <div className='item'>
        <Text
          className={'cap H6 dark_1'}
          text={'Amount to deposit'}
        />
        <Input
          text={amount}
          onChange={(amount) => setAmount(amount)}
          placeholder = {'amount'}
        />
      </div>
      <Text 
        className={'desc P4 dark_3'}
        text={'Please send a little bit more than desired amount to cover crypto prive flacturations.'}
      />
      <Button 
        className='btn bg-main btn_lg dark_7'
        text={'Click here to generate wallet address to send token'}
        onClick = {() => {
          sendToken()
        }}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className='deposit-funds-modal'>
          <div className='deposit-funds-modal-header'>
            <Text
              className={'H4 dark_3'}
              text={'Result'}
            />
          </div>
          <div className='deposit-funds-modal-body'>
            <i className='fa fa-check-circle success' />
            <Text
              className={'H3 dark_2'}
              text={successMsg}
            />
            <Text
              className={'P3 dark_2'}
              text={depositTitle}
            />
            <div className='qrcode'>
              <img src = {image} />
            </div>
            <div className='address'>
              <Text
                className={'P3 dark_2'}
                text={depositFunds.address}
              />
              <span onClick={copy}>
                <i className={`fa fa-${copyStatus} dark_2`} />
              </span>
            </div>
            <Button
              className={'btn-md dark_7 bg-main'}
              text={btnTitle}
              onClick={openTransactionWindow}
              icon="fa fa-arrow-right"
              iconPos='back'
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  depositFunds: state.transaction.depositFunds,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createDepositFunds: (payload) => dispatch(createDepositFunds(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositFunds);