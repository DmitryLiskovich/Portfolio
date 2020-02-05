import React, {useEffect, useState} from 'react';
import Video from './Video';
import io from 'socket.io-client';
import './login.scss'
import Spinner from './Spinner/Spinner';

let socket;

	socket = io.connect('https://rocky-reef-68087.herokuapp.com');
// if(window.location.origin === "https://dmitryliskovich.github.io"){
// 	socket = io.connect('https://rocky-reef-68087.herokuapp.com');
// }else{
// 	socket = io.connect('http://localhost:8080');
// }


export default function Chat() {
	const [state, setState] = useState(false);
	const [user, setUser] = useState({});
	const [userState, setUserState] = useState(true);
	const [spinner, setSpinner] = useState(true);

	function submit(e){
		setSpinner(false);
		e.preventDefault();
		setUser({name: e.target.name.value, room: e.target.room.value})
		socket.emit('join', e.target.room.value, e.target.name.value);
	}

	useEffect(()=>{
		document.title = 'Chat';
		socket.on('message', (data)=>{
			if(data.type === 'err'){
				setState(false);
				setUserState(false);
			} else{
				setSpinner(true);
				setState(true);
			}
		})
	}, [])

	if(!state){
		return(
			<div className='login-wrap'>
				<form className='user-connection' onSubmit={submit}>
				{!spinner && <Spinner></Spinner>}
					<h2 className="form-signin-heading">Please select room and enter your nickname</h2>
					{/* <input type='' className="form-control" name="room" placeholder="ROOM" required /> */}
					<select type='' className="form-control" name="room" required>
						<option>First room</option>
						<option>Second room</option>
					</select>
					<input type="text" className="form-control" name="name" placeholder="USER NAME" required/>      
					{!userState && <div className='alert'>User already in this room</div>}
					<input className="submitButton" type="submit" value='Enter'></input>   
				</form>
			</div>
		)
	}

	return (
		<Video socket={socket} user={user}></Video>
	);
}