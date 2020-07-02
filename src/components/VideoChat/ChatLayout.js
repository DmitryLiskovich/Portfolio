import React, {useRef, useEffect, useState, useContext} from 'react';
import {Socket} from '../../socketContext/socket';
import './chatLayout.scss'
import { TextChat } from './TextChat/TextChat';
import {InitialScreen} from './InitialScreen/InitialScreen';
import axios from 'axios';
import {UserList} from './UserList/UserList';
import {PageState} from './Login/Auth';

export const UserInfo = React.createContext()

export default function Chat() {
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const pageState = useContext(PageState);

  useEffect(()=>{
    (async ()=>{
      const user = await axios.get('http://localhost:8000/users', {withCredentials: true});
      const users = await axios.get('http://localhost:8000/allUsers', {withCredentials: true});
      setUserList(users.data);
      setUserInfo(user.data);
    })();
  }, []);


	return (
		<div className="chat-wrapper">
      <UserInfo.Provider value={userInfo}>
        <UserList usersList={userList} pageState={pageState} setSelectedUser={setSelectedUser}/>
        {!selectedUser && <InitialScreen></InitialScreen>}
        {selectedUser &&<TextChat pageState={pageState} selectedUser={selectedUser}></TextChat>}
      </UserInfo.Provider>
		</div>
	);
}
