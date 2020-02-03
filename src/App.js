import React from 'react';
import Navigate from './components/Navbar'
import { HashRouter,Router, Route, Redirect, Switch } from 'react-router-dom';
import About  from './components/About/About';
import Notfount from './components/Notfound/Notfound'
import Weather from './components/Weather/Weather' 
import Posts from './components/Posts/Posts'
import Contact from './components/Contact/Contact'
import TaskPage from './components/Tasks/TaskPage';
import Chat from './components/VideoChat/Chat';
import Footer from './components/Footer';

export default function App({match}) {
	return(
    <div>
		<Navigate></Navigate>
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
		<Footer></Footer>
	</div>
	);
}
