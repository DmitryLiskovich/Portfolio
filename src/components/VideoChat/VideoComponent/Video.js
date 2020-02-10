import React from 'react';
import './video.scss';

export default function Video(props){
  const {state, streams, myVideoStream} = props;

  return(
    <>
      <div className="video-chat">
        <div className='video-chat__wrap'>
          <div className='video-chat__wrap_my'>
            <video className='my' ref={myVideoStream} autoPlay></video>
          </div>
          <div className='video-chat__wrap_remote'>
            {streams.map((item, index)=> (item.active ? <video className="video" width='auto' autoPlay key={index} ref={currentVideoEl => currentVideoEl ? currentVideoEl.srcObject = item : ''}></video> : ''))}
          </div>
          <div className='button-section'>
            <div onClick={()=> state.peercall ? state.peercall.close() : state.peer.close()} className="reject calling"><i className="fas fa-phone-slash"></i></div>
            <i className="fas fa-microphone"></i>
            <i className="fas fa-volume-up"></i>
          </div>
        </div>
      </div>
    </>
  )
}