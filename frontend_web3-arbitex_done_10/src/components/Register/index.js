import {
  useNavigate
} from 'react-router-dom'

import {
  useState,
  useEffect,
} from 'react';

import Text from '../Common/Text'
import Hr from '../Common/Hr'
import Input from '../Common/Input'
import Button from '../Common/Button'
import Modal from '../Common/Modal';
import './style.scss';
import arbImg from '../../assets/img/arb.png'
import emailImg from '../../assets/img/email.png'
import lockImg from '../../assets/img/lock.png'
import eyeImg from '../../assets/img/eye.png'
import userImg from '../../assets/img/user.png'


import { connect } from 'react-redux';

import Loading from '../Common/Loading'

import {
  userRegisterRequest,
} from '../../actions/authAction'

import {
  termsOfService,
  investorAgreement,
} from '../../consts/index'
import { displayMsg } from '../../utils/toast';

import metamask from '../../assets/img/metamask.png'

import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Register({
  error,
  user,
  loading,
  userRegisterRequest,
}) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false)


  useEffect(() => {
    if (!!user) {
      navigate('/')
    }
  }, [user])

  // useEffect(() => {
  //   if(!localStorage.agree) {
  //     setOpen(true);
  //   }
  // }, [])

  const [first, setFirst] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const displayError = (value) => {
    if (!error)
      return null;
    let errorMsg = '';
    error.map(item => {
      if (item.param === value) {
        errorMsg = item.message;
      }
    })
    return errorMsg;
  }

  useEffect(() => {

    userRegisterRequest(address, address);

  }, [isConnected])

  const signUp = () => {
    if (!localStorage.agree) {
      setOpen(true);
      if (!first) {
        setFirst(1);
      } else {
        displayMsg('You must agree the following terms', 'error');
      }
      return;
    }

    // const registerInfo = {
    //   username,
    //   // email,
    //   password,
    //   // referralcode: referralId,
    // };

    userRegisterRequest(username, password);
  }

  return (
    <div className="register">
      <div className='register-left'>
        <img src={arbImg} />
      </div>
      <div className='register-right'>
        <div className='register-right-container'>
          <Text
            className={'H1 dark_1'}
            text={'Create an account'}
          />
          <Text
            className={'sub-title P4 dark_3'}
            text={'Welcome to Arbitex.io'}
          />
          <Hr className={'first-hr'} />
          <Text
            className={'input-text H6 dark_1'}
            text={'Username'}
          />
          <Input
            icon={'fa fa-user'}
            placeholder={'Username'}
            text={username}
            onChange={value => setUsername(value)}
          />
          <Text
            className={'input-text H6 danger'}
            text={displayError('username')}
          />
          {/* <Text
            className={'input-text H6 dark_1'}
            text={'Email'}
          /> */}
          {/* <Input
            icon={'fa fa-envelope'}
            placeholder={'Email address'}
            text={email}
            onChange={value => setEmail(value)}
          /> */}
          {/* <Text
            className={'input-text H6 danger'}
            text={displayError('email')}
          /> */}
          <Text
            className={'input-text H6 dark_1'}
            text={'Password'}
          />
          <Input
            icon={'fa fa-lock'}
            icon2={'fa fa-eye'}
            icon2Disable={'fa fa-eye-slash'}
            show={false}
            placeholder={'Password'}
            text={password}
            onChange={value => setPassword(value)}
          />
          <Text
            className={'input-text H6 danger'}
            text={displayError('password')}
          />
          <Hr className={'second-hr'} />
          <Button
            className={'register-btn space-x'}
            text={'Sign Up'}
            onClick={signUp}
            loading={loading}
          />
          <Text

            className={'H5 dark_1 text-but'}
            text={'or'}
          />
          <Button
            className={'register-btn space-x'}
            iconPos='metamask'
            icon={metamask}
            image={true}
            text={isConnected ? 'Connected' : 'SignUp With Metamask'}
            onClick={connect}
            loading={loading}
          />
          <Text
            className={'no-account P4 dark_3'}
            text={"Already have an account"}
            style={{
              textAlign: 'center'
            }}
          />
          <Button
            className={'signup-btn'}
            text={'Login'}
            onClick={() => {
              window.location = '/login'
            }}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        showCloseIcon={false}
      >
        <div className='agree-modal'>
          <div className='action'></div>
          <div className='agree-modal-content'>
            <div className='agree-modal-content-item'>
              <Text
                className={'H3 dark_1 caption'}
                text={'TERMS OF SERVICE AGREEMENT'}
              />
              <div className='content'>
                <Text
                  className={'P3 dark_2 desc'}
                  text={termsOfService}
                />
                <Hr />
              </div>
            </div>
            <div className='agree-modal-content-item'>
              <Text
                className={'H3 dark_1 caption'}
                text={'ARBITEX INVESTOR AGREEMENT'}
              />
              <div className='content'>
                <Text
                  className={'P3 dark_2 content desc'}
                  text={investorAgreement}
                />
                <Hr />
              </div>
            </div>
          </div>
          <div className='agree-modal-footer'>
            <div className='agree-text'>
              <div
                className={`checkbox ${agree && 'select'}`}
                onClick={() => { setAgree(!agree) }}
              />
              <Text
                className={'dark_1 P3'}
                text={'Do you agree?'}
              />
            </div>
            {
              agree &&
              <Button
                className={`btn ${agree ? 'bg-main' : 'bg-dark_3'} btn_lg dark_7`}
                text={"Confirm"}
                onClick={() => {
                  setOpen(false);
                  localStorage.agree = true;
                  signUp();
                }}
              />
            }
          </div>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.register.error,
  loading: state.register.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userRegisterRequest: (username, password) => dispatch(userRegisterRequest(username, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);