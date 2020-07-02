import React, { useState, useEffect, useContext } from 'react'
import './userlist.scss';
import { UserInfo } from '../ChatLayout'

export const UserList = React.memo(function UserList({usersList, pageState, setSelectedUser}) {
  const [users, setUsers] = useState([]);
  const userInfo = useContext(UserInfo);

  useEffect(()=>{
    setUsers(usersList);
  }, [usersList]);

  function getRandom(max) {
    return '#' + Math.floor(Math.random() * Math.floor(max)).toString(16);
  }

  function hexContrastCalc(hex) {
    const red = parseInt(hex[1]+hex[2], 16);
    const green = parseInt(hex[3]+hex[4], 16);
    const blue = parseInt(hex[5]+hex[6], 16);
    return red*0.2126 + green*0.7152 + blue*0.0722 < 126;
  }

  function selectUser(e) {
    setSelectedUser({id: e.target.getAttribute('data-id'), username: e.target.innerText});
  }

  function logOut() {
    localStorage.removeItem('logined');
    pageState('Login');
    window.location.reload();
  }

  return (
    <div className='user-list-wrapper'>
      <div className='user-info'>
        <h3>{userInfo.first_name} {userInfo.last_name}</h3>
        <i onClick={logOut} className="fas fa-sign-out-alt"></i>
      </div>
      <div className="list-controllers">
        <button className="user-changer">My Contacts</button>
        <button className="user-changer">All Users</button>
      </div>
      <input type="text" className="find user" value='Enter first and last name'></input>
      <ul className='user-list'>
        {users.map((user, index) => {
          const bg = getRandom(16777214).padEnd(7, '0');
          const clr = hexContrastCalc(bg);
          if(user.login === userInfo.login) {
            return ''
          }
          return <li onClick={selectUser} key={index} data-id={user.id}><span style={{background: bg, color: clr ? '#fff' : '#000'}}>{user.first_name[0]}{user.last_name[0]}</span>{user.first_name} {user.last_name}</li>
        })}
      </ul>
    </div>
  )
});
