import React, { useState, Suspense } from 'react';
import ChatLayout from '../ChatLayout';
import { Login } from './components/Login.js'
import { SignUp } from './components/Signup.js'
import Spinner from '../Spinner/Spinner';

export const PageState = React.createContext()

export default function Chat() {
  document.title = 'Dmitry Liskovich | Chat';
  const [pageState, setPageState] = useState('Login');

  if(!localStorage.getItem('logined')) {
    if(pageState === 'Login') return <Login setPageState={setPageState} />
    if(pageState === 'Reg') return <SignUp setPageState={setPageState} />
  }

	return (
		<Suspense fallback={<div className='spinner-main'><Spinner></Spinner></div>}>
      <PageState.Provider value={setPageState}>
			  <ChatLayout user={pageState.users}></ChatLayout>
      </PageState.Provider>
		</Suspense>
	);
}
