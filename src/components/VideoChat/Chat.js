import React, {useRef, useEffect, useState} from 'react';
import Peer from 'peerjs';
import axios from 'axios';
import './myChat.scss'
import TextChat from './TextChat/TextChat';
import Modal from './Modal/Modal';
import DrawDesk from './DrawDesk/DrawDesk';
import Video from './VideoComponent/Video';

const callOptions={config: {'iceServers': [
		{ url: 'stun:stun.l.google.com:19302' },
	]}
};


function wakeUp(){
	axios.get('https://rocky-reef-68087.herokuapp.com/email');
}
let streamCache;
let callingUser;
setInterval(wakeUp, 300000);
let message;
let userCalling;
let sharingUser;

export default function Chat(props) {
	const name = props.user.name;
	const [state, setState] = useState({
		drawing: true, 
		catchIt: false, 
		calling: false, 
		chatState: false, 
		peer: new Peer(callOptions), 
		localStream: null,
		peercall: null, 
		rejected: false,
		sharingStream: null,
		name: name,
		sharingState: false
	});
	const [videoStream, setVideoStream] = useState([]);
	const video = useRef(null);
	const socket = props.socket;
	const [peers, setPeers] = useState([]);

	useEffect(()=>{
		state.peer.on('open', function(peerID) {
			socket.send({peerID, name});
		});

		state.peer.on('connection', (user)=>{
			user.on('data', (data)=>{
				setState((state)=> ({...state, catchIt: true, peercall: user}));
			});
			setState((state)=> ({...state, peercall: user}));
		})

		socket.on('message', (data)=>{
			setPeers(data.filter(item => item.userName !== name));
		})

		socket.on('share-screen-user', (data)=>{
			sharingUser = data;
		})

		state.peer.on('call', function(call) {
			if(navigator.getUserMedia){
				createConnection('answer', call, userCalling);
			}else{
				call.close();
			}
		});
	}, []);

	useEffect(()=>{
		setState((state)=> ({...state, sharingState: !!state.sharingStream}))
	}, [state.sharingStream])

	async function createConnection(type, peerCall, userCalling){
		const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
		let peer = peerCall;
		if(type === 'answer'){
			peerCall.answer(stream);
			callingUser = peerCall.peer;
			setState((state)=> ({...state, catchIt: false, calling: true, peercall: peer}))
		}else{
			peer = peer.call(callingUser, stream);
			setState((state)=> ({...state, calling: true, peercall: peer}));
		}
		peer.on('stream', (remoteStream)=> setRemoteStream(remoteStream, stream, userCalling))
		peer.on('close', (e)=>{
			videoStream.forEach(item => {
				item.stream.getTracks().forEach(track => track.stop())
				if(item.sharingStream){
					item.sharingStream.getTracks().forEach(track => track.stop())
				}
			})
			stream.getTracks().forEach(track => track.stop());
			if(videoStream.length === 0){
				setState((state)=> ({...state, calling: false}));
			}
		});
	}

	function errConnectionMessage(errMessage){
		message = errMessage;
		setState((state)=> ({...state, rejected: true}))
		setTimeout(()=>{
			setState((state)=> ({...state, rejected: false}))
		}, 5000);
	}

	function call(e){
		callingUser = e.currentTarget.parentElement.parentElement.getAttribute('data-number');
		const connect = state.peer.connect(callingUser);
		connect.on('open', ()=>{
			connect.on('data', (data)=>{
				if(data.type !== 'rejected'){
					if(navigator.getUserMedia){
						createConnection('call', state.peer, data.user);
					}else{
						errConnectionMessage("You don't have web camera or you have http connection");
						return;
					}
				}else if(data.type === 'rejected'){
					errConnectionMessage("Your call has been rejected");
				}
			});
			connect.send({type: 'request', user: name});
		});
	}

	function setRemoteStream(streamRemote, stream, userCalling){
		stream.getAudioTracks().enabled = false;
		video.current.srcObject = stream;
		const newStream = videoStream.reduce((streamArray, item)=>{
			if(sharingUser === item.user){
				item.stream.getTracks().forEach(track => track.stop());
				item.stream = streamRemote;
			}
			streamArray.push(item);
			return streamArray;
		}, []);
		console.log(newStream);
		if(!newStream.length){
			newStream.push({user: userCalling, stream: streamRemote});
		}
		setVideoStream(newStream);
		// if(streamRemote !== streamCache){
		// 	setVideoStream((state)=> ([...state, {user: userCalling, stream: streamRemote}]));
		// 	streamCache = streamRemote;
		// }
	}

	function reject(){
		state.peercall.send({type: 'rejected', user: name});
		setState((state)=> ({...state, calling: false, catchIt: false, peercall: null}));
	}

	function confirm(e){
		userCalling = e.currentTarget.parentElement.parentElement.getAttribute('data-name');
		state.peercall.send({type: 'accepted', user: name});
		setState((state)=> ({...state, calling: false, catchIt: false, peercall: null}));
	}

	return (
		<>
			<DrawDesk drawing={[state, setState]}></DrawDesk>
			<div className="App">
				{state.rejected && <Modal message={message}></Modal>}
				<div className={`users-list ${state.calling || state.chatState ? 'hidden' : ''}`}>
					<ul >
						<li className='header'><i className="fas fa-pencil-ruler drawing-mode" onClick={()=>setState({...state, drawing: true})}></i><h1>Users List</h1><i className="far fa-comments chat-change" onClick={()=>setState({...state, chatState: true})}></i></li>
						{peers.map((item, index)=> {
							return(
								<li data-name={item.userName} data-number={item.callId} key={index}><div className='user-name'>{item.userName.slice(0, 2)}</div><p>{item.userName}</p><div className="button">
										<div onClick={state.catchIt ? confirm : call} className={`calling ${state.catchIt && state.peercall.peer === item.callId ? 'pulse-button' : ''}`}>
											<i className="fas fa-phone"></i>
										</div>
										{state.catchIt && state.peercall.peer === item.callId && (<div onClick={reject} className={`reject calling`}>
											<i className="fas fa-phone-slash"></i>
										</div>)}
									</div>
								</li>
							)})
						}
					</ul>
				</div>
				{state.calling &&
					<div className={`video-chat_from-chat ${!state.calling && 'hidden'}`}>
						<Video socket={socket} myVideoStream={video} streams={videoStream} stateFull={([state, setState])} peers={peers}></Video> 
					</div>
				}
				{!state.calling &&
				<>
					<i onClick={()=>setState((state)=> ({...state, chatState: false}))} className={`fas fa-times close-button ${!state.chatState ? 'hidden' : ''}`}></i>
					<div className={`text-chat ${!state.chatState && 'hidden'}`}>
						<TextChat selectedUser={name} socket={socket}></TextChat>
					</div>
				</>
				}
			</div>
		</>
	);
}