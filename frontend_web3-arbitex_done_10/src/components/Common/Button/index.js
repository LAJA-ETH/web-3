import Loading from '../Loading';
import './style.scss'

function Button({
  text,
  iconPos = 'front',
  icon,
  border,
  image,
  className,
  loading = false,
  loadingType = 'pulse',
  ...restProps
}) {
  return (
    <div className={`button ${className} ${border && 'border'} ${loading && 'loading'}`} {...restProps}>
      {icon && iconPos == 'front' && <i className={icon} />}
      {image ? <img src={icon} width={'25px'} /> : ''}{text}
      {icon && iconPos == 'back' && <i className={icon} />}
      {loading && <Loading type={loadingType} />}
    </div>
  )
}

export default Button;