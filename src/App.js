import React, {lazy, Suspense} from 'react';
import Navigate from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import './global.scss';
import { Socket } from './socketContext/socket';
import io from 'socket.io-client';

const envURL = window.location.hostname === 'localhost' ? 'localhost:8000' : 'rocky-reef-68087.herokuapp.com'

const About = lazy(()=> import('./components/About/About'));
const Notfount = lazy(()=> import('./components/Notfound/Notfound'));
const Weather = lazy(()=> import('./components/Weather/Weather'));
const Contact = lazy(()=> import('./components/Contact/Contact'));
const TaskPage = lazy(()=> import('./components/Tasks/TaskPage'));
const Chat = lazy(()=> import('./components/VideoChat/Login/Auth'));

export default function App() {
	return(
		<div>
		<Navigate/>
      <Socket.Provider value={io.connect(envURL)}>
        <Suspense fallback={<div className='spinner-main'><Spinner></Spinner></div>}>
          <HashRouter>
            <Switch>
              <Route path='/weather' component={Weather}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/contact' component={Contact}></Route>
              <Route path='/task' component={TaskPage}></Route>
              <Route path='/notfound' component={Notfount}></Route>
              <Route path='/chat' component={Chat}></Route>
              <Redirect from='/' to='/about'></Redirect>
            </Switch>
          </HashRouter>
        </Suspense>
      </Socket.Provider>
		<Footer/>
	</div>
	);
}
