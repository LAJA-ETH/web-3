import './style.scss';
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
import Text from '../Common/Text'
 
function Footer() {
  return (
    <div className="footer">
      <div className='footer-left'>
        <img src={logoImg} />
      </div>
      <div className='footer-right'>
        <Text 
          text={'Payment Currency'}
          className={'H6 dark_1'}
        />
        <img src={_1Img} />
        <img src={_2Img} />
        <img src={_3Img} />
        <img src={_4Img} />
        <img src={_5Img} />
        <img src={_6Img} />
        <img src={_7Img} />
        <img src={_8Img} />
        <img src={_9Img} />
      </div>
    </div>
  )
}

export default Footer;