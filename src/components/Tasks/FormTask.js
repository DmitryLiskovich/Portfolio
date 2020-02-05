import React from 'react';

export default function AddTask(){
	document.title = 'Tasks';
	return(
		<form className='text-center'>
			<br></br>
			<label>Enter task title</label>
			<input name='text'></input>
			<label>Enter task text</label>
			<input name='text'></input>
			<br></br>
			<input type='submit' className='submitButton' value='Add Task'></input>
			<br></br>
			<br></br>
		</form>
	)
}