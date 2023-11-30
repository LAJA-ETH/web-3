import {
  useState,
  useEffect,
} from 'react';

import Back from '../Common/Back'
import Text from '../Common/Text'
import AccountStatistics from '../Common/AccountStatistics';
import Balance from '../Common/Balance';
import Paginate from '../Common/Paginate';
import Card from '../Common/Card';
import './style.scss';
import Hr from '../Common/Hr';
import balance1Img from '../../assets/img/dashboard/balance1.png'
import balance2Img from '../../assets/img/dashboard/balance2.png'

import {
  displayDate
} from '../../utils'

import { connect } from 'react-redux';
import {
  getBalance,
} from '../../actions/accountAction'

import {
  getDepositTransactions,
} from '../../actions/transactionAction'

import {
  refactorBalances,
  calculateRealAvailableBalance,
} from '../../utils/account'

import {
  isEmpty
} from '../../utils'

const help = [
  'If at any point you feel uncomfortable or an emergency arises requiring you to gain immediate access to your funds, there will be no questions asked. ',
  'We are willing to offer you an 80 percent money back guarantee on total funds availabe in your account at the time the request is being made!',
  'The process is simple, just fill out a ticket in the back office and in the next 5 business days you will have 80 percent of your capital returned back to you.',
]


const table_title = [
  'Date & Time',
  'Amount of transaction',
  'Earned Profit',
  'Status',
]

const filter_field = [
  'updated_at',
  'amount',
  'status',
  'profit',
]

