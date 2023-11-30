import './style.scss'

function Hr({
  className,
  ...restProps
}) {
  return (
    <div className={`hr ${className}`} {...restProps}>
    </div>
  )
}

export default Hr;