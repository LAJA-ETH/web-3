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
  getDepositHistory,
} from '../../../actions/transactionAction'

function DepositHistory({
  user,
  depositHistory,
  getDepositHistory,
}) {
  const [total, setTotal] = useState(51);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const fetchData = (nextPage) => {
    // Load data from backend
  }

  useEffect(() => {
    getDepositHistory({
      userId: user.id,
    })
  }, [user])

  return (
    <div className="deposit-history">
        <Text
          className='H3 dark_1'
          text={'Deposit History'}
        />
        {/* <div className='deposit-history-header'>
          <Select
            text={'deposit'}
            options = {
              [
                {
                  value: 'deposit',
                  title: 'Deposit'
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
          <div className='group'>
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
          <div className='group'>
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
        <div className='deposit-history-content'>
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
            <div className='table-title-item'>
              To
            </div>
          </div>
          <div className='table-content'>
            {
              depositHistory.models.map(item => (
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
                  <div className='table-content-item-col'>
                    {(item['address'] || '...').toString().slice(0,10)}  
                    {/* <i className='fa fa-link' />
                    <i className='fa fa-copy' /> */}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='deposit-history-footer'>
          {/* <Text 
            className={'P4 dark_3'}
            text={`Showing 
              ${depositHistory.pagination.pageSize * (depositHistory.pagination.page - 1) + 1} 
              to 
              ${depositHistory.pagination.pageSize * (depositHistory.pagination.page)} 
            selected options`}
          /> */}
          <Paginate
            pageCount = {depositHistory.pagination.pageCount}
            onPageChange = {(value) => {
              const nextPage = value.selected + 1;
              getDepositHistory({
                user: user.id,
                page: nextPage
              })
            }}
          />
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  depositHistory: state.transaction.depositHistory,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDepositHistory: (payload) => dispatch(getDepositHistory(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositHistory);