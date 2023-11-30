import Back from '../Common/Back'
import Text from '../Common/Text'
import AccountStatistics from '../Common/AccountStatistics';
import Statistics from '../Common/Statistics'
import Balance from '../Common/Balance';
import InputWithButton from '../Common/InputWithButton';
import TrainingCard from '../Common/TrainingCard';
import './style.scss';
import Hr from '../Common/Hr';
import balance1Img from '../../assets/img/dashboard/balance1.png'
import balance2Img from '../../assets/img/dashboard/balance2.png'
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';


const table_title = [
  'Partner',
  'Registration Date',
  'Override',
]

const table_content = [
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
  {
    partner: 'Kumer Sangakara',
    registrationDate: '15 May 2020 8:30 am',
    override: 32.34,
  },
]

function MyTeam() {
  return (
    <div className="my-team">
      <div className='my-team-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'My Team'}
        />
        <div className='referral'>
          <Text
            className={'P5 dark_3'}
            text={'Referral link'}
          />
          <InputWithButton
            icon={'fa fa-link'}
            disabled
            text={'https://arbitex.io/?ref=karimjanat'}
            btnText = {'copy'}
            onClick = {() => {
            }}
          />
        </div>
      </div>
      <div className='my-team-content'>
        <div className='row'>
          <Statistics
            icon = {'fa fa-user'}
            iconColor = {'secondary'}
            title = {'Total Partners / Active'}
            value = {'12'}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-cc-amex'}
            iconColor = {'danger'}
            title = {'Partners Investments'}
            value = {'4230'}
            unit = {'USD'}
            className = {''}
          />
          <Statistics
            icon = {'fa fa-dollar'}
            iconColor = {'info'}
            title = {'Earned From Partners'}
            value = {'4280'}
            unit = {'USD'}
            className = {''}
          />
        </div>
        <div className='row'>
          <div className='referals'>
            <Text 
              className={'H3 dark_1 caption'}
              text = {'Referals'}
            />
            <div className='table-title'>
              {
                table_title.map(item => (
                  <div className='table-title-item'>
                    {item}
                  </div>
                ))
              }
            </div>
            <div className='table-content'>
              {
                table_content.map(item => (
                  <div className='table-content-item'>
                    {
                      Object.entries(item).map(i => (
                        (i[0] == 'action') ? (
                          <i className={i[1]} />
                        ) : (
                        <div className={`${i[0]} ${i[0]==='status' && i[1]}`}>
                          {i[1]}
                          {
                            (i[0] === 'destination' || i[0] === 'txID') && 
                            (<>
                              <i className='fa fa-link' />
                              <i className='fa fa-copy' />
                            </>)
                          }
                        </div>)
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTeam;