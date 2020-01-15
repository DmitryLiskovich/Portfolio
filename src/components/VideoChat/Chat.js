import React, {useRef, useEffect, useState} from 'react';
import Video from './Video';
import io from 'socket.io-client';
import './login.scss'

document.title = 'Chat';

let socket;

if(window.location.origin === "https://dmitryliskovich.github.io"){
	socket = io.connect('https://rocky-reef-68087.herokuapp.com');
}else{
	socket = io.connect('http://localhost:8080');
}


export default function Chat() {
<<<<<<< HEAD
	const userId = Math.random()*10000000000000000;
	const users = [];
	const pc = new PeerConnection(server, options);
	
	const video = useRef(null);

	pc.ontrack = e =>{
		video.current.srcObject = e.streams[0];
	}

	navigator.getUserMedia({ audio: true, video: true }, gotStream, streamError);
	
	function gotStream(stream) {
		pc.addStream(stream);
		pc.onicecandidate = gotIceCandidate;
	}
	
	useEffect(() => {
		socket.on('message', function (message, user){
			if (message.type === 'offer') {
				pc.setRemoteDescription(new SessionDescription(message));
				createAnswer();
			} 
			else if (message.type === 'answer') {
				pc.setRemoteDescription(new SessionDescription(message));
			} 
			else if (message.type === 'candidate') {
				const candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
				pc.addIceCandidate(candidate);
=======
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
>>>>>>> 958b3b4e8722285cedbbb1417df99106909fe683
			}
		})
	}, [])

	if(!state){
		return(
			<div className='login-wrap'>
				<form className='user-connection' onSubmit={submit}>
					<h2 className="form-signin-heading">Please select room and enter your nickname</h2>
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
<<<<<<< HEAD
	
	
	function gotLocalDescription(description){
		pc.setLocalDescription(description);
		sendMessage(description);
	}
	
	function gotIceCandidate(event){
		console.log(event)
		if (event.candidate) {
			sendMessage({
				type: 'candidate',
				label: event.candidate.sdpMLineIndex,
				id: event.candidate.sdpMid,
				candidate: event.candidate.candidate
			});
		}
	}

	function sendMessage(message){
		socket.send(message, userId);
	}

	function streamError(error) {
		console.log(error);
	}

	function call(){
		pc.createOffer( gotLocalDescription, 
			function(error) { console.log(error) }, 
			{ 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
		);
	}
=======
>>>>>>> 958b3b4e8722285cedbbb1417df99106909fe683

	return (
		<Video socket={socket} user={user}></Video>
	);
}