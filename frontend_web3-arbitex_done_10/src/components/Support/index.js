import {useState, useEffect} from 'react';
import {
  isEmpty,
  isEmail
} from '../../utils'
import Back from '../Common/Back'
import Text from '../Common/Text'
import './style.scss';
import Hr from '../Common/Hr';
import Button from '../Common/Button';
import Input from '../Common/Input';
import TextArea from '../Common/TextArea';
import logoImg from '../../assets/img/footer/logo.png';
import _1Img from '../../assets/img/footer/1.png';
import _2Img from '../../assets/img/footer/2.png';
import _3Img from '../../assets/img/footer/3.png';
import _4Img from '../../assets/img/footer/4.png';
import _5Img from '../../assets/img/footer/5.png';
import _6Img from '../../assets/img/footer/6.png';
import _7Img from '../../assets/img/footer/7.png';
import _8Img from '../../assets/img/footer/8.png';
import _9Img from '../../assets/img/footer/9.png';

import {
  copyToClipboard,
} from '../../utils'

import {
  displayMsg
} from '../../utils/toast'
//

const discordLink = 'discord.gg/arb@0000';
const privacyLink = 'discord.gg/arb@0000';

const supports = [
  {
    title: 'About',
    content: [
      {
        link: 'about-us',
        title: 'Abount Us',
      },
      {
        link: 'rodnmap',
        title: 'Roadmap',
      },
      {
        link: 'contacts',
        title: 'Contacts',
      },
    ]
  },
  {
    title: 'Products',
    content: [
      {
        link: 'manual',
        title: 'Manual',
      },
      {
        link: 'auto',
        title: 'Auto',
      },
      {
        link: 'plans',
        title: 'PLans',
      },
    ]
  },
  {
    title: 'Resource',
    content: [
      {
        link: 'news',
        title: 'News',
      },
      {
        link: 'faq',
        title: 'FAQ',
      },
      {
        link: 'plans',
        title: 'PLans',
      },
    ]
  },
  {
    title: 'Others',
    content: [
      {
        link: 'careet',
        title: 'Career',
      },
    ]
  }
]

function Support() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const [error, setError] = useState({
    email: '',
    name: '',
    message: '',
  })

  const send = () => {
    if(isEmail(email) && !isEmpty(name) && !isEmpty(message)) {
      displayMsg('Successfully sent');
    }
  }

  return (
    <div className="support">
      <div className='support-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Support'}
        />
      </div>
      <div className='support-content'>
        <Text 
          className='H3 dark_1' 
          text = {'join our private discord server and under it a discord link.'}
        />
        <div className='discord-link'>
          <Text 
            className='H3 dark_1' 
            text = {'Discord link:'}
          />
          <Text 
            className='H3 main' 
            text = {'discord.gg/arb@0000'}
          />
          <i 
            className='fa fa-copy dark_2' 
            onClick={() => {
              if(copyToClipboard(discordLink)) 
                displayMsg('Copied')
            }}
          />
        </div>
      </div>
      <div className='support-footer'>
        <Text 
          className='H3 dark_1' 
          text = {'Privacy link:'}
        />
        <Text 
          className='H3 main' 
          text = {'discord.gg/arb@0000'}
        />
        <i 
          className='fa fa-copy dark_2' 
          onClick={() => {
            if(copyToClipboard(privacyLink)) 
              displayMsg('Copied')
          }}
        />
      </div>
    </div>
  )
}

export default Support;