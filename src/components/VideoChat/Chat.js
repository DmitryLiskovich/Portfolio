import React, {useRef, useEffect, useState} from 'react';
import Video from './Video';
import io from 'socket.io-client';

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
			<form onSubmit={submit}>
				<input required type='text' name='room' placeholder='room'></input>
				<input required type='text' name='name' placeholder='name'></input>
				<input type='submit'></input>
				{!userState && <div>User already in this room</div>}
			</form>
		)
	}

	return (
		<Video socket={socket} user={user}></Video>
	);
}