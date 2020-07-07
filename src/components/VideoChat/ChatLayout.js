import React, {useEffect, useState, useContext} from 'react';
import './chatLayout.scss'
import { TextChat } from './TextChat/TextChat';
import { VideoChat } from './VideoChat/VideoChat';
import { InitialScreen } from './InitialScreen/InitialScreen';
import axios from 'axios';
import { UserList } from './UserList/UserList';
import { PageState } from './Login/Auth';
import { Modal } from './ModalNew/Modal';

export const UserInfo = React.createContext()

export default function Chat() {
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [callStatus, setCallStatus] = useState('');
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
    <>
    {callStatus.type === 'request' && <Modal/>}
      <div className="chat-wrapper">
        <UserInfo.Provider value={userInfo}>
          <UserList usersList={userList} pageState={pageState} setSelectedUser={setSelectedUser}/>
          {!selectedUser && <InitialScreen></InitialScreen>}
          {selectedUser &&<TextChat setCallStatus={setCallStatus} pageState={pageState} selectedUser={selectedUser}></TextChat>}
          <VideoChat setCallStatus={setCallStatus} callStatus={callStatus} pageState={pageState} callNumber={selectedUser?.id} myNumber={userInfo.id} ></VideoChat>
        </UserInfo.Provider>
      </div>
    </>
	);
}
