import React, { useState, useEffect, useContext } from 'react'
import './userlist.scss';
import { UserInfo } from '../ChatLayout'

export const UserList = React.memo(function UserList({usersList, pageState, setSelectedUser, userListIsOpen}) {
  const [users, setUsers] = useState([]);
  const userInfo = useContext(UserInfo);
  const [find, setFind] = useState([]);
  const [filtredUsers, setFiltredUsers] = useState([]);

  const findUser = (e) => {
    e.persist();
    setFind(e.target.value);
    setFiltredUsers(() => {
      return usersList.filter(item => item.login !== userInfo.login && item.first_name.includes(find) || item.last_name.includes(find))
    });
    if (!e.target.value) {
      setFiltredUsers([]);
    }
  }

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

  function getUsersList(arr) {
    return arr.map((user, index) => {
      const bg = getRandom(16777214).padEnd(7, '0');
      const clr = hexContrastCalc(bg);
      if(user.login === userInfo.login) {
        return ''
      };
      return <li onClick={selectUser} key={index} data-id={user.id}><span style={{background: bg, color: clr ? '#fff' : '#000'}}><div className={`status ${user.isOnline ? 'online' : 'offline'}`}></div>{user.first_name[0]}{user.last_name[0]}</span>{user.first_name} {user.last_name}</li>
    })
  }

  return (
    <div className={`user-list-wrapper ${userListIsOpen ? 'show' : 'hidden'}`}>
      <div className='user-info'>
        <h3>{userInfo.first_name} {userInfo.last_name}</h3>
        <div call='controll'>
          <i onClick={logOut} className="fas fa-sign-out-alt"></i>
        </div>
      </div>
      <div className="list-controllers">
        <button className="user-changer">My Contacts</button>
        <button className="user-changer">All Users</button>
      </div>
      <input type="text" value={find} onChange={findUser} className="find user" placeholder="Start typing"></input>
      <ul className='user-list'>
        {filtredUsers.length || find.length ? getUsersList(filtredUsers) : getUsersList(users)}
      </ul>
    </div>
  )
});
