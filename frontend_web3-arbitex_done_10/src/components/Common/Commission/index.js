import './style.scss'
import Text from '../Text';
import Button from '../Button';

function Commission({
  img,
  title,
  usdt,
  usd,
  className,
  ...restProps
}) {
  return (
    <div className={`commission ${className}`} {...restProps}>
      <div className='commission-header'>
        <div className='title'>
          <img src={img} />
          <Text
            className={'H6 dark_1'}
            text={title}
          />
        </div>
      </div>
      <div className='commission-content'>
        <Text
          className={'P5 dark_3'}
          text={'Balance'}
        />
        <Text
          className={'P5 dark_3'}
          text={usdt + ' USDT'}
        />
        <Text
          className={'P5 dark_3'}
          text={usd + ' USD'}
        />
      </div>
    </div>
  )
}

export default Commission;