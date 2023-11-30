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

const data = [
  {
    title: 'Trading Cashout Requests - New Version',
    date: '10-06-2022     10:34:08 AM',
    version: '1.0',
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum classical Latin literature from 45 BC, making it over 2000 years old generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    end: 'VERY IMPORTANT: PLEASE ENSURE THE WALLET ADDRESS ON FILE IS CORRECT BEFORE SUBMITTING YOUR REQUEST',
  },
  {
    title: 'ROI Processing Update',
    date: '10-06-2022     10:34:08 AM',
    version: "1.0",
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    end: 'NovaTech Admin',
  },
  {
    title: 'Trading Cashout Requests - New Version',
    date: '10-06-2022     10:34:08 AM',
    version: '1.0',
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum classical Latin literature from 45 BC, making it over 2000 years old generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    end: 'VERY IMPORTANT: PLEASE ENSURE THE WALLET ADDRESS ON FILE IS CORRECT BEFORE SUBMITTING YOUR REQUEST',
  },
  {
    title: 'ROI Processing Update',
    date: '10-06-2022     10:34:08 AM',
    version: '1.0',
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    end: 'NovaTech Admin',
  },
]

function Announcements() {
  return (
    <div className="announcements">
      <div className='announcements-header'>
        <Back 
          icon={'fa fa-chevron-left'} 
          text={'Back'}
          className={'btn_md main'}
        />
        <Text 
          className='caption H2 dark_1' 
          text = {'Announcements'}
        />
      </div>
      <div className='announcements-content'>
        {
          data.map(item => (
            <div className='item'>
              <div className='row'>
                <Text
                  className={'H3 dark_1'}
                  text = {item.title}
                />
              </div>
              <div className='row'>
                <Text
                  className={'H6 dark_1'}
                  text = {'Announcement Date: '}
                />
                <Text
                  className={'H6 dark_3'}
                  text = {item.date}
                />
              </div>
              <div className='row'>
                <Text
                  className={'H6 dark_1'}
                  text = {'Version: '}
                />
                <Text
                  className={'H6 dark_3'}
                  text = {item.version}
                />
              </div>
              <div className='row'>
                <Text
                  className={'P4 dark_2'}
                  text = {item.content}
                />
              </div>
              <div className='row'>
                <Text
                  className={'P4 dark_1'}
                  text = {item.end}
                />
              </div>
            </div>
          ))
        }
      </div>
      {/* <div className='announcements-footer'>
        <Text 
          className={'P4 dark_3'}
          text={'Showing 11 to 80 selected options'}
        />
        <Paginate
          pageCount = {10}
        />
      </div> */}
    </div>
  )
}

export default Announcements;