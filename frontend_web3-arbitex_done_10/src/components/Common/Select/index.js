import './style.scss'
import Text from '../Text';
import { useState, useEffect } from 'react';

function Select({
  text,
  icon,
  options = [],
  className,
  placeholder,
  onSelect,
  ...restProps
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {

  }, [text]);
  return (
    <div className={`select ${className}`} {...restProps}>
      <div className='select-input'>
        <Text
          className='input_md dark_1'
          text={text ? options.filter(option => option.value === text)[0]['title'] : ''}
        />
        <i 
          className={icon} 
          onClick = {() => setShow(!show)}
        />
      </div>
      {
        show &&
        <div className='select-content'>
          {
            options.map(item => (
              <div className='select-content-item'>
                <Text
                  className={'input_md dark_1'}
                  text={item.title}
                  onClick = {() => {
                    onSelect(item.value)
                    setShow(false);
                  }}
                />
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Select;