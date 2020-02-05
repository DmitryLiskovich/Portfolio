import React, {useState} from 'react';
import './contact.scss';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export default function Contact() {
  document.title = 'Contact';
  const [spinner, setSpinner] = useState(false);
  const [state, setState] = useState({message: '', status: true});
  async function sendEmail(e){
	e.preventDefault();
	if(localStorage.getItem('dateOfSend')){
		if(Date.now() - localStorage.getItem('dateOfSend') < 1200000){
			setState({message: `Fail, Try in ${Math.ceil((1200000 / 60000) - (Date.now() - +localStorage.getItem('dateOfSend'))/60000)} min `, status: false});
			return;
		}
	}
	setSpinner(true);
	try{
		const result = await axios.post('https://rocky-reef-68087.herokuapp.com/email', {
			text: e.target.emailText.value,
			them: e.target.emailSubject.value
		});
		if(result.status === 200){
			window.localStorage.setItem('dateOfSend', Date.now());
			setState({...state, message: 'Success, Thank you', status: true});
		}
		setSpinner(false);
	}catch(err){
		console.log(err);
		setState({message: err.response.data.message, status: false});
		setSpinner(false);
	}
  }

	return(
		<div className='contact'>
			{spinner ? <Spinner/> : ''}
			<div className="contact-image"></div>
			<div className='contact-form'>
				<form onSubmit = {sendEmail}>
				<label>Enter your theme</label>
				<br></br>
				<input required type='text' name="emailSubject" className="form-control z-depth-1" rows="3" placeholder="Write your them"></input>
				<br></br>
				<label>Enter your message</label>
				<br></br>
				<textarea type='textarea' name="emailText" className="form-control z-depth-1" rows="3" placeholder="Write your message"></textarea>
				<br></br>
				<input className='submitButton' type="submit" color='info' value='Send'></input>
				<br></br>
				<br></br>
				<h2 style={{color: state.status ? 'green' : 'red', fontStyle: 'italic'}}>{state.message}</h2>
				<div className="underline"></div>
				<ul className='contact-list'>
					<li><a href="https://vk.com/shine_a_light_lis"><i className="fab fa-vk"></i></a></li>
					<li><a href="https://www.linkedin.com/in/dmitry-liskovich-175470174/"><i className="fab fa-linkedin-in"></i></a></li>
					<li><a href="https://github.com/DmitryLiskovich"><i className="fab fa-github-alt"></i></a></li>
					<li><a href="skype:dimalisko"><i className="fab fa-skype"></i></a></li>
				</ul>
				</form>
			</div>
		</div>
	)
}