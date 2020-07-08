import React, {useState, useEffect, useRef, useContext} from 'react';
import { Socket } from '../../../socketContext/socket';
import { MessageBox } from '../MessageBox/MessageBox';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import './TextChat.scss';

export function TextChat({selectedUser, setCallStatus, call}) {
  const socket = useContext(Socket);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState();
  const [spinner, setSpinner] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const messageBox = useRef(null);
  const inputRef = useRef(null);

  useEffect(()=>{
    setSpinner(true)
    axios.get('http://localhost:8000/users', {withCredentials: true}).then(data => {
      const userInfo = data.data;
      setCurrentUser(userInfo);
      if(userInfo.id === selectedUser.id) {
        window.location.reload();
        return;
      }
      const room = userInfo.sessions && userInfo.sessions[selectedUser.id] ? userInfo.sessions[selectedUser.id] : 'new';
      socket.emit('join', room, [userInfo.id, selectedUser.id]);

      socket.on('message', (message) => {
        setMessages(messages => [...messages, message]);
      })

      socket.on('messages', data => {
        setMessages(data);
      })
      setSpinner(false);
    });

    return () => {
      socket.emit('leave')
      socket.removeAllListeners('message');
      socket.removeAllListeners('messages');
    }
  }, [selectedUser.id]);

  useEffect(()=>{
    messageBox.current.scrollBy(0, messageBox.current.scrollHeight);
  }, [messages])

  function sendData(e) {
    e.preventDefault(e);
    setInput('');
    setMessages(messages => [...messages, {
      message: input,
      user: currentUser.id,
      date: new Date()
    }]);
    socket.send(input);
    inputRef.current.focus();
  }

  function inputHendler(e){
    e.persist();
    setInput(e.target.value);
  }

	return (
		<div className="TextChat">
      <div className="chat-controller">
        <h2>Chat with {selectedUser.username.slice(3)}</h2>
        <div className="buttons">
          <i className="fas fa-user-plus"></i>
          <i onClick={() => setCallStatus({type: 'startCall', user: selectedUser})} className="fas fa-phone"></i>
        </div>
      </div>
			<div ref={messageBox} className='messages-wrap'>
				<MessageBox messages={messages} user={currentUser}></MessageBox>
			</div>
			<div className='input'>
				<form autoComplete='off' onSubmit={sendData}>
					<input name='message' ref={inputRef} value={input} placeholder='Type something...' onChange={inputHendler} type='text'></input>
					<button type='submit'>Send</button>
				</form>
			</div>
      {spinner && <Spinner/>}
		</div>
	);
}
