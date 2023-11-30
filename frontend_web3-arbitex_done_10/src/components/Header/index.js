import './style.scss';
import { useState, useEffect } from 'react'
import timeImg from '../../assets/img/time.png'
import userImg from '../../assets/img/avatar.png'
import arrowDownImg from '../../assets/img/arrow-down.png'
import Text from '../Common/Text'
import {
  useNavigate
} from 'react-router-dom'
import Hr from '../Common/Hr'

import { connect } from 'react-redux';
import store from '../../store'
import {
  logout
} from '../../actions/authAction'

function Header({
  toggleMenu,
  user,
  logout,
}) {
  const [profileShow, setProfileShow] = useState(false)
  const navigate = useNavigate();
  const goLogin = () => {
    logout();
  }

  return (
    <div className="header">
      <div className='header-left'>
        <i className='fa fa-bars dark_2 bars' onClick={() => toggleMenu(true)} />
        {/* <img src={timeImg} />
        <Text 
          text={'2022-5-23 15:4'}
          className={'P4 dark_2'}
        /> */}
      </div>
      <div className='header-right'>
        <img src={'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=465&dpr=1&s=none'} className='avatar' />
        {/* <img src={process.env.REACT_APP_ASSETS_SERVER + user.filename} className='avatar'/> */}
        <span className='P4 dark_2'>{user.username}</span>
        <img src={arrowDownImg} onClick={() => setProfileShow(!profileShow)} />
        {
          profileShow && <div className='header-right-profile'>
            <div className='header-right-profile-content'>
              <img src={process.env.REACT_APP_ASSETS_SERVER + user.filename} className='avatar' />
              <div className='header-right-profile-content-letter'>
                <Text
                  className='H5 dark_1'
                  text={user.username}
                />
                <Text
                  className='P5 dark_2'
                  text={user.email}
                />
              </div>
            </div>
            <Hr className={'header-right-profile-hr bg-dark_1'} />
            <div className='header-right-profile-control'>
              <i className='fa fa-sign-out dark_3' />
              <Text
                className={'menu dark_3'}
                text={'Log Out'}
                onClick={goLogin}
              />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);