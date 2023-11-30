import './style.scss'

function TextArea({
  text,
  classNames,
  placeholder,
  onChange,
  ...restProps
}) {
  return (
    <div className={`textarea ${classNames}`} {...restProps}>
      <textarea 
        placeholder={placeholder} 
        value={text} 
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default TextArea;