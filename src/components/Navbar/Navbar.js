import React, {useEffect, useState} from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';
import './navbar.scss'

export default function Navigate(){
	const [isOpen, setIsOpen] = useState(false);
	
	useEffect(()=>{
		if(isOpen){
			document.body.style.overflow = 'hidden';
		}else{
			document.body.style.overflow = 'auto';
		}
	}, [isOpen])

	return (
		<div className="nav-position">
			<Router>
				<nav className={`navbar ${isOpen ? 'open' : ''}`}>
				<div className='react-sign'>
					<a href='https://github.com/DmitryLiskovich'><i className="fab fa-react"></i></a>
				</div>
				<div className="navbar-list">
					<ul onClick={()=> setIsOpen(false)} className="navbar-nav">
						<li className="nav-item">
							<a href='javascript:void(0)' rel="canonical">
								<NavLink activeClassName='active' className="nav-link" to='/about'>About</NavLink>
							</a>
						</li>
						<li className="nav-item">
							<a href='javascript:void(0)' rel="canonical">
								<NavLink activeClassName='active' className="nav-link" to='/weather'>Weather</NavLink>
							</a>
						</li>
						<li className="nav-item">
							<a href='javascript:void(0)' rel="canonical">
								<NavLink activeClassName='active' className="nav-link" to='/task'>Tasks</NavLink>
							</a>
						</li>
						<li className="nav-item">
							<a href='javascript:void(0)' rel="canonical">
								<NavLink activeClassName='active' className="nav-link" to='/chat'>WebRTC/socket chat</NavLink>
							</a>
						</li>
						<li className="nav-item">
							<a href='javascript:void(0)' rel="canonical">
								<NavLink activeClassName='active' className="nav-link" to='/contact'>Contact</NavLink>
							</a>
						</li>
					</ul>
					<div className="form-inline">
					<h6>Created with <i style={{color: '#ee0000'}} className="fas fa-heart"></i> to <i style={{color: '#3b5998'}} className="fab fa-react"></i></h6>
					</div>
				</div>
				<div className="navbar-toggler" onClick={()=> setIsOpen(!isOpen)} type="button">
					<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="18" height="2" fill="#FBFBFD"></rect>
						<rect y="6" width="18" height="2" fill="#FBFBFD"></rect>
						<rect y="12" width="18" height="2" fill="#FBFBFD"></rect>
					</svg>
				</div>
				</nav>
			</Router>
		</div>
    );
}