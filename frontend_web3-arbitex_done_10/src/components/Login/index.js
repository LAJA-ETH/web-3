import {
  useNavigate
} from 'react-router-dom'

import {
  useState,
  useEffect,
} from 'react'

import Text from '../Common/Text'
import Hr from '../Common/Hr'
import Input from '../Common/Input'
import Button from '../Common/Button'

import './style.scss';
import arbImg from '../../assets/img/arb.png'
import emailImg from '../../assets/img/email.png'
import lockImg from '../../assets/img/lock.png'
import metamask from '../../assets/img/metamask.png'

import { connect } from 'react-redux';

import {
  userLoginRequest
} from '../../actions/authAction'

import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


function Login({
  error,
  user,
  loading,
  userLogin,
}) {

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  let navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!!user) {
      navigate('/')
    } else
      navigate('/login')
  }, [user])

  useEffect(() => {

    userLogin(address, address);

  }, [isConnected])

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

  const login = () => {
    // const loginInfo = {
    //   email,
    //   password
    // }

    userLogin(email, password);
  }

  return (
    <div className="login">
      <div className='login-left'>
        <img src={arbImg} />
      </div>
      <div className='login-right'>
        <div className='login-right-container'>
          <Text
            className={'H1 dark_1'}
            text={'Login to account'}
          />
          <Text
            className={'sub-title P4 dark_3'}
            text={'Welcome to Arbitex.io'}
          />
          <Hr className={'first-hr'} />
          <Text
            className={'input-text H6 dark_1'}
            text={'Email'}
          />
          <Input
            icon={'fa fa-envelope'}
            placeholder={'Email'}
            text={email}
            onChange={value => setEmail(value)}
          />
          <Text
            className={'input-text H6 danger'}
            text={displayError('email')}
          />
          <div
            className='input-text'
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <Text
              className={'H6 dark_1'}
              text={'Password'}
            />
            {/* <Text
              className={'P5 info'}
              text={'Forgot password?'}
            /> */}
          </div>
          <Input
            icon={'fa fa-lock'}
            icon2={'fa fa-eye'}
            icon2Disable={'fa fa-eye-slash'}
            placeholder={'Password'}
            text={password}
            show={false}
            onChange={value => setPassword(value)}
          />
          <Text
            className={'input-text H6 danger'}
            text={displayError('password')}
          />

          <Hr className={'second-hr'} />
          <Button
            className={'login-btn'}
            text={'Login'}
            onClick={login}
            loading={loading}
          />
          <Text

            className={'H5 dark_1 text-but'}
            text={'or'}
          />
          <Button
            className={'login-btn space-x'}
            iconPos='metamask'
            icon={metamask}
            image={true}
            text={isConnected ? 'SingUp To Enter' : 'Login With Metamask'}
            onClick={connect}
            loading={loading}
          />



          <Button
            className={'signup-btn'}
            text={'Sign Up'}
            onClick={() => {
              window.location = '/register'
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (email, password) => dispatch(userLoginRequest(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);