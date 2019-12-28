import React, {useRef, useEffect, useState, createElement} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

// const socket = io.connect('https://rocky-reef-68087.herokuapp.com');
const socket = io.connect('http://localhost:8080');

const server = {
	iceServers: [
		{url: "stun:23.21.150.121"},
		{url: "stun:stun.l.google.com:19302"},
		{url: "turn:numb.viagenie.ca", credential: "your password goes here", username: "example@example.com"}
	]
};
const options = {
	optional: [
		{DtlsSrtpKeyAgreement: true},
		{RtpDataChannels: true}
	]
};

const PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
const SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
let pc = new PeerConnection(server, options);
let newPeers = {};

const peer = new Peer()

export default function Chat() {
	const [catchIt, setCatchIt] = useState(false);
	const videos = useRef(null);

	useEffect(()=>{
		socket.on('message', async (data)=>{
			if(data.type === 'offer'){
				await pc.setRemoteDescription(data);
				setCatchIt(true);
			}
			if(data.type === 'candidate'){
				const condidate = new IceCandidate({sdpMLineIndex:data.label, candidate:data.candidate});
				pc.addIceCandidate(condidate);
			}
			if(data.type === 'answer'){
				newPeers[data] = {
					pc: new PeerConnection(server, options)
				}
				newPeers[data].pc.setRemoteDescription(data);
				newPeers[data].pc.ontrack = e => {
					const newVid = document.createElement('video');
					newVid.setAttribute('autoplay', true);
					newVid.srcObject = e.streams[0];
					videos.current.append(newVid);
				};
				newPeers[data].pc.onicecandidate = (event)=>{
					if (event.candidate) {
						socket.send({type: 'candidate',                        
							label: event.candidate.sdpMLineIndex,                     
							id: event.candidate.sdpMid,                        
							candidate: event.candidate.candidate});
					} else {
					}
				}
				console.log(newPeers[data]);

			}
		})

		navigator.getUserMedia({video: true, audio: false}, getStream, error);

		async function getStream(stream){
			await pc.addStream(stream);
			pc.ontrack = e => {
				const newVid = document.createElement('video');
				newVid.setAttribute('autoplay', true);
				newVid.srcObject = e.streams[0];
				videos.current.append(newVid);
			};
			pc.onicecandidate = (event)=>{
				if (event.candidate) {
					socket.send({type: 'candidate',                        
						label: event.candidate.sdpMLineIndex,                     
						id: event.candidate.sdpMid,                        
						candidate: event.candidate.candidate});
				} else {
				}
			}
		}

	}, [])

	function call(){
		pc.createOffer(function(offer) {
			pc.setLocalDescription(offer, function() {
				socket.send(offer);
			}, error);
		}, error);
	}
	function submit(){
		pc.createAnswer(function(answer) {
			pc.setLocalDescription(answer, ()=>{
				socket.send(answer);
			})
		}, error);
	}

	function error(err){
		console.log(err);
	}

	return (
		<div className="App">
			<div ref={videos}></div>
			<button onClick={call}>Call</button>
			{catchIt && <button onClick={submit}>Submit</button>}
			<button onClick={()=>pc.close()}>End Call</button>
		</div>
	);
}