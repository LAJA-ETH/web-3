import {useState, useEffect} from 'react'
import Text from '../../Common/Text'
import Select from '../../Common/Select'
import Input from '../../Common/Input'
import Button from '../../Common/Button'
import Paginate from '../../Common/Paginate'
import pmImg from '../../../assets/img/pm.png'
import lcImg from '../../../assets/img/lc.png'
import bcImg from '../../../assets/img/bc.png'
import etImg from '../../../assets/img/et.png'
import ttImg from '../../../assets/img/tt.png'
import bbImg from '../../../assets/img/bb.png'

import './style.scss'

const items = [
  {
    title: 'Your PerfectMoney acc no:',
    ref: 'perfectMoney',
    icon: pmImg,
  },
  {
    title: 'Your Bitcoin acc no:',
    ref: 'bitcoin',
    icon: bcImg,
  },
  {
    title: 'Your Litecoin acc no:',
    ref: 'litecoin',
    icon: lcImg,
  },
  {
    title: 'Your Ethereum acc no:',
    ref: 'ethereum',
    icon: etImg,
  },
  {
    title: 'Your Tether ERC20 acc no:',
    ref: 'tether1',
    icon: ttImg,
  },
  {
    title: 'Your Tether TRC20 acc no:',
    ref: 'tether2',
    icon: ttImg,
  },
  {
    title: 'Your BNB acc no:',
    ref: 'bnb',
    icon: bbImg,
  },
]

function CryptoSettings() {
  const [cryptoSetting, setCryptoSetting] = useState({
    perfectMoney: '',
    bitcoin: '',
    litecoin: '',
    ethereum: '',
    tether1: '',
    tether2: '',
    bnb: '',
  })

  const saveAndUpdate = () => {
    
  }

  return (
    <div className="crypto-settings">
        <Text
          className='H3 dark_1'
          text={'Crypto Settings'}
        />
        <div className='crypto-settings-list'>
          {
            items.map(item => (
              <div className='crypto-settings-item'>
                <Text 
                  className={'H6 dark_1'}
                  text={item.title}
                />
                <Input 
                  frontImg={item.icon}
                  placeholder={item.title}
                  text={cryptoSetting[item.ref]}
                  onChange={value => {
                    setCryptoSetting({
                      ...cryptoSetting,
                      [item.ref]: value
                    })
                  }}
                />
              </div>
            ))
          }
        </div>  
        <Button
          className={'btn_lg dark_7 bg-main crypto-settings-btn'}
          text={'Save and Update'}
          onClick = {saveAndUpdate}
        />
    </div>
  )
}

export default CryptoSettings;