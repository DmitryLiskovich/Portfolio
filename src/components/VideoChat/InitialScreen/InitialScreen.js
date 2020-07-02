import React, {useContext} from 'react';
import {UserInfo} from '../ChatLayout'
import './initialScreen.scss';

export function InitialScreen() {
  const user = useContext(UserInfo);

  return (
    <div className='initial-screen'>
      <h2>
      {user.first_name} {user.last_name}<br/>
        Welcom to my application.
      </h2>
    </div>
  )
}
