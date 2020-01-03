import React, {useState, useRef, useEffect} from 'react';
import './TextChat.scss';

function TextChat(props) {
	const [messages, setMessage] = useState([]);
  const [isTyping, setIsTyping] = useState({state: false, name: null});
  const selectedUser = props.selectedUser;
  const socket = props.socket;
	let input = '';
	// localStorage.setItem('messages', JSON.stringify(messages));
	const wrap = useRef(null);
	const button = useRef(null);

	useEffect(() => {
		if(wrap.current){
			wrap.current.scrollTop = wrap.current.scrollHeight;
		}
	}, [messages]);
  
  useEffect(() => {
		socket.on('message-from', (data)=>{
			if(data.type === 'typing'){
				setIsTyping({state: true, name: data.message});
			}else if(data.type === 'connect'){
				setMessage((messages) => [...messages, {message: data.message, id: null}]);
			}else if(data.type === 'typing-end'){
				setIsTyping({state: false, name: null});
			}else{
				setMessage((messages) => [...messages, {message: data.input, id: data.id}]);
			}
		});
	}, []);

	function sendData(e){
		e.preventDefault();
		socket.emit('message-from', {input: input, id: selectedUser});
		setMessage([...messages, {message: input, id: `You`}]);
		e.target.message.value = '';
		button.current.focus();
	}

	return (
		<div className="TextChat">
			<div ref={wrap} className='messages-wrap'>
				{messages.map((item, index)=>{
					const my = item.id === 'You';
					if(!item.id){
						return(
							<div key={index} className={`message-connect`}>
								<p>{item.message}</p>
							</div>
						)
					}
					return(
						<div key={index} className={`message ${my && 'my_message'}`}>
							<p>{item.message}</p>
							<p className='id'>{item.id}</p>
						</div>
					)
				})}
			</div>
			<div className='input'>
				<form onSubmit={sendData}>
					<input ref={button} name='message' placeholder={isTyping.state ? isTyping.name : 'message'} onInput={()=>socket.emit('typing...')} onChange={(e)=> {input=e.target.value;}} type='text'></input>
					<button type='submit'>Send</button>
				</form>
			</div>
		</div>
	);
}

export default TextChat;