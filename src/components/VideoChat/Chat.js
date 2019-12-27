import React, {useRef, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('https://rocky-reef-68087.herokuapp.com');

const PeerConnection = window.RTCPeerConnection;
const IceCandidate = window.RTCIceCandidate
const SessionDescription = window.RTCSessionDescription
const pc = new PeerConnection(null);
navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);


export default function Chat() {
	const video = useRef(null);
	navigator.getUserMedia({ audio: true, video: true }, gotStream, streamError);
	
	function gotStream(stream) {
		pc.addStream(stream);
		pc.onicecandidate = gotIceCandidate;
		pc.onaddstream = gotRemoteStream;
	}
	
	useEffect(() => {
		socket.on('message', function (message){
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
	
	function gotRemoteStream(event){
		video.current.srcObject = event.stream;
	}

	function sendMessage(message){
		socket.send(message);
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

	return (
		<div className="App">
			<video ref={video} autoPlay></video>
			<button onClick={call}>Start</button>
		</div>
	);
}