import {useState, useEffect} from 'react';
import Back from '../Common/Back'
import Text from '../Common/Text'
import AccountStatistics from '../Common/AccountStatistics';
import Balance from '../Common/Balance';
import Statistics from '../Common/Statistics'
import Button from '../Common/Button';
import Input from '../Common/Input';
import Modal from '../Common/Modal';
import Paginate from '../Common/Paginate';
import Card from '../Common/Card';
import apiServer from '../../api';
import './style.scss';
import Hr from '../Common/Hr';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import {toast} from 'react-hot-toast'

import {
  displayMsg
} from '../../utils/toast'

import {connect} from 'react-redux';

import {
  getQRcode,
  getBalance,
} from '../../actions/accountAction'

import {
  getPlatform,
  getUsers,
  getProfits,
  getWithdraws,
  getCompanyBalance,
  getCompanyWithdraw,
} from '../../actions/manageAction'

import {
  createWithdrawFunds
} from '../../actions/transactionAction'

import {
  displayDate
} from '../../utils'

const profit_title = [
  'Date',
  'Total earned',
  'User earned',
  'Company earned',
  'Order Amount',
  'Currency',
  'User',
]

const withdraw_title = [
  'Date',
  'To Address',
  'Amount',
  'Currency',
  'Status',
  'Tx',
]

const user_title = [
  'id',
  'email',
  'username',
  'publish',
]


// const withdraw_content = [
//   {
//     date: '2021-05-21  12:39',
//     toAddress: 6472,
//     amount: 32.34,
//     currency: 'Completed',
//     status: 'fa fa-ellipsis-h',
//     tx: 'USD',
//   },
//   {
//     date: '2021-05-21  12:39',
//     toAddress: 6472,
//     amount: 32.34,
//     currency: 'Completed',
//     status: 'fa fa-ellipsis-h',
//     tx: 'USD',
//   },
// ]

const platforms = [
  {
    id: 'registeredby24',
    icon: 'fa fa-user-plus',
    iconColor: 'secondary',
    title: 'Registered last 24h',
    value: '12',
    className: '',
  },
  {
    id: 'allusers',
    icon: 'fa fa-users',
    iconColor: 'danger',
    title: 'Registered Traders',
    value: '12',
    className: '',
  },
  {
    id: 'tradevolume',
    icon: 'fa fa-wifi',
    iconColor: 'info',
    title: 'Traded Volume',
    value: '12'+' USD',
    className: '',
  },
  {
    id: 'roi',
    icon: 'fa fa-gg',
    iconColor: 'secondary',
    title: 'Generated ROI',
    value: '12'+' USD',
    className: '',
  },
  {
    id: 'openorders',
    icon: 'fa fa-reorder',
    iconColor: 'danger',
    title: 'Open Orders',
    value: '12',
    className: '',
  },
  {
    id: 'closedorders',
    icon: 'fa fa-user',
    iconColor: 'info',
    title: 'Closed Orders',
    value: '12',
    className: '',
  },
]

