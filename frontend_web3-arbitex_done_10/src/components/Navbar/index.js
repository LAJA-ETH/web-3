import {useState, useEffect, useRef} from 'react'

import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Hr from '../Common/Hr'
 
import './style.scss';
import logoImg from '../../assets/img/logo.png'
import NavbarItem from '../Common/NavbarItem'
import homeImg from '../../assets/img/home.png';
import dashboardImg from '../../assets/img/dashboard.png';
import transactionImg from '../../assets/img/transaction.png';
import tradingImg from '../../assets/img/trading.png';
import walletImg from '../../assets/img/wallet.png';
import myTeamImg from '../../assets/img/myteam.png';
import trainingImg from '../../assets/img/training.png';
import settingImg from '../../assets/img/setting.png';
import supportImg from '../../assets/img/support.png';
import announcementImg from '../../assets/img/announcement.png';
import cImg from '../../assets/img/c.png';

import {connect} from 'react-redux';

const navbarItems = [
  {
    iconImg: homeImg,
    text: 'Home',
    link: '/',
  },
  {
    iconImg: dashboardImg,
    text: 'Dashboard',
    link: 'dashboard',
  },
  {
    iconImg: transactionImg,
    text: 'Transaction',
    link: 'transaction',
  },
  {
    iconImg: tradingImg,
    text: 'Manage',
    link: 'manage',
  },
  {
    iconImg: walletImg,
    text: 'Referral',
    link: 'referral',
  },
  // {
  //   iconImg: myTeamImg,
  //   text: 'My Team',
  //   link: 'myTeam',
  // },
  {
    iconImg: trainingImg,
    text: 'Training',
    link: 'training',
  },
  {
    iconImg: settingImg,
    text: 'Settings',
    link: 'settings',
  },
  {
    iconImg: supportImg,
    text: 'Support',
    link: 'support',
  },
  {
    iconImg: announcementImg,
    text: 'Announcement',
    link: 'announcement',
  },
  {
    iconImg: cImg,
    text: '2022 Arbitex.io',
    bottom:  true,
  },
]

function useOutsideAlerter(ref, toggleMenu) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Navbar({
  user,
  showMenu,
  toggleMenu,
}) {
  let navigate = useNavigate();
  let location = useLocation();
  const [select, setSelect] = useState('/');
  const [menus, setMenus] = useState([navbarItems]);

  useEffect(() => {
    if(user.role !== 'admin') {
      const newMenus = navbarItems.filter(item => item.text !== 'Manage')
      setMenus(newMenus)
    } else {
      setMenus(navbarItems)
    }
  }, [user])

  useEffect(() => {

    const pathArr = location.pathname.split('/');
    const firstCategory = pathArr.length > 1 ? (pathArr[1] ? pathArr[1] : '/') : '/';
    setSelect(firstCategory)
  }, [location])

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, toggleMenu);

  return (  
    <div className={`navbar ${showMenu && 'bars'}`} ref={wrapperRef}>
      <div className='logo'>
        <img
          src={logoImg}
        />
      </div>
      <Hr 
        className={'navbar-line'}
      />
      {
        menus.map(item => (
            <NavbarItem 
              frontImg = {item.iconImg}
              text={item.text}
              className={item.bottom}
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
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Navbar);