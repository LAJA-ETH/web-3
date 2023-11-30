import Text from '../Text';
import './style.scss'

function Back({
  text,
  icon,
  className,
  ...restProps
}) {
  return (
    <div className={`back ${className}`} {...restProps}  onClick={() => {
      window.history.back();
    }}>
      <i className={icon} />
      <Text text={text} />
    </div>
  )
}

export default Back;