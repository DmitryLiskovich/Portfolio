import React from 'react';
import './modal.scss';

export function Modal({user, reject, accept, className}) {
  return (
    <div className={`modal-frame ${className}`}>
      <h2>Incoming call from {user}</h2>
      <div className='modal-controls'>
        <i onClick={reject} className="fas fa-phone-slash"></i>
        <i onClick={accept} className="fas fa-phone"></i>
      </div>

    </div>
  )
}
