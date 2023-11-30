import './style.scss'

function Text({
  text,
  className,
  ...restProps
}) {
  return (
    <div className={`title ${className}`} {...restProps}>
      {text}
    </div>
  )
}

export default Text;