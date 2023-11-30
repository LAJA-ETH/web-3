import {useState, useEffect} from 'react'
import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Back from '../Common/Back'
import Text from '../Common/Text'
import Select from '../Common/Select'
import Button from '../Common/Button'
import Statistics from '../Common/Statistics';
import Card from '../Common/Card';
import './style.scss';
import Hr from '../Common/Hr';
import logoImg from '../../assets/img/logo.png'
import NavbarItem from '../Common/NavbarItem'
import cImg from '../../assets/img/c.png';
import { Outlet } from 'react-router-dom';

const navbarItems = [
  {
    icon: 'fa fa-credit-card',
    text: 'Edit Profile',
    link: 'editProfile',
  },
  {
    icon: 'fa fa-credit-card',
    text: 'Security Settings',
    link: 'securitySettings',
  },
  // {
  //   icon: 'fa fa-credit-card',
  //   text: 'Crypto Settings',
  //   link: 'cryptoSettings',
  // },
  {
    icon: 'fa fa-credit-card',
    text: 'Trading Mode',
    link: 'tradingMode',
  },
]
function Settings() {
  const [select, setSelect] = useState('editProfile');
  
  // language
  const [langOption, setLangOption] = useState([
    {
      value: 'EN',
      title: 'EN'
    },
    {
      value: 'AA',
      title: 'AA'
    },
    {
      value: 'BB',
      title: 'BB'
    }
  ]);
  const [lang, setLang] = useState('')
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const pathArr = location.pathname.split('/');
    const firstCategory = pathArr.length > 2 ? (pathArr[1] ? pathArr[2] : 'editProfile') : 'editProfile';
    setSelect(firstCategory)
  }, [location])

  const download = () => {
    
  }

  return (
    <div className="settings">
      <div className='settings-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Settings'}
        />
        <div className='settings-header-right'>
          {/* <i 
            className='fa fa-user dark_4' 
          />
          <Select
            className={'lang dark_7'}
            text={lang}
            icon={'fa fa-arrow-down'}
            options={langOption}
            onSelect = {value => {
              setLang(value)
            }}
          />
          <Button
            icon = {'fa fa-user'}
            text='Download Center'
            className={'btn_md bg-dark_5 dark_2'}
            onClick={download}
          /> */}
        </div>
      </div>
      <div className='settings-section'>
        <div className='settings-section-menu'>
        {
          navbarItems.map(item => (
              <NavbarItem 
                icon = {item.icon}
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
        <div className='settings-section-content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Settings;