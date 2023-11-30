import {useState, useEffect} from 'react'
import Text from '../../Common/Text'
import Select from '../../Common/Select'
import Button from '../../Common/Button'
import Paginate from '../../Common/Paginate'
import Card from '../../Common/Card'

import './style.scss'
import {connect} from 'react-redux';
import {
  setModeRequest,
  setModeSuccess,
  getCompanyAccount,
} from '../../../actions/settingAction'

import {
  displayDate
} from '../../../utils'

import {
  displayMsg
} from '../../../utils/toast'

import {
  getDays
} from '../../../utils';
import {
  createOrder,
  isAutoMode,
} from '../../../actions/transactionAction'

function TradingMode({
  user,
  mode,
  deadline,
  company,
  setModeRequest,
  setModeSuccess,
  getCompanyAccount,
}) {
  const [percent, setPercent] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [_deadline, setDeadline] = useState(false);

  const getAuteMode = () => {
    isAutoMode()
      .then(res => {
        console.log('@@@', res.data)
        setModeSuccess({
          // mode:  res.data.data.status,
          deadline: res.data.data.timeline,
        });
        setAutoMode(res.data.data.status)
        setDeadline(res.data.data.timeline);
        const days = getDays(res.data.data.timeline, res.data.data.timenow);
        setPercent(days / 30 * 100);
      })
  }

  useEffect(() => {
    setDeadline(deadline)
    //setAutoMode(mode);
  }, [deadline])

  useEffect(() => {
    getAuteMode();
    getCompanyAccount();
  }, [user])
  return (
    <div className="trading-mode">
      <Text
        className='H3 dark_1'
        text={'Trading Mode'}
      />
      <div className='trading-mode-list'>
        <div className='trading-mode-item'>
          <Card
            title={'Manual'}
            content = {['Choose this option if you would prefer to manually click the button to begin each profit cycle']}
            progress = {0}
            active = {mode ? true : false}
            color = 'main'
            btnTitle = {'Choose Now'}
            className = {''}
            onClick = {() => {
                setModeSuccess({
                  mode: false,
                })
              }
            }
          />
        </div>
        <div className='trading-mode-item'>
          <Card
            title={'Auto'}
            content = {[autoMode ? 'You have auto service by '+displayDate(_deadline) : 'You will pay 25$ for auto service.']}
            progress = {percent}
            active = {mode ? false : true}
            color = 'main'
            btnTitle = {'Choose Now'}
            className = {''}
            onClick = {() => {
              if(!autoMode) {
                setConfirm(true)
              } else {
                setModeSuccess({
                  mode: true,
                });
              }
            }}
          />
          {confirm &&
            <div className='confirm-alert'>
              <div className='content'>
                You will pay 25$ for auto service.
              </div>
              <div className='action'>
                  <div className='btn'
                    onClick={() => {
                      setModeRequest({
                        id: user.id,
                        companyAccountId: company,
                      })
                      setConfirm(false)
                    }}
                  >Yes</div>
                  <div className='btn'
                    onClick={() => {
                      setConfirm(false);
                    }}
                  >No</div>
              </div>
            </div> 
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  mode: state.setting.mode,
  deadline: state.setting.deadline,
  company: state.setting.company,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setModeRequest: (payload) => dispatch(setModeRequest(payload)),
    setModeSuccess: (payload) => dispatch(setModeSuccess(payload)),
    getCompanyAccount: () => dispatch(getCompanyAccount()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingMode);