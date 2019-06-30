import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import './navbar.css'

export default function Navigate(){
    return (
      <div>
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light" style={{background: '#e3f2fd', zIndex: 0}}>
              <div className='react-sign'>
                <a href='https://github.com/DmitryLiskovich'><i className="fab fa-react"></i></a>
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
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
                </ul>
                <div className="form-inline">
                  <h6 style={{color:'#444'}}>Created with <i style={{color: '#ee0000'}} className="fas fa-heart"></i> to <i style={{color: '#3b5998'}} className="fab fa-react"></i></h6>
                </div>
              </div>
            </nav>
        </Router>
      </div>
    );
}