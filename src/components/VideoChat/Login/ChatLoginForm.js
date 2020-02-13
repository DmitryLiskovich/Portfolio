import React, {useEffect, useState, lazy, Suspense} from 'react';
import Video from '../Chat';
import io from 'socket.io-client';
import './login.scss'
import Spinner from '../Spinner/Spinner';
// const Video = lazy(()=> import('../Chat'));

let socket;

socket = io.connect('https://rocky-reef-68087.herokuapp.com');
// socket = io.connect('http://localhost:8080/');

export default function Chat() {
	const [state, setState] = useState({
		spinner: false,
		loggined: false, 
		userIsCreated: false, 
		users: {}
	});

	function submit(e){
		setState((state) =>({
			...state, 
			spinner: true, 
			users: {name: e.target.name.value, room: e.target.room.value}
		}));
		e.preventDefault();
		socket.emit('join', e.target.room.value, e.target.name.value);
	}

	useEffect(()=>{
		document.title = 'Chat';
		socket.on('message', (data)=>{
			if(data.type === 'err'){
				setState((state) => ({...state, spinner: false, loggined: false, userIsCreated: true}));
			} else{
				setState((state) => ({...state, spinner: false, loggined: true}));
			}
		})

		return ()=>{
			socket.close();
		}
	}, [])

	if(!state.loggined){
		return(
			<div className='login-wrap'>
				<form className='user-connection' onSubmit={submit}>
				{state.spinner && <Spinner></Spinner>}
					<h2 className="form-signin-heading">Please select room and enter your nickname</h2>
					<select type='' className="form-control" name="room" required>
						<option>First room</option>
						<option>Second room</option>
					</select>
					<input type="text" className="form-control" name="name" placeholder="USER NAME" required/>      
					{state.userIsCreated && <div className='alert'>User already in this room</div>}
					<input className="submitButton" type="submit" value='Enter'></input>   
				</form>
			</div>
		)
	}

	return (
		<Suspense fallback={<div className='spinner-main'><Spinner></Spinner></div>}>
			<Video socket={socket} user={state.users}></Video>
		</Suspense>
	);
}