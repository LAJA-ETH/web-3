import './style.scss'
import Text from '../Text';
import Button from '../Button';

function Card({
  title,
  content = [],
  progress,
  color,
  btnTitle,
  active,
  onClick,
  className,
  ...restProps
}) {
  return (
    <div className={`card ${className}`} {...restProps}>
      <Text
        className={`title ${active ? color : 'dark_3'} H3`}
        text={title}
      />
      <div className='content'>
        {
          content.map(item => (
            <Text 
              className={'content-item P4 dark_2'}
              text = {item}
            />
          ))
        }
      </div>
      {   
        <div className='progress-bar '>
          <div className='fill' style={{width: progress+'%'}}></div>
        </div>
      }
      {
        active && 
        <Button 
          className={`bg-${active ? color : 'dark_3'} action dark_7 btn_md`}
          text = {btnTitle}
          onClick = {onClick}
        />
      }
    </div>
  )
}

export default Card;