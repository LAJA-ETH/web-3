import './style.scss'
import Text from '../Text';
import Button from '../Button';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function AccountStatistics({
  title,
  realBalance,
  color,
  percent = 0,
  availableBalance,
  profitAmount,
  depositBalance,
  totalWithdrawed,
  pendingWithdraw,
  className,
  ...restProps
}) {
  return (
    <div className={`account-statistics ${className}`} {...restProps}>
      <div className='account-statistics-header'>
        <div className='percent'>
          <CircularProgressbar 
            className='circle-outer'
            value={percent} 
            text={`${percent}%`} 
            styles={buildStyles({
              textColor: "#909696",
              pathColor: color,
              trailColor: "#4E5252"
            })}
          />;
        </div>
        <div className='title'>
          <Text
            text={title}
            className={'H6 dark_2'}
          />
          <Text
            text={realBalance > 0 ? realBalance : 0}
            className={'H3 dark_1'}
          />
        </div>
      </div>
      <div className='account-statistics-content'>
        <div className='item'>
          <Text 
            text={'Avaliable balance'}
            className={'P5 dark_3'}
          />
          <Text 
            text={availableBalance + ' USDT'}
            className={'H6 dark_1'}
          />
        </div>
        <div className='item'>
          <Text 
            text={'Profit amount'}
            className={'P5 dark_3'}
          />
          <Text 
            text={profitAmount + ' USDT'}
            className={'H6 dark_1'}
          />
        </div>
        <div className='item'>
          <Text 
            text={'Deposit amount'}
            className={'P5 dark_3'}
          />
          <Text 
            text={depositBalance + ' USDT'}
            className={'H6 dark_1'}
          />
        </div>
        <div className='item'>
          <Text 
            text={'Total withdrawed'}
            className={'P5 dark_3'}
          />
          <Text 
            text={totalWithdrawed + ' USDT'}
            className={'H6 dark_1'}
          />
        </div>
        <div className='item'>
          <Text 
            text={'Pending withdraw'}
            className={'P5 dark_3'}
          />
          <Text 
            text={pendingWithdraw + ' USDT'}
            className={'H6 dark_1'}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountStatistics;