import {useState, useEffect} from 'react'
import Text from '../../Common/Text'
import Select from '../../Common/Select'
import Button from '../../Common/Button'
import Paginate from '../../Common/Paginate'
import Loading from '../../Common/Loading'

import './style.scss'

import {connect} from 'react-redux';

import {
  displayDate
} from '../../../utils'

import {
  getArbitrageDetails,
  stopAutoTransaction,
} from '../../../actions/transactionAction'

function ArbitrageDetails({
  user,
  arbitrageDetails,
  getArbitrageDetails,
}) {
  const [total, setTotal] = useState(51);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(arbitrageDetails.models) {
      setData(arbitrageDetails.models)
    }
  }, [arbitrageDetails])

  useEffect(() => {
    getArbitrageDetails({
      userId: user.id,
    })
  }, [user])

  const fetchData = (nextPage) => {
    // Load data from backend
  }
  
  const stopTransaction = async (id) => {
    //let data = { status: false, expiredTime: new Date() };
    const result = data.map(item => {
      if(item.id === id) {
        item.loading = true;
      }
      return item;
    })
    setData(result);

    stopAutoTransaction({
      id,
    })
    .then(res => {
      if(res.data.data.status === 'success')
      {
        const _result = data.map(item => {
          if(item.id === id) {
            item = res.data.data
          }
          return item;
        })
        setData(_result);
      }
    });

  }

  const getResult = (mode, timeLine, id) => {
    const nowTime = new Date().getTime();
    const expiredTime = new Date(timeLine).getTime();
    let titleButton = "";
    if (expiredTime >= nowTime) titleButton = "STOP";
    else titleButton = "DONE";
    return titleButton;
  }

  const stopProcessor = (mode, timeLine, id, loading) => {
    console.log('@@@', mode, timeLine, id)
    const nowTime = new Date().getTime();
    const expiredTime = new Date(timeLine).getTime();
    let titleButton = "";
    if (expiredTime >= nowTime) titleButton = "STOP";
    else titleButton = "DONE";
    return (
      <Button
        className={`disabled ${(titleButton === 'STOP' && mode === 0) ? 'bg-dark_5' : 'bg-success_shade success'}`}
        onClick={() => (mode === 1 && titleButton === "STOP") && stopTransaction(id)}
        disabled={mode === 0 || titleButton === "DONE" ? true : false}
        text = {titleButton}
        loading = {loading}
        loadingType = {'bounce'}
      />
    );
  }

  return (
    <div className="arbitrage-details">
        <Text
          className='H3 dark_1'
          text={'Arbitrage Details'}
        />
        {/* <div className='arbitrage-details-header'>
          <Select
            text={'deposit'}
            options = {
              [
                {
                  value: 'deposit',
                  title: 'Arbitrage'
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
          <div className = 'group'>
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
          <div className = 'group'>
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
        <div className='arbitrage-details-content'>
          <div className='table-title'>
            <div className='table-title-item'>
              Time
            </div>
            <div className='table-title-item'>
              Amount of transaction
            </div>
            <div className='table-title-item'>
              Earned Profit (USDT)
            </div>
            <div className='table-title-item'>
              Status
            </div>
            <div className='table-title-item'>
              Mode
            </div>
            <div className='table-title-item'>
              Action
            </div>
          </div>
          <div className='table-content'>
            {
              data.map(item => (
                <div className='table-content-item'>
                  <div className='table-content-item-col'>
                    {displayDate(item['updated_at'])}
                  </div>
                  <div className='table-content-item-col'>
                    {item['amount'].toFixed(2)}
                  </div>
                  <div className='table-content-item-col'>
                    {item['status'] === 'pending' ? "-" : Math.fround(item['u_earned']).toFixed(3)}
                  </div>
                  <div className='table-content-item-col'>
                    <div className={`status ${item['status']}`}>
                      {item['status']}
                    </div>
                  </div>
                  <div className='table-content-item-col'>
                    <div className={`mode ${item['mode'] ? 'auto' : 'manual'}`}>
                      {item['mode'] ? 'Auto' : 'Manual'}
                    </div>
                  </div>
                  <div className='table-content-item-col'>
                    <div>
                      {stopProcessor(item['mode'], item['expiretime'], item['id'], item.loading)}  
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='arbitrage-details-footer'>
          <Text 
            className={'P4 dark_3'}
            text={`Showing 
              ${arbitrageDetails.pagination.pageSize * (arbitrageDetails.pagination.page - 1) + 1} 
              to 
              ${arbitrageDetails.pagination.pageSize * (arbitrageDetails.pagination.page)} 
            selected options`}
          />
          <Paginate
            pageCount = {arbitrageDetails.pagination.pageCount}
            onPageChange = {(value) => {
              const nextPage = value.selected + 1;
              getArbitrageDetails({
                page: nextPage
              })
            }}
          />
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  arbitrageDetails: state.transaction.arbitrageDetails,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getArbitrageDetails: (payload) => dispatch(getArbitrageDetails(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArbitrageDetails);