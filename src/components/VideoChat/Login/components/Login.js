import React, {useState, useEffect} from 'react';
import Spinner from '../../Spinner/Spinner';
import axios from 'axios';
import './login.scss';

export function Login({setPageState}) {
  const [userData, setUserData] = useState({
    login: '',
    password: ''
  });

  const [spinner, setSpinner] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if(!userData.login || !userData.password){
      return;
    }

    setSpinner(true);
    const response = await axios.post('https://rocky-reef-68087.herokuapp.com/auth', userData, {withCredentials: true});
    if(response.status === 200) {
      localStorage.setItem('logined', true);
      setPageState('Logined');
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
