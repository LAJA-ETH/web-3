import './style.scss'
import Button from '../Button';
import Input from '../Input';

function InputWithButton({
  text,
  classNames,
  icon,
  onClick,
  btnText,
  onChange,
  ...restProps
}) {
  return (
    <div className={`inputWithButton ${classNames}`} {...restProps}>
      <Input
        icon={icon}
        text={text}
      />
      <Button
        className={'bg-main dark_7'}
        text={btnText}
        onClick = {onClick}
      />
    </div>
  )
}

export default InputWithButton;