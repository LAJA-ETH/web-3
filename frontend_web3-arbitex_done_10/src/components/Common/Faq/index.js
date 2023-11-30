import './style.scss'
import Text from '../Text';
import Button from '../Button';

function Faq({
  index,
  question,
  answer,
  className,
  ...restProps
}) {
  return (
    <div className={`faq ${className}`} {...restProps}>
      <div className='faq-header'>
        <div className='img'>
          <Text
            className={'H6 dark_7'}
            text = {index}
          />
        </div>
        <Text
          className={`H4 dark_1`}
          text={question}
        />
      </div>
      
      <div className='faq-content'>
        <Text
          className={`P4 dark_2`}
          text={answer}
        />
      </div>
    </div>
  )
}

export default Faq;