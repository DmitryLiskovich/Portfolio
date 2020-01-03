import React, {useRef, useEffect, useState} from 'react';
import Video from './Video';
import io from 'socket.io-client';
import './login.scss'

let socket;

if(window.location.origin === "https://dmitryliskovich.github.io"){
	socket = io.connect('https://rocky-reef-68087.herokuapp.com');
}else{
	socket = io.connect('http://localhost:8080');
}



export default function Chat() {
	const [state, setState] = useState(false);
	const [user, setUser] = useState({});
	const [userState, setUserState] = useState(true);

	function submit(e){
		e.preventDefault();
		setUser({name: e.target.name.value, room: e.target.room.value})
		socket.emit('join', e.target.room.value, e.target.name.value);
	}

	useEffect(()=>{
		socket.on('message', (data)=>{
			if(data.type === 'err'){
				setState(false);
				setUserState(false);
			} else{
				setState(true);
			}
		})
	}, [])

	if(!state){
		return(
			<div className='login-wrap'>
				<form className='user-connection' onSubmit={submit}>
					<h2 className="form-signin-heading">Please enter room and user name</h2>
					{/* <input type='' className="form-control" name="room" placeholder="ROOM" required /> */}
					<select type='' className="form-control" name="room" required>
						<option>First room</option>
						<option>Second room</option>
					</select>
					<input type="text" className="form-control" name="name" placeholder="USER NAME" required/>      
					{!userState && <div className='alert'>User already in this room</div>}
					<button className="btn btn-lg btn-primary btn-block" type="submit">Enter</button>   
				</form>
			</div>
		)
	}

	return (
		<Video socket={socket} user={user}></Video>
	);
}