function Dashboard({
  user,
  balance,
  depositTransactions,
  getBalance,
  getDepositTransactions,
}) {
  const [info, setInfo] = useState({
    accountBalance: 0,
    activeDeposit: 0,
    earnedProfit: 0,
  })

  const [statisticsInfo, setStatisticsInfo] = useState({
    realBalance: 0,
    percent: 0,

    availableBalance: 0,
    profitAmount: 0,
    depositBalance: 0,
    totalWithdrawed: 0,
    pendingWithdraw: 0,
  })

  useEffect(() => {
    if (isEmpty(balance))
      return;
    const reflectBalanceState = refactorBalances(balance);
    const realAvailableBalance = calculateRealAvailableBalance(reflectBalanceState);

    const totalBalance = Math.fround(realAvailableBalance[0]).toFixed(2);
    const availableBalance = Math.fround(reflectBalanceState.reflectuserBalances[0].availableBalance).toFixed(2);
    const depositBalance = Math.fround(reflectBalanceState.reflectuserDeposits[0].depositBalance).toFixed(2);
    setStatisticsInfo({
      realBalance: Math.fround(realAvailableBalance[0]).toFixed(2),
      percent: Math.fround(depositBalance / availableBalance).toFixed(2) * 100,

      availableBalance: Math.fround(reflectBalanceState.reflectuserBalances[0].availableBalance).toFixed(2),
      profitAmount: Math.fround(reflectBalanceState.reflectuserDeposits[0].profitAmount).toFixed(2),
      depositBalance: Math.fround(reflectBalanceState.reflectuserDeposits[0].depositBalance).toFixed(2),
      totalWithdrawed: Math.fround(reflectBalanceState.reflectuserWithdraws[0].totalWithdrawed).toFixed(2),
      pendingWithdraw: Math.fround(reflectBalanceState.reflectuserWithdraws[0].pendingWithdraw).toFixed(2),
    })

    setInfo({
      accountBalance: Math.fround(realAvailableBalance[0]).toFixed(2),
      activeDeposit: Math.fround(reflectBalanceState.reflectuserDeposits[0].depositBalance).toFixed(2),
      earnedProfit: Math.fround(reflectBalanceState.reflectuserDeposits[0].profitAmount).toFixed(2),
    })
  }, [balance])

  const fetchDepositTransactions = (payload) => {
    const {
      id: userId
    } = user;
    const {
      pagination: {
        page,
        pageCount,
        pageSize,
        rowCount,
      }
    } = depositTransactions;
    getDepositTransactions({
      userId,
      page,
      pageSize,
      order: 'DESC',
      ...payload
    })
  }

  useEffect(() => {
    const {
      id: userId
    } = user;

    getBalance(userId);
    fetchDepositTransactions();
  }, [user])

  return (
    <div className="dashboard">
      <div className='dashboard-header'>
        <Back
          icon={'fa fa-chevron-left'}
          text={'Back'}
          className={'btn_md main'}
        />
        <Text
          className='caption H2 dark_1'
          text={'Dashboard'}
        />
      </div>
      <div className='dashboard-balance'>
        <Text
          className='H3 dark_1'
          text={'Your Balances'}
        />
        <div className='dashboard-balance-container'>
          <Balance
            img={balance1Img}
            title={'ERC20 USDT'}
            profit={info.accountBalance}
            activeDeposit={info.activeDeposit}
            earnedProfit={info.earnedProfit}
          />
          <Balance
            img={balance2Img}
            title={'TRC20 USDT'}
            profit={0}
            activeDeposit={0}
            earnedProfit={0}
          />
        </div>
      </div>
      <Hr className={'dashboard-line'} />
      <div className='dashboard-statistics'>
        <Text
          className='H3 dark_1'
          text={'Account Statistics'}
        />
        <div className='dashboard-statistics-container'>
          <AccountStatistics
            title={'ERC20 USDT'}
            color={"#219FFF"}
            realBalance={statisticsInfo.realBalance}
            percent={statisticsInfo.percent}
            availableBalance={statisticsInfo.availableBalance}
            profitAmount={statisticsInfo.profitAmount}
            depositBalance={statisticsInfo.depositBalance}
            totalWithdrawed={statisticsInfo.totalWithdrawed}
            pendingWithdraw={statisticsInfo.pendingWithdraw}
          />
          <AccountStatistics
            title={'TRC20 USDT'}
            color={"#FFA114"}
            realBalance={0}
            percent={0}
            availableBalance={0}
            profitAmount={0}
            depositBalance={0}
            totalWithdrawed={0}
            pendingWithdraw={0}
          />
        </div>
      </div>
      <Hr className={'dashboard-line'} />
      <div className='dashboard-packages'>
        <Card
          className={'package-item'}
          title={'Bronze'}
          color="dark_1"
          content={[
            "Amount invested",
            "ROI to date",
            "Date invested",
            "Date package expire"
          ]}
        />
        <Card
          className={'package-item'}
          title={'Silver'}
          color="dark_1"
          content={[
            "Amount invested",
            "ROI to date",
            "Date invested",
            "Date package expire"
          ]}
        />
        <Card
          className={'package-item'}
          title={'Gold'}
          color="dark_1"
          content={[
            "Amount invested",
            "ROI to date",
            "Date invested",
            "Date package expire"
          ]}
        />
        <Card
          className={'package-item'}
          title={'Platinum'}
          color="dark_1"
          content={[
            "Amount invested",
            "ROI to date",
            "Date invested",
            "Date package expire"
          ]}
        />
      </div>
      <Hr className={'dashboard-line'} />
      <div className='dashboard-transactions'>
        <div className='dashboard-transactions-header'>
          <Text
            className='H3 dark_1'
            text={'Record of Arbitrage Transactions'}
          />
        </div>
        <div className='dashboard-transactions-content'>
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
              depositTransactions.models.map(item => (
                <div className='table-content-item'>
                  {
                    Object.entries(item).map(i => (filter_field.indexOf(i[0]) !== -1) && (
                      <div className='col'>{
                        i[0] === 'updated_at' ?
                          (
                            <div>
                              {displayDate(i[1])}
                            </div>
                          )
                          :
                          (
                            <div className={`${i[0]} ${i[0] === 'status' && i[1]}`}>
                              {isNaN(i[1]) ? i[1] : Math.fround(i[1]).toFixed(2)}
                            </div>
                          )
                      }
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
        <div className='dashboard-transactions-footer'>
          <Text
            className={'P4 dark_3'}
            text={`Showing 
              ${depositTransactions.pagination.pageSize * (depositTransactions.pagination.page - 1) + 1} 
              to 
              ${depositTransactions.pagination.pageSize * (depositTransactions.pagination.page)} 
            selected options`}
          />
          <Paginate
            pageCount={depositTransactions.pagination.pageCount}
            onPageChange={(value) => {
              const nextPage = value.selected + 1;
              fetchDepositTransactions({
                page: nextPage
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.account.error,
  user: state.auth.user,
  loading: state.account.loading,
  balance: state.account.balance,
  depositTransactions: state.transaction.depositTransactions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (userId) => dispatch(getBalance(userId)),
    getDepositTransactions: (payload) => dispatch(getDepositTransactions(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);