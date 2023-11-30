import './style.scss'
import Text from '../Text'
import selectEffectImg from '../../../assets/img/select-effect.png'

function NavbarItem({
  text,
  frontImg,
  icon,
  selected = false,
  className,
  ...restProps
}) {
  return (
    <div 
      className={`navbar-item ${className} ${selected && 'selected'}`} 
      {...restProps}
    >
      {selected && <img src={selectEffectImg} className='navbar-item-left' />}
      {frontImg && <img src={frontImg} className='navbar-item-img'/>}
      {icon && <i className={icon} />}
      <Text
        text = {text}
        className = {selected ? 'dark_1' : 'dark_3'}
      />
    </div>
  )
}

export default NavbarItem;