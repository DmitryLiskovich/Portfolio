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
                    <Link className="nav-link" to='/blog'>Blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/weather'>Weather</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/contact'>Contact</Link>
                  </li>
                </ul>
                <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                  <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </nav>
        </Router>
      </div>
    );
}