function Manage({
  users,
  user,
  platform,
  profits,
  qrcode,
  withdraws,
  companyBalance,
  getUsers,
  getPlatform,
  getProfits,
  getWithdraws,
  getQRcode,
  getBalance,
  getCompanyBalance,
  getCompanyWithdraw,
  createWithdrawFunds,
}) {
  const [privateKey, setPrivateKey] = useState('');
  const [privateShow, setPrivateShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [availableBalance, setAvailableBalance] = useState(false);
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState(0.03);
  const [realAmount, setRealAmount] = useState(0);

  const onChange = (value) => {
    setPrivateKey(value)
  }

  const done = () => {
    if(!token) {
      displayMsg('Please make sure if you inputed verify token.', 'error');
      return;
    }

    if(amount <= 0) {
      displayMsg("Amount can't be lower or equal than zero. Please try it to check !", 'error');
      return;
    }

    if(amount > companyBalance) {
      displayMsg("Amount can't be bigger than your available balance. Please try it to check !", 'error');
      return;
    }

    if(address.length < 15) {
      displayMsg("Address type is invalid! Please try it to check !", 'error');
      return;
    }

    getCompanyWithdraw({
        user_id: 16, //companyAccountState,
        amount,
        receiver: address,
        currency: 'ERC20USDT',
        token2fa: token,
        mode: true,
     });
  }

  const publishUser = (id, publish) => {
    apiServer.put('/users/publish/'+id, {
      publish: publish ? 0 : 1,
    })
      .then((res) => {
        getUsers({
          page: 1,
          pageSize: 10
        });
      })
      .catch(err => {
        alert('error')
      })
  }

  useEffect(() => {
    getUsers({
      page: 1,
      pageSize: 10
    });
    getPlatform();
    getCompanyBalance();
    getProfits({
      userId: 0,
    });
    getWithdraws({
      userId: 16,
    });
    getQRcode({
      userId: user.id
    })
  }, [])

  useEffect(() => {
    console.log('@@@', users)
  }, [users])

  return (
    <div className="manage">
      <div className='manage-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Manage'}
        />
      </div>
      <div className='manage-section'>
        <div className='manage-user'>
          <div className='manage-user-header'>
            <Text 
              className='H3 dark_2' 
              text = {'User Manage'}
            />
          </div>
          <div className='manage-user-content'>
            <div className='table-title'>
              {
                user_title.map(item => (
                  <div className='table-title-item'>
                    {item}
                  </div>
                ))
              }
            </div>
            <div className='table-content'>
              {
                users.data.map((item, idx) => (
                  <div className='table-content-item'>
                    <div className='col'>
                      {idx + 1}
                    </div>
                    <div className='col'>
                      {item['email']}
                    </div>
                    <div className='col'>
                      {item['username']}
                    </div>
                    <div className='col'>
                      <div className={`checkbox ${item['publish'] && 'checked'}`}
                        onClick={
                          () => {
                            publishUser(item['id'], item['publish'])
                          }
                        }
                      ></div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='manage-platform'>
          <div className='manage-platform-header'>
            <Text 
              className='H3 dark_2' 
              text = {'Platform Manage'}
            />
          </div>
          <div className='manage-platform-content'>
            {
              platforms.map(item => (
                <Statistics
                  icon = {item.icon}
                  iconColor = {item.iconColor}
                  title = {item.title}
                  value = {platform.data[item.id]}
                  className = {item.className}
                />
              ))
            }
          </div>
          {/* <div className='manage-platform-control'>
            <Text 
              className='H5 dark_2' 
              text = {'Manually Control the Platform'}
            />
            <div className='connect-wallet'>
              <Button
                className='H5 bg-main' 
                text = {'Connnect Your Wallet'}
                onClick = {() => {
                  if(!privateShow)
                    toast.success("Don't show your private key to others!");
                  setPrivateShow(!privateShow);
                }}
              />
              <Input
                classNames='H5 dark_4 disabled' 
                text = {''}
                placeholder ={'Your Wallet Address'}
                disabled
              />
            </div>
            {
              privateShow && 
                <div className='wallet-confirm'>
                  <Input
                    classNames='H5 dark_4' 
                    text = {privateKey}
                    placeholder ={'Enter your private key...'}
                    icon2 = {'fa fa-eye'}
                    icon2Disable = {'fa fa-eye-slash'}
                    onChange={onChange}
                  />
                  <Button
                    className='H5 bg-main' 
                    text = {'Confirm'}
                  />
                </div>
            }
          </div> */}
        </div>
      </div>
      <Hr className={'manage-line'}/>
      <div className='manage-transactions'>
        <div className='manage-transactions-header'>
          <Text 
            className='H3 dark_1' 
            text = {'Profit Manage - Balance : $'+companyBalance.toFixed(2)}
          />
        </div>
        <div className='manage-transactions-content'>
          <div className='table-title'>
            {
              profit_title.map(item => (
                <div className='table-title-item'>
                  {item}
                </div>
              ))
            }
          </div>
          <div className='table-content'>
            {
              profits.data.models.map(item => (
                <div className='table-content-item'>
                  <div className='col'>
                    {
                      displayDate(item['created_at'])
                    }
                  </div>
                  <div className='col'>
                    {
                      item['earned'].toFixed(2)
                    }
                  </div>
                  <div className='col'>
                    {
                      item['u_earned'].toFixed(2)
                    }
                  </div>
                  <div className='col'>
                    {
                      item['c_earned'].toFixed(2)
                    }
                  </div>
                  <div className='col'>
                    {
                      item['amount'].toFixed(2)
                    }
                  </div>
                  <div className='col'>
                    {
                      item['currency']
                    }
                  </div>
                  <div className='col'>
                    {
                      item['user_id']
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='manage-transactions-footer'>
          <Text 
            className={'P4 dark_3'}
            text={`Showing 
              ${profits.data.pagination.pageSize * (profits.data.pagination.page - 1) + 1} 
              to 
              ${profits.data.pagination.pageSize * (profits.data.pagination.page)} 
            selected options`}
          />
          <Paginate
            pageCount = {profits.data.pagination.pageCount}
            onPageChange = {(value) => {
              const nextPage = value.selected + 1;
              getProfits({
                page: nextPage
              })
            }}
          />
        </div>
      </div>
      <Hr className={'manage-line'}/>
      <Button
        className={'bg-main dark_7'}
        text='Withdraw'
        onClick={() => {
          setOpen(true)
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
                text={companyBalance.toFixed(2) + ' USDT'}
              />
            </div>
            <div className='to-address'>
              <Text
                className={'P3 dark_2'}
                text={'To Address:'}
              />
            </div>
            <Input
              classNames='H5 dark_4' 
              text={address}
              onChange={value => setAddress(value)}
              placeholder ={'address'}
            />
            <div className='verify-token'>
              <Text
                className={'P3 dark_2'}
                text={'Verify Token: '}
              />
            </div>
            <Input
              classNames='H5 dark_4' 
              text={token}
              onChange={value => setToken(value)}
              placeholder ={'token'}
            />
            <div className='amount'>
              <Text
                className={'P3 dark_2'}
                text={'Amount'}
              />
            </div>
            <Input
              classNames='H5 dark_4' 
              text={amount}
              onChange={value => setAmount(value)}
              placeholder ={'amount'}
            />
            <Hr />
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
      <Hr className={'manage-line'}/>
      <div className='manage-transactions'>
        <div className='manage-transactions-header'>
          <Text 
            className='H3 dark_1' 
            text = {'COMPANY WITHDRAW'}
          />
        </div>
        <div className='manage-transactions-content'>
          <div className='table-title'>
            {
              withdraw_title.map(item => (
                <div className='table-title-item'>
                  {item}
                </div>
              ))
            }
          </div>
          <div className='table-content'>
            {
              withdraws.data.models.map(item => (
                <div className='table-content-item'>
                  <div className='col'>
                    {
                      displayDate(item['created_at'])
                    }
                  </div>
                  <div className='col'>
                    {
                      item['address']
                    }
                  </div>
                  <div className='col'>
                    {
                      item['amount']
                    }
                  </div>
                  <div className='col'>
                    {
                      item['currency']
                    }
                  </div>
                  <div className='col'>
                    {
                      item['status']
                    }
                  </div>
                  <div className='col'>
                    {
                      item['tx']
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='manage-transactions-footer'>
          <Text 
            className={'P4 dark_3'}
            text={`Showing 
              ${withdraws.data.pagination.pageSize * (withdraws.data.pagination.page - 1) + 1} 
              to 
              ${withdraws.data.pagination.pageSize * (withdraws.data.pagination.page)} 
            selected options`}
          />
          <Paginate
            pageCount = {withdraws.data.pagination.pageCount}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.manage.users,
  platform: state.manage.platform,
  profits: state.manage.profits,
  withdraws: state.manage.withdraws,
  error: state.account.error,
  loading: state.account.loading,
  balance: state.account.balance,
  user: state.auth.user,
  companyBalance: state.manage.companyBalance,
  qrcode: state.account.qrcode,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (payload) => dispatch(getUsers(payload)),
    getPlatform: () => dispatch(getPlatform()),
    getProfits: (payload) => dispatch(getProfits(payload)),
    getWithdraws: (payload) => dispatch(getWithdraws(payload)),
    getQRcode: (payload) => dispatch(getQRcode(payload)),
    getBalance: (userId) => dispatch(getBalance(userId)),
    getCompanyBalance: () => dispatch(getCompanyBalance()),
    getCompanyWithdraw: (payload) => dispatch(getCompanyWithdraw(payload)),
    createWithdrawFunds: (payload) => dispatch(createWithdrawFunds(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);