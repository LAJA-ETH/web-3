import './style.scss'
import Text from '../Text';
import Button from '../Button';

function TrainingCard({
  img,
  playImg,
  title,
  content,
  className,
  short,
  ...restProps
}) {
  return (
    <div className={`training-card ${className}`} {...restProps}>
      <div className='img'>
        <img src={img} className = 'mainImg'/>
        <img src = {playImg} className = 'playImg'/>
      </div>
      <div className='training-card-content'>
        <Text
          className={'title H4 dark_1'}
          text={title}
        />
        <Text
          className={'content P4 dark_3'}
          text={content}
        />
        {!short && 
        <div className='action'>
          <Button
            className={'btn_md dark_3'}
            text={'Read more'}
          />
          <i className='fa fa-long-arrow-right dark_3' />
        </div>
        }
      </div>
    </div>
  )
}

export default TrainingCard;