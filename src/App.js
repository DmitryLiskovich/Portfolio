import React, {lazy, Suspense} from 'react';
import Navigate from './components/Navbar';
import Footer from './components/Footer';
import Spinner from './components/Spinner/Spinner';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import './global.scss'

const About = lazy(()=> import('./components/About/About'));
const Notfount = lazy(()=> import('./components/Notfound/Notfound'));
const Weather = lazy(()=> import('./components/Weather/Weather'));
const Posts = lazy(()=> import('./components/Posts/Posts'));
const Contact = lazy(()=> import('./components/Contact/Contact'));
const TaskPage = lazy(()=> import('./components/Tasks/TaskPage'));
const Chat = lazy(()=> import('./components/VideoChat/Login/ChatLoginForm'));

export default function App() {
	return(
		<div>
		<Navigate></Navigate>
			<Suspense fallback={<div className='spinner-main'><Spinner></Spinner></div>}>
				<HashRouter>
					<Switch>
						<Route path='/weather' component={Weather}></Route>
						<Route path='/note' component={Posts}></Route>
						<Route path='/about' component={About}></Route>
						<Route path='/contact' component={Contact}></Route>
						<Route path='/task' component={TaskPage}></Route>
						<Route path='/notfound' component={Notfount}></Route>
						<Route path='/chat' component={Chat}></Route>
						<Redirect from='/' to='/about'></Redirect>
					</Switch>
				</HashRouter>
			</Suspense>
		<Footer></Footer>
	</div>
	);
}
