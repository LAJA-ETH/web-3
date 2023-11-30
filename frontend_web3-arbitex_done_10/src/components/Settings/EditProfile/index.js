import {useState, useEffect} from 'react'
import Text from '../../Common/Text';
import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Profile from '../../Common/Profile';
import userImg from '../../../assets/img/user.png';
import './style.scss'
import apiServer from '../../../api'

import {connect} from 'react-redux';

import {
  displayDate
} from '../../../utils'

import {
  setCurrentUser
} from '../../../actions/authAction';

function EditProfile({
  user,
  setCurrentUser,
}) {
  const [registrationDate, setRegistrationDate] = useState('May-23-2022 05:58:38 AM');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImg, setProfileImg] = useState(userImg);

  const onImageChanged = (e) => {
    let formData = new FormData();
    formData.append("image", e);
    apiServer
      .post(`/users/auth/avatar/${user.id}`, formData)
      .then((res) => {
        console.log('@@@', res.data);
        const {filename} = res.data.data;
        setCurrentUser({
          ...user,
          filename,
        })
      })
      .catch((err) => {
        console.log('@@@', err);
      })
    //setProfileImg(e);
  }

  useEffect(() => {
    setProfileImg(user.filename);
  }, [user])

  return (
    <div className="edit-profile">
      <Text
        className={'H3 dark_1'}
        text={'Edit Profile'}
      />
      <Profile
        _img = {profileImg}
        className='my-profile'
        onChange={onImageChanged}
      />
      <div className='info'>
        <i 
          className={'fa fa-user dark_4'} 
        />
        <div classsName='detail'>
          <Text
            className={'H6 dark_3'}
            text='Registration date'
          />
          <Text
            className={'P4 dark_1'}
            text={displayDate(user.created_at)}
          />
        </div>
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_3'}
          text={'Email'}
        />
        <Input
          text={user.email}
          icon={'fa fa-user'}
          disabled
        />
      </div>
      <div className='item'>
        <Text
          className={'cap H6 dark_3'}
          text={'Username'}
        />
        <Input
          text={user.username}
          icon={'fa fa-user'}
          disabled
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (payload) => dispatch(setCurrentUser(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);