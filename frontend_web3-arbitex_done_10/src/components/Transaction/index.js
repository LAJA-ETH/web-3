import {useState, useEffect} from 'react'

import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Back from '../Common/Back'
import Text from '../Common/Text'
import Statistics from '../Common/Statistics';
import Card from '../Common/Card';
import './style.scss';
import Hr from '../Common/Hr';
import logoImg from '../../assets/img/logo.png'
import NavbarItem from '../Common/NavbarItem'
import homeImg from '../../assets/img/home.png';
import dashboardImg from '../../assets/img/dashboard.png';
import transactionImg from '../../assets/img/transaction.png';
import tradingImg from '../../assets/img/trading.png';
import walletImg from '../../assets/img/wallet.png';
import myteamImg from '../../assets/img/myteam.png';
import trainingImg from '../../assets/img/training.png';
import settingImg from '../../assets/img/setting.png';
import supportImg from '../../assets/img/support.png';
import announcementImg from '../../assets/img/announcement.png';
import cImg from '../../assets/img/c.png';
import { Outlet } from 'react-router-dom';

import {connect} from 'react-redux';

import {
  createDepositFunds,
} from '../../actions/transactionAction'

const navbarItems = [
  {
    iconImg: homeImg,
    text: 'Deposit Funds',
    link: 'depositFunds'
  },
  {
    iconImg: dashboardImg,
    text: 'Withdraw Funds',
    link: 'withdrawFunds'
  },
  {
    iconImg: transactionImg,
    text: 'Deposit History',
    link: 'depositHistory'
  },
  {
    iconImg: walletImg,
    text: 'Withdrawal History',
    link: 'withdrawHistory'
  },
  {
    iconImg: myteamImg,
    text: 'Arbitrage Details',
    link: 'arbitrageDetails'
  },
]
function Transaction({
  depositFunds,
  createDepositFunds,
}) {
  let navigate = useNavigate();
  let location = useLocation();
  const [select, setSelect] = useState('depositFunds');

  useEffect(() => {
    const pathArr = location.pathname.split('/');
    const firstCategory = pathArr.length > 2 ? (pathArr[1] ? pathArr[2] : 'depositFunds') : 'depositFunds';
    
    setSelect(firstCategory)
  }, [location])

  return (
    <div className="transaction">
      <div className='transaction-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Transaction'}
        />
      </div>
      <div className='transaction-section'>
        <div className='transaction-section-menu'>
          <div className='container'>
            {
              navbarItems.map(item => (
                  <NavbarItem 
                    frontImg = {item.iconImg}
                    text={item.text}
                    selected = {item.link === select}
                    onClick={() => {
                      if(item.link)
                        navigate(item.link);
                    }}
                  />
                )
              )
            }
          </div>
          {/* <div className='theme'>
            <Text
              className={'H6 dark_2'}
              text={'Theme'}
            />
            <div className='theme-control'>
              <i className='fa fa-sun-o dark_3' />
              <Text 
                className={'dark_3 btn_sm'}
                text={'Light'}
              />
            </div>
          </div> */}
        </div>
        <div className='transaction-section-content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  depositFunds: state.transaction.depositFunds,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createDepositFunds: (payload) => dispatch(createDepositFunds(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);