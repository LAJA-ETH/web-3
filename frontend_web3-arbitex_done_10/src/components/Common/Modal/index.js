import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './style.scss'

function CustomModal({
  open,
  onClose,
  showCloseIcon = true,
  children,
  className,
  ...restProps
}) {
  const closeIcon = (
    <svg 
      viewBox="0 0 36 36" 
      width="28" 
      height="28" 
      data-testid="close-icon"
      fill='white'
    >
      <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path>
    </svg>
  );
  return (
    <>
      <Modal 
        open={open} 
        onClose={onClose} 
        center
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}
        closeIcon={closeIcon}
        showCloseIcon = {showCloseIcon}
      >
        {children}
      </Modal>
    </>
  )
}

export default CustomModal;