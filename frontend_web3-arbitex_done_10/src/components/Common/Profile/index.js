import './style.scss'
import {
  useState, 
  useEffect,
  useRef,
} from 'react'
import editProfileImg from '../../../assets/img/edit_profile.png';
import emptyImg from '../../../assets/img/empty.png';

function Profile({
  _img,
  className,
  onChange,
  ...restProps
}) {
  let inputElement = useRef();

  const onSelectImage = () => {
    inputElement.click();
  }

  const onImageChange = () => {
    const file = document.querySelector('input[type=file]').files[0];
    onChange(file);
  }

  return (
    <div className={`profile ${className}`} {...restProps}>
      <img 
        src={process.env.REACT_APP_ASSETS_SERVER + _img} 
        className='user-img'
      />
      <img 
        src={editProfileImg} 
        className='edit-profile-img' 
        onClick={onSelectImage}
      />
      <input 
        type="file" 
        onChange={onImageChange} 
        ref={input => inputElement = input}
      />
    </div>
  )
}

export default Profile;