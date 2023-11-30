import './style.scss'
import Text from '../Text';
import Button from '../Button';

function Balance({
  img,
  title,
  profit,
  activeDeposit,
  earnedProfit,
  className,
  ...restProps
}) {
  return (
    <div className={`balance ${className}`} {...restProps}>
      <div className='balance-row'>
        <div className='title'>
          <img src={img} />
          <Text
            className={'H3 dark_1'}
            text={title}
          />
        </div>
        <div className='activeDeposit'>
          <Text
            className={'P5 dark_3'}
            text={'Active Deposit'}
          />
          <Text
            className={'H6 dark_1'}
            text={activeDeposit + ' USDT'}
          />
        </div>
      </div>
      <div className='balance-row'>
        <div className='earnedProfit'>
          <Text
            className={'P5 dark_3'}
            text={'Account Balance'}
          />
          <Text
            className={'H6 dark_1'}
            text={profit > 0 ? profit : 0 + ' USDT'}
          />
        </div>
        <div className='earnedProfit'>
          <Text
            className={'P5 dark_3'}
            text={'Earned Profit'}
          />
          <Text
            className={'H6 dark_1'}
            text={earnedProfit + ' USDT'}
          />
        </div>
      </div>
    </div>
  )
}

export default Balance;