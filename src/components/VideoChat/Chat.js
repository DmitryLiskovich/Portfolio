import React, {useRef, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('https://rocky-reef-68087.herokuapp.com');

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


export default function Chat() {
	const userId = Math.random()*10000000000000000;
	const users = [];
	const pc = new PeerConnection(server, options);
	
	const video = useRef(null);

	pc.ontrack = e =>{
		console.log(e);
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
			}
		});
	}, [])

	function createAnswer() {
		pc.createAnswer(
			gotLocalDescription,
			function(error) { console.log(error) }, 
			{ 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
		);
	}
	
	
	function gotLocalDescription(description){
		pc.setLocalDescription(description);
		sendMessage(description);
	}
	
	function gotIceCandidate(event){
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

	// const peers = {};

	// function createNewConnection(data){

	// 	peers[data] = {
	// 		candidateCache: []
	// 	};

	// 	const pc = new PeerConnection(server, options);
	// 	peers[data].connection = pc;

	// 	const channel = pc.createDataChannel("mychannel", {});
	// 	channel.owner = data;
	// 	peers[data].channel = channel;

	// 	bindEvents(channel);

	// 	pc.createOffer(function(offer) {
	// 		pc.setLocalDescription(offer);
	// 	});
	// }

	return (
		<div className="App">
			<video ref={video} autoPlay></video>
			<button onClick={call}>Starts</button>
		</div>
	);
}