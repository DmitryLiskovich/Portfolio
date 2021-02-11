import React, {useState} from 'react';
import Spinner from '../../Spinner/Spinner';
import axios from 'axios';
import './login.scss';

const envURL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://ghostly-eyeballs-06543.herokuapp.com'

export function SignUp({setPageState}) {
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    confPassword: '',
    email: '',
  });

  const [spinner, setSpinner] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if(!userData.login || !userData.password){
      return;
    }

    setSpinner(true);
    try {
      const resp = await axios.post(envURL+'/register', userData);
      console.log(resp);
    }
    catch (err) {
      setSpinner(false);
    }
    setSpinner(false);
    setPageState('Login');
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
          <h2 className="form-signin-heading">Sign up</h2>
          <label htmlFor='login'>Login</label>
          <input id='login' placeholder="login" type="text" name='login' value={userData.login} onChange={changeHandler}/>
          <label htmlFor='login'>Passowrd</label>
          <input type="password" autoComplete="off" id='password' className="form-control" name="password" placeholder="password" value={userData.password} onChange={changeHandler}/>
          <label htmlFor='confPassword'>Confirm Passowrd</label>
          <input id='confPassword' autoComplete="off" placeholder="Password" type="password" name='confPassword' value={userData.confPassword} onChange={changeHandler}/>
          <label htmlFor='login'>Email (optional)</label>
          <input id='email' placeholder="email" type="mail" name='email' value={userData.email} onChange={changeHandler}/>
          <label htmlFor='login'>First Name</label>
          <input id='first_name' placeholder="first_name" type="text" name='first_name' value={userData.first_name} onChange={changeHandler}/>
          <label htmlFor='login'>Last Name</label>
          <input id='last_name' placeholder="last_name" type="mail" name='last_name' value={userData.last_name} onChange={changeHandler}/>
          <input className="submitButton" type="submit" value='Start!'/>
          <h2>Do have an account?</h2>
          <button onClick={() => setPageState('Login')} className='reg_btn'>Sign In</button>
        </form>
      </div>
    </div>
  )
}
