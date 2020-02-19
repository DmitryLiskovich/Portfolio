import React, { useState } from 'react';
import './video.scss';

export default function Video(props){
  let {stateFull, streams, myVideoStream, peers, socket} = props;
  const [state, setState] = stateFull;
  const [sharingState, setSharingState] = useState(false);

  async function shareScreen(){
	const stream = sharingState ? await navigator.mediaDevices.getDisplayMedia() : await navigator.mediaDevices.getUserMedia({video: true, audio: false});
	setSharingState((state)=> !state);
	myVideoStream.current.srcObject = stream;
	peers.forEach((item)=>{
		state.peer.call(item.callId ,stream);
		socket.emit('share-screen-user', state.name);
	})
	setState((state) => ({...state, sharingStream: stream}));
  }

  return(
    <>
      <div className="video-chat">
        <div className='video-chat__wrap'>
          <div className='video-chat__wrap_my'>
            <video className='my' ref={myVideoStream} autoPlay></video>
          </div>
          <div className='video-chat__wrap_remote'>
            {streams.map((item, index)=> (item.stream.active || item.sharingStream.active ? <div className='video-wrapper' key={index}><video className="video" width='auto' autoPlay ref={currentVideoEl => currentVideoEl ? currentVideoEl.srcObject = item.sharingStream || item.stream : ''}></video></div> : ''))}
          </div>
          <div className='button-section'>
            <div onClick={()=> state.peercall ? state.peercall.close() : state.peer.close()} ><i className="fas fa-phone-slash"></i></div>
            <i className="fas fa-microphone"></i>
            <i className="fas fa-volume-up"></i>
			<i onClick={shareScreen} className="fas fa-share-alt"></i>
          </div>
        </div>
      </div>
    </>
  )
}