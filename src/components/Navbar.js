import React, {useEffect, useState} from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import './navbar.scss'

export default function Navigate(){
    const [navbarState, setNavbarState] = useState(false);

    useEffect(()=>{
      window.addEventListener('scroll', ()=>{
        if(window.scrollY > 0){
          setNavbarState(true)
        }else{
          setNavbarState(false)
        }
      })
    }, [])

    return (
      <div className="nav-position">
        <Router>
            <nav className={`navbar ${navbarState ? 'active' : ''}`}>
              <div className='react-sign'>
                <a href='https://github.com/DmitryLiskovich'><i className="fab fa-react"></i></a>
              </div>
              <div className="navbar-list">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to='/about'>About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/note'>Notes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/weather'>Weather</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/contact'>Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/task'>Tasks</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/chat'>WebRTC/socket chat</Link>
                  </li>
                </ul>
                <div className="form-inline">
                  <h6>Created with <i style={{color: '#ee0000'}} className="fas fa-heart"></i> to <i style={{color: '#3b5998'}} className="fab fa-react"></i></h6>
                </div>
              </div>
              <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
        </Router>
      </div>
    );
}