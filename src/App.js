import React from 'react';
import './App.css';
import Navigate from './components/Navbar'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import About  from './components/About/About';
import Notfount from './components/Notfound/Notfound'
import Weather from './components/Weather/Weather' 
import Posts from './components/Posts/Posts'
import Contact from './components/Contact/Contact'

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
          <Route path='/notfound' component={Notfount}></Route>
          <Redirect from='/' to='/about'></Redirect>
        </Switch>
      </HashRouter>
    </div>
  );
}
