import './style.scss'
import Text from '../Text';

function Statistics({
  icon,
  iconColor,
  title,
  value,
  unit,
  raise,
  raiseColor,
  className,
  ...restProps
}) {
  return (
    <div className={`statistics ${className}`} {...restProps}>
      <div className={`statistics-icon ${'bg-'+iconColor+'_shade'} ${iconColor}`}>
        <i 
          className={icon} 
        />
      </div>
      <div className='statistics-content'>
        <div className='title'>
          <Text 
            text={title}
            className='P2 dark_2'
          />
        </div>
        <div className='value'>
          <Text 
            text={value > 0 ? value : 0} 
            className='H1 dark_1'
          />
          <Text 
            text={unit} 
            className='H3 dark_3'
          />
        </div>
      </div>
    </div>
  )
}

export default Statistics;