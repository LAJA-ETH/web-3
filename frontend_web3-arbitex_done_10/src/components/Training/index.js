import Back from '../Common/Back'
import Text from '../Common/Text'
import AccountStatistics from '../Common/AccountStatistics';
import Balance from '../Common/Balance';
import Paginate from '../Common/Paginate';
import TrainingCard from '../Common/TrainingCard';
import './style.scss';
import Hr from '../Common/Hr';
import balance1Img from '../../assets/img/dashboard/balance1.png'
import balance2Img from '../../assets/img/dashboard/balance2.png'
import Button from '../Common/Button';
import _1Img from '../../assets/img/training/1.png' 
import _2Img from '../../assets/img/training/2.png' 
import _3Img from '../../assets/img/training/3.png' 
import _4Img from '../../assets/img/training/4.png' 
import _5Img from '../../assets/img/training/5.png' 
import _6Img from '../../assets/img/training/6.png' 
import _7Img from '../../assets/img/training/7.png' 
import _8Img from '../../assets/img/training/8.png' 
import playImg from '../../assets/img/training/play.png' 
import { useNavigate } from 'react-router-dom';

const data = [
  {
    img: _1Img,
    title: 'How to setup KYC?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _2Img,
    title: 'How to deposit?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _3Img,
    title: 'How to withdraw?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _4Img,
    title: 'How to purchase Pkg?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _5Img,
    title: 'How Arbitex Works?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _6Img,
    title: 'How to refer people?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _7Img,
    title: 'How to add money?',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
  {
    img: _8Img,
    title: 'How to setup manual or auto trading mode',
    content: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.'
  },
]

function Training() {
  const navigate = useNavigate();
  return (
    <div className="training">
      <div className='training-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Training'}
        />
        <Button
          className={'btn bg-main dark_7 btn-md'}
          text={'FAQs'}
          onClick={() => {
            navigate('/faqs');
          }}
        />
      </div>
      <div className='training-content'>
        <div className='training-content-left'>
          {
            data.map(item => (
              <TrainingCard
                img = {item.img}
                title = {item.title}
                content = {item.content}
              />
            ))
          }
        </div>
        <div className='training-content-right'>
          <Text
            className={'H4 dark_1'}
            text={'Watch Video'}
          />
          {
            data.map(item => (
              <TrainingCard
                img = {item.img}
                playImg = {playImg}
                title = {item.title}
                content = {item.content}
                short
                className = {'horizontal'}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Training;