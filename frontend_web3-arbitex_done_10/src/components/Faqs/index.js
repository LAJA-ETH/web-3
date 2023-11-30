import Back from '../Common/Back'
import Text from '../Common/Text'
import Faq from '../Common/Faq';
import Balance from '../Common/Balance';
import Paginate from '../Common/Paginate';
import TrainingCard from '../Common/TrainingCard';
import './style.scss';
import Hr from '../Common/Hr';
import balance1Img from '../../assets/img/dashboard/balance1.png'
import balance2Img from '../../assets/img/dashboard/balance2.png'
import Button from '../Common/Button';

const qas = [
  {
    q: 'How many times can i trade per day?',
    a: 'It depends on if you are execution the trades manually or on our are team script. It using the auto script, you will get 10-11 cycle per day on average.'
  },
  {
    q: 'How often can i withdraw my funds',
    a: 'Withdrawals are every friday upto 12 midnight est. The minimum withdrawal is $50'
  },
  {
    q: 'What is a Cycle?',
    a: 'A cycle is the amount of time that it takes for the transactions to complete and return your profit. Each portion of the cycle will close at slightly different time until there is zero in transaction which completes the cycle, this time period is usually around 2 hours and 10 minutes.'
  },
  {
    q: 'How long does a trading cycle last',
    a: 'A cycle approximately run for 2 hours and 10 minute. Each portion of the cycle will close at slightly different times until there is zero in transaction which completes the cycle.'
  },
  {
    q: 'Can i have more than one account',
    a: 'No! Anyone caught with 2 accounts will immediately be terminated and fir faith their invested funds.'
  },
  {
    q: 'How do i fund my account',
    a: 'The only option to fund your account USDT TRC20'
  },
  {
    q: 'Can i use the same wallet for other family members',
    a: 'No, each account holder must have a private wallet. Wallet can not be shared by other members.'
  },
  {
    q: 'Does the company offer an app for my cell phone',
    a: 'Not yet, stay tuned!'
  },
  {
    q: 'What type of crypto does Arbitex use for payment',
    a: 'Payments are made to member in the from of USDT TRC 20'
  },
  {
    q: 'How fast are withdrawals',
    a: 'Withdrawals typically hit your wallet within 24 to 48 hours from time of request.'
  },
  {
    q: 'Can i automate the trading process',
    a: 'Yes! Please go to settings and click on “Trading mode” and select “Automatic”'
  },
  {
    q: 'Do the invesment packages compound your R.O.I?',
    a: 'No, but you can compound on the 2hr. Arbitex cycle upto 3x your principle.'
  },
  {
    q: 'When can I withdraw?',
    a: 'Withdrawals are on friday + Saturdays until 12 midnight est.'
  },
]

function Faqs() {
  return (
    <div className="faqs">
      <div className='faqs-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'FAQs'}
        />
      </div>
      <div className='faqs-content'>
        {
          qas.map((item, idx) => (
            <Faq
              index = {idx+1}
              question = {item.q}
              answer = {item.a}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Faqs;