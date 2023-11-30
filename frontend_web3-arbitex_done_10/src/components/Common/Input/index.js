import {useState, useEffect} from 'react';
import './style.scss'

function Input({
  text,
  classNames,
  frontImg,
  backImg,
  placeholder,
  icon,
  icon2,
  icon2Disable,
  show = true,
  disabled = false,
  onChange,
  ...restProps
}) {
  const [_show, setShow] = useState(show);

  useEffect(() => {
    setShow(show)
  }, [show])

  return (
    <div className={`input ${classNames}`} {...restProps}>
      {frontImg && <img className='frontImg' src={frontImg} />}
      {icon && <i className={icon} />}
      <input 
        type = {_show ? 'text' : 'password'}
        placeholder={placeholder} 
        value={text} 
        onChange={e => onChange(e.target.value)}
        disabled = {disabled}
      />
      {icon2 && <i className={`${_show ? icon2 : icon2Disable} backImg`} 
        onClick={() => {
          setShow(!_show)
        }}
      />}
      {backImg && <img className='backImg' src={backImg} />}
    </div>
  )
}

export default Input;