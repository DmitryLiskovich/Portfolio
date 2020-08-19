import React from 'react';

export default function Task(props) {
	return(
		<div className='toaster'>
			<h2>
				{props.title}
			</h2>
			<p>
				{props.text}
			</p>
		</div>
	)
}