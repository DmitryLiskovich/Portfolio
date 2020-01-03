import React, {useRef, useEffect, useState, createElement} from 'react';
import Peer from 'peerjs';
import './myChat.scss'
import TextChat from './TextChat';

const callOptions={config: {'iceServers': [
	{ url: 'stun:stun.l.google.com:19302' },
]}
}; 

navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

export default function Chat(props) {
	const [state, setState] = useState({catchIt: false, calling: false, chatState: false, peer: new Peer(callOptions), localStream: null});
	const [videoStream, setVideoStream] = useState([]);
	const [selectedUser, setSelectedUser] = useState();
	const video = useRef(null);
	const {room, name} = props.user;
	const socket = props.socket;
	const [peers, setPeers] = useState({});

	useEffect(()=>{
		state.peer.on('open', function(peerID) {
			socket.send(peerID);
		});

		socket.on('message', async (data)=>{
			delete data[name];
			setPeers(data);
		})

		state.peer.on('call', function(call) {
			setState((state)=> ({...state, calling: true, catchIt: true, peer: call}));
		});
}, []);

useEffect(()=>{
	if(selectedUser){
		setState((state)=> ({...state, chatState: true}));
	}else{
		setState((state)=> ({...state, chatState: false}));
	}
}, [selectedUser]);

	function callAnswer(e){
		const callingUser = e.currentTarget.parentElement.parentElement.getAttribute('data-number');
		let streamCache;
		navigator.getUserMedia({video: true, audio: true}, getStream, error);
		async function getStream(stream){
			if(!state.catchIt){
				let peer = state.peer.call(callingUser, stream);
				peer.on('stream', setRemoteStream);
				setState((state)=> ({...state, calling: true}));
			}else{
				state.peer.answer(stream);
				state.peer.on('stream', setRemoteStream)
				setState((state)=> ({...state, catchIt: false}))
			}

			function setRemoteStream(streamRemote){
				if(streamRemote !== streamCache){
					setVideoStream((state)=> ([...state, streamRemote]));
					streamCache = streamRemote;
					stream.getAudioTracks().enabled = false;
					video.current.srcObject = stream;
				}
			}
		}
	}

	function reject(){
		state.peer.close();
	}

	function error(e){
		console.log(e);
	}

	function checkUserToCall(e){
		if(e.target.tagName !== 'UL' && e.target.className !== 'calling' && e.target.tagName !== 'I' && e.target.className !== 'calling pulse-button'){
			let listTarget = e.target;
			while(!listTarget.getAttribute('data-name')){
				listTarget = listTarget.parentElement;
			}
			const userConnection = {};
			userConnection[listTarget.getAttribute('data-name')] = listTarget.getAttribute('data-number');
			setSelectedUser(userConnection);
		}
	}

	console.log(videoStream);

	return (
		<div className="App">
			
			<div className={`users-list ${state.chatState && 'hidden'}`}>
				<ul onClick={checkUserToCall}>
					<li className='header'><h1>Users List</h1></li>
					{Object.keys(peers).map((item, index)=> {
						return(
							<li data-name={item} className={`${selectedUser && selectedUser[item] && 'active'}`} data-number={peers[item]} key={index}><div className='user-name'>{item.slice(0, 2)}</div><p>{item}</p><div className="button">
									<div onClick={callAnswer} className={`calling ${state.catchIt ? 'pulse-button' : ''}`}>
										<i className="fas fa-phone"></i>
									</div>
									{state.catchIt && (<div onClick={reject} className={`reject calling`}>
										<i className="fas fa-phone-slash"></i>
									</div>)}
								</div>
								</li>
						)})
					}
				</ul>
			</div>
			<div className={`video-chat ${!state.chatState && 'hidden'}`}>
				<Video></Video> 
				{!state.calling &&
				<>
					<i onClick={()=>setState((state)=> ({...state, chatState: false}))} className="fas fa-times close-button"></i>
					<TextChat selectedUser={name} socket={socket}></TextChat>
				</>
				}
			</div>
		</div>
	);

	function Video(){
		return(
			<>
				<div className="chat-section">
					<div className='my_wrapp'>
						<video muted className='my' ref={video} autoPlay></video>
					</div>
					<div className='chat'>
						{videoStream.map((item, index)=> (item.active ? <video className="video" autoPlay key={index} ref={currentVideoEl => currentVideoEl ? currentVideoEl.srcObject = item : ''}></video> : ''))}
					</div>
				</div>
			</>
		)
	}
}