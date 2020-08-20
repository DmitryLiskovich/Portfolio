import React, {useState, useEffect} from 'react';
import Spinner from '../../Spinner/Spinner';
import axios from 'axios';
import './login.scss';

const envURL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://rocky-reef-68087.herokuapp.com'

export function Login({setPageState}) {
  const [userData, setUserData] = useState({
    login: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [spinner, setSpinner] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if(!userData.login || !userData.password){
      return;
    }

    setSpinner(true);
    try {
      const response = await axios.post(envURL+'/auth', userData, {withCredentials: true});
      if(response.status === 200) {
        localStorage.setItem('logined', true);
        setPageState('Logined');
      }
    } 
    catch(e) {
      console.log(e);
      setSpinner(false);
      setErrorMessage('Login or password is not correct');
    }
    setSpinner(false);
  }

  function changeHandler(e) {
    e.persist();
    setUserData(data => ({...data, [e.target.name]: e.target?.value}));
  }

  return (
    <div className='login-wrap'>
      <div>
        <form className='user-connection' onSubmit={submit}>
        {spinner && <Spinner></Spinner>}
          <h2 className="form-signin-heading">Sign in</h2>
          <p className={errorMessage ? 'error-active' : ''}>{errorMessage}</p>
          <label htmlFor='login'>Login</label>
          <input id='login' placeholder="login" type="text" name='login' value={userData.login} onChange={changeHandler}/>
          <label htmlFor='login'>Passowrd</label>
          <input type="password" id='password' className="form-control" name="password" placeholder="password" value={userData.password} onChange={changeHandler}/>
          <input className="submitButton" type="submit" value='Login'/>
          <h2>Don't have an account?</h2>
          <button onClick={() => setPageState('Reg')} className='reg_btn'>Create an account</button>
        </form>
      </div>
    </div>
  )
}
