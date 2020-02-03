import React from 'react';
import './footer.scss';

export default function Footer(){
  return(
    <footer className='footer'>
      <p>All rights with LOVE</p>
      <div className='social'>
        <ul className='contact-list'>
          <li><a href="https://vk.com/shine_a_light_lis"><i className="fab fa-vk"></i></a></li>
          <li><a href="https://www.linkedin.com/in/dmitry-liskovich-175470174/"><i className="fab fa-linkedin-in"></i></a></li>
          <li><a href="https://github.com/DmitryLiskovich"><i className="fab fa-github-alt"></i></a></li>
          <li><a href="skype:dimalisko"><i className="fab fa-skype"></i></a></li>
        </ul>
      </div>
    </footer>
  );
}