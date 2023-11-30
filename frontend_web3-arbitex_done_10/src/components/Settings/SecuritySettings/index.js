import {useState, useEffect} from 'react'
import Text from '../../Common/Text';
import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import qrImg from '../../../assets/img/QR.png'
import './style.scss'

import {connect} from 'react-redux';
import {
  getQRcode
} from '../../../actions/accountAction'

import {
  setPassword
} from '../../../actions/authAction'
import { displayMsg } from '../../../utils/toast';

function SecuritySettings({
  user,
  qrcode,
  getQRcode,
  setPassword,
}) {
  const [code, setCode] = useState('');
  const [withdrawalPassword, setWithdrawalPassword] = useState('');
  const [qr, setQr] = useState(qrImg);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    getQRcode({
      userId: user.id
    })
  }, [user])


  const onSelect = (value) => {
    
  }

  const changeWithdrawalPassword = () => {

  }

  const enable = () => {
    
  }

  const saveAndUpdate = () => {
    if(!currentPassword) {
      displayMsg('Input current password', "error");
      return;
    }
     
    if((newPassword.length === 0)) {
      displayMsg('Input new password', "error");
      return;
    }

    if((newPassword.length < 6)) {
      displayMsg('The length of password must be over 6', "error");
      return;
    }

    if(newPassword !== confirmPassword) {
      displayMsg('Passwords must be the same', "error");
      return;
    }

    setPassword({
      id: user.id,
      newpwd: newPassword,
      currentpwd: currentPassword,
    });
  }

  return (
    <div className="security-settings">
      <div className='security-settings-col'>
        <div className='container'>
          <Text
            className={'H3 dark_1'}
            text={'Security Settings'}
          />
          <Text
            className={'H5 dark_1'}
            text={'Two Factor Authentication'}
          />
          <div className='letter-group'>
            <Text
              className={'P4 dark_3'}
              text={'1. Insall '}
            />
            <Text
              className={'P4 secondary'}
              text={'Google Authenticator'}
            />
            <Text
              className={'P4 dark_3'}
              text={' on your mobile device.'}
            />
          </div>
          <div className='letter-group'>
            <Text
              className={'P4 dark_3'}
              text={'2. Your secret Code is: '}
            />
          </div>
          <div className='letter-group'>
            <Text
              className={'P4 dark_1'}
              text={user.base32}
            />
          </div>
          <img 
            src={qrcode.url} 
            className={'qr-img'}
          />
          {/* <Text
            className={'P4 dark_3'}
            text={'3. Please enter two factor token from Google Authenticator to verify correct setup:'}
          />
          <Input 
            classNames={'input_lg bg-dark_5'}
            text={code}
            placeholder={'Your code'}
            onChange = {value => setCode(value)}
          />
          <Text
            className={'P4 dark_1'}
            text={'Withdrawal Transaction Password'}
          />
          <Input 
            classNames={'input_lg bg-dark_5'}
            text={withdrawalPassword}
            icon={'fa fa-lock'}
            placeholder={'Withdrawal transaction password'}
            onChange = {value => setWithdrawalPassword(value)}
          />
          <Text
            className={'H6 secondary'}
            text={'Change Withdrawal Password'}
            onClick = {changeWithdrawalPassword}
          /> */}
          {/* <Button
            className={'bg-main dark_7 btn_lg btn'}
            text={'Enable'}
            onClick={enable}
          /> */}
        </div>
      </div>
      <div className='security-settings-col'>
      <div className='container'>
          <Text
            className={'H3 dark_1'}
            text={'Change Login Password'}
          />
          <Text
            className={'H5 dark_1'}
            text={'Current Password'}
          />
          
          <Input 
            classNames={'input_lg bg-dark_5'}
            text={currentPassword}
            icon={'fa fa-user'}
            icon2={'fa fa-eye'}
            placeholder={'Current Password'}
            onChange = {value => setCurrentPassword(value)}
          />
          
          <Text
            className={'H5 dark_1'}
            text={'New Password'}
          />
          
          <Input 
            classNames={'input_lg bg-dark_5'}
            text={newPassword}
            icon={'fa fa-user'}
            icon2={'fa fa-eye'}
            placeholder={'New Password'}
            onChange = {value => setNewPassword(value)}
          />

          <Text
            className={'H5 dark_1'}
            text={'Confirm Password'}
          />
          
          <Input 
            classNames={'input_lg bg-dark_5'}
            text={confirmPassword}
            icon={'fa fa-user'}
            icon2={'fa fa-eye'}
            placeholder={'Confirm Password'}
            onChange={value => setConfirmPassword(value)}
          />

          <Button
            className={'bg-main dark_7 btn_lg btn'}
            text={'Save and Update'}
            onClick={saveAndUpdate}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  qrcode: state.account.qrcode,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getQRcode: (payload) => dispatch(getQRcode(payload)),
    setPassword: (payload) => dispatch(setPassword(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecuritySettings);