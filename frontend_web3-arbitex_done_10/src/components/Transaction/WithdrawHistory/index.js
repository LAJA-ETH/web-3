import {useState, useEffect} from 'react'
import Text from '../../Common/Text'
import Select from '../../Common/Select'
import Button from '../../Common/Button'
import Paginate from '../../Common/Paginate'

import './style.scss'
import {connect} from 'react-redux';

import {
  displayDate
} from '../../../utils'

import {
  getWithdrawHistory,
} from '../../../actions/transactionAction'

const table_title = [
  'Date',
  'Amount',
  'Currency',
  'Status',
  'Tx',
]

function WithdrawHistory({
  user,
  withdrawHistory,
  getWithdrawHistory,
}) {
  const [total, setTotal] = useState(51);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const fetchData = (nextPage) => {
    // Load data from backend
  }

  useEffect(() => {
    getWithdrawHistory({
      userId: user.id,
    })
  }, [user])

  return (
    <div className="withdraw-history">
        <Text
          className='H3 dark_1'
          text={'Withdrawal History'}
        />
        {/* <div className='withdraw-history-header'>
          <Select
            text={'withdraw'}
            options = {
              [
                {
                  value: 'withdraw',
                  title: 'Withdraw'
                }
              ]
            }
            icon={'fa fa-angle-down'}
          />
          <Select
            text={'all ecurrencies'}
            options = {
              [
                {
                  value: 'all ecurrencies',
                  title: 'All eCurrencies'
                },
                {
                  value: 'perfectmoney',
                  title: 'PerfectMoney'
                },
              ]
            }
            icon={'fa fa-angle-down'}
          />
          <div className="group">
          <Text 
            className={'H6 dark_1'}
            text={'From'}
          />
          <Select
            text={'2021-05-20'}
            options = {
              [
                {
                  value: '2021-05-20',
                  title: '2021-05-20'
                },
              ]
            }
            icon={'fa fa-calendar'}
          />
          </div>
          <div className="group">
          <Text 
            className={'H6 dark_1'}
            text={'To'}
          />
          <Select
            text={'2021-05-20'}
            options = {
              [
                {
                  value: '2021-05-20',
                  title: '2021-05-20'
                },
              ]
            }
            icon={'fa fa-calendar'}
          />
          </div>
          <Button
            className={'dark_7 btn_md bg-main'}
            text={'Go'}
          />
          <Button
            className={'dark_3 btn_md'}
            text={'Filter'}
            icon={'fa fa-filter'}
            border
          />
        </div> */}
        <div className='withdraw-history-content'>
          <div className='table-title'>
            <div className='table-title-item'>
              Date
            </div>
            <div className='table-title-item'>
              Amount
            </div>
            <div className='table-title-item'>
              Currency
            </div>
            <div className='table-title-item'>
              Status
            </div>
            <div className='table-title-item'>
              Tx
            </div>
          </div>
          <div className='table-content'>
            {
              withdrawHistory.models.map(item => (
                <div className='table-content-item'>
                  <div className='table-content-item-col'>
                    {displayDate(item['updated_at'])}
                  </div>
                  <div className='table-content-item-col'>
                    {item['amount'].toFixed(2)}
                  </div>
                  <div className='table-content-item-col'>
                    {item['currency']}
                  </div>
                  <div className='table-content-item-col'>
                    <div className={`status ${item['status']}`}>
                      {item['status']}
                    </div>
                  </div>
                  <div className='table-content-item-col'>
                    {(item['tx'] || '...').toString().slice(0,10)}
                    {/* <i className='fa fa-link' />
                    <i className='fa fa-copy' /> */}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* <div className='withdraw-history-footer'>
          <Text 
            className={'P4 dark_3'}
            text={'Showing 11 to 80 selected options'}
          />
          <Paginate
            pageCount = {total / perPage}
            onPageChange = {(e) => {
              const changedPage = e.selected + 1;
              fetchData(changedPage);
            }}
          />
        </div> */}
    </div>
  )
}

const mapStateToProps = state => ({
  withdrawHistory: state.transaction.withdrawHistory,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getWithdrawHistory: (payload) => dispatch(getWithdrawHistory(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawHistory);