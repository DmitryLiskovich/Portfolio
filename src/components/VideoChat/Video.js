import React, {useRef, useEffect, useState, createElement} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import './myChat.scss'
import { object } from 'prop-types';

const callOptions={config: {'iceServers': [
	{ url: 'stun:stun.l.google.com:19302' },
]}
}; 

navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

let peer;
let peercall;

export default function Chat(props) {
	const [catchIt, setCatchIt] = useState(false);
	const {room, name} = props.user;
	const socket = props.socket;
	const videos = useRef(null);
	const video = useRef(null);
	const [peers, setPeers] = useState({});
	let callingUser;

	useEffect(()=>{
		peer = new Peer(callOptions)

		peer.on('open', function(peerID) {
			socket.send(peerID);
		});

		socket.on('message', async (data)=>{
			delete data[name];
			setPeers(data);
		})

		peer.on('call', function(call) {
			peercall=call;
			setCatchIt(true);
		});

}, []);

	function callAnswer(callingPeer){
		navigator.getUserMedia({video: true, audio: false}, getStream, error);

		async function getStream(stream){
			if(!catchIt){
				peercall = peer.call(peers[callingPeer], stream);
				peercall.on('stream', function (stream) {
					setVideo(stream);
				});
				video.current.srcObject = stream;
			}else{
				peercall.answer(stream);
				setTimeout(()=>setVideo(peercall.remoteStream), 1000);
				video.current.srcObject = stream;
				setCatchIt(false);
			}
		}
	}



	function setVideo(stream){
		const video = document.createElement('video');
		video.srcObject = stream;
		video.className = 'video';
		video.play();
		videos.current.append(video);
	}

	function error(e){
		console.log(e);
	}

	function checkUserToCall(e){
		if(e.target.tagName === 'LI'){
			callAnswer(e.target.innerText);
		}
	}

	return (
		<div className="App">
			<div className='users-list'>
				<ul onClick={checkUserToCall}>
					<li className='header'><h1>Users List</h1></li>
					{Object.keys(peers).map((item, index)=> (<li key={index}>{item}</li>))}
				</ul>
			</div>
			<div className='video-chat'>
				<div className='chat-section'>
					<div className='my_wrapp'>
						<video className='my' ref={video} autoPlay></video>
					</div>
					<div className='chat' ref={videos}></div>
				</div>
				<div>
					<div onClick={callAnswer} className={`calling ${catchIt ? 'pulse-button' : ''}`}>
						<i className="fas fa-phone"></i>
					</div>
				</div>
			</div>
		</div>
	);
}