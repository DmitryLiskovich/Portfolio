import React from 'react';
import './Modal.scss';

export default function Modal(props){
	const message = props.message;
  return(
    <div className='modal-wrap'>
      <div className='modal'>
        <h2>{message}</h2>
      </div>
    </div>
  )
}