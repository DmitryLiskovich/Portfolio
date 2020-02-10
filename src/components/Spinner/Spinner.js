import React from 'react';
import './spinner.scss';

export default function Spinner(){
	return(
		<div className='spinner-wrapper'>
			<div className='spinnerContainer'>
				<div className="loader"></div>
			</div>
		</div>
	)
}