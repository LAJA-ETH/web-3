import {
  useState,
  useEffect,
} from 'react';

import Back from '../Common/Back'
import Text from '../Common/Text'
import AccountStatistics from '../Common/AccountStatistics';
import Statistics from '../Common/Statistics'
import Commission from '../Common/Commission'
import Balance from '../Common/Balance';
import InputWithButton from '../Common/InputWithButton';
import TrainingCard from '../Common/TrainingCard';
import './style.scss';
import Hr from '../Common/Hr';
import balance1Img from '../../assets/img/dashboard/balance1.png'
import balance2Img from '../../assets/img/dashboard/balance2.png'
import balance3Img from '../../assets/img/dashboard/balance3.png'
import cashInImg from '../../assets/img/cash/in.png'
import cashOutImg from '../../assets/img/cash/out.png'
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
import {displayMsg} from '../../utils/toast'

import {
  displayDate,
  isEmpty
} from '../../utils'
import {
  copyToClipboard,
} from '../../utils'
import {connect} from 'react-redux';

import {
  getReferralInfo,
  getReferralUsers,
  getReferralTransactions
} from '../../actions/referralAction'

const table_title = [
  'Partner',
  'Registration Date',
  'Email',
]

const transaction_title = [
  'Date',
  'Amount',
  'Username',
  'Status',
]

const transaction_content = [
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash Out',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash In',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash Out',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
  {
    asset: 'DASH',
    cash: 'Cash Out',
    username: 'troutstrategy',
    amount: 75,
    roi: 32,
    finished_date: '15 May 2020 9:30 am',
  },
]

const table_content = [
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },

  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
]

function Referral({
  user,
  info,
  users,
  transactions,
  getReferralInfo,
  getReferralUsers,
  getReferralTransactions,
}) {
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const userId = user.myrefcode;
    setReferralLink(`${window.location.origin}/register?ref=${userId}`);
    getReferralInfo();
    getReferralUsers();
    getReferralTransactions();
  }, [user])

  return (
    <div className="referral">
      <div className='referral-header'>
        <div className='referral-header-left'>
          <div className='underline'>
            <div className='wrap'>
              <Text 
                className='caption btn_md dark_1 bg-dark_5' 
                text = {"Referral income by Partners's Profit"}
              />
            </div>
          </div>
          <Text 
            className='H2 dark_1' 
            text = {"Referral income by Partners's Profit"}
          />
        </div>
        <div className='referral'>
          <Text
            className={'P5 dark_3'}
            text={'Referral link'}
          />
          <InputWithButton
            icon={'fa fa-link'}
            disabled
            text={referralLink}
            btnText = {'copy'}
            onClick = {() => {
              if(copyToClipboard(referralLink))
                displayMsg('Copied')
            }}
          />
        </div>
      </div>
      <div className='referral-content'>
        <Text
          className={'H5 dark_1'}
          text={'Your upline'}
        />
        <div className='upline'>
          <Statistics
            icon = {'fa fa-user'}
            iconColor = {'secondary'}
            title = {'All Partners'}
            value = {info.allpartners}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-dollar'}
            iconColor = {'secondary'}
            title = {"Total partners' profit"}
            value = {info.totalearnedfrompartner.toFixed(2)}
            unit = {'USD'}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-dollar'}
            iconColor = {'danger'}
            title = {"Commissions received"}
            value = {info.receivedamount.toFixed(2)}
            unit = {'USD'}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-user'}
            iconColor = {'info'}
            title = {"Active partners"}
            value = {info.activeusercount}
            className = {''}
          />
        </div>
        {/* <Hr
          className={'referral-line'}
        />
        <Text
          className={'H5 dark_1'}
          text={'Commissions'}
        />
        <div className='commissions'>
          <Commission 
            img = {balance1Img}
            title = {'ERC20 USDT'}
            usdt = {240.90}
            usd = {480}
          />
          <Commission 
            img = {balance3Img}
            title = {'ERC20 USDT'}
            usdt = {240.90}
            usd = {480}
          />
          <Commission 
            img = {balance2Img}
            title = {'ERC20 USDT'}
            usdt = {240.90}
            usd = {480}
          />
        </div> */}
        <Hr
          className={'referral-line'}
        />
        <div className='referral-list'>
          <Text 
            className={'H3 dark_1 caption'}
            text = {'Referral List'}
          />
          <div className='table-title'>
            {
              table_title.map(item => (
                <div className='table-title-item'>
                  {item}
                </div>
              ))
            }
          </div>
          <div className='table-content'>
            {
              users.map(item => (
                <div className='table-content-item'>
                  <div>
                    {item.username}
                  </div>
                  <div>
                    {displayDate(item.created_at)}
                  </div>
                  <div>
                    {item.email}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <Hr
          className={'referral-line'}
        />
        <div className='partner-transaction'>
          <Text 
            className={'H3 dark_1 caption'}
            text = {'Partner Transaction'}
          />
          <div className='table-title'>
            {
              transaction_title.map(item => (
                <div className='table-title-item'>
                  {item}
                </div>
              ))
            }
          </div>
          <div className='table-content'>
            {
              transactions.map(item => (
                <div className='table-content-item'>
                  <div>
                    {displayDate(item['created_at'])}
                  </div>
                  <div>
                    {item['amount'].toFixed(2)}
                  </div>
                  <div>
                    {item.user.username}
                  </div>
                  <div>
                    <div className={`status ${item['status']}`}>
                      {item['status']}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  info: state.referral.info.data,
  users: state.referral.users.data,
  transactions: state.referral.transactions.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getReferralInfo: () => {dispatch(getReferralInfo())},
    getReferralUsers: () => {dispatch(getReferralUsers())},
    getReferralTransactions: () => {dispatch(getReferralTransactions())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Referral);