import React from 'react';
import { Container, Form, FormGroup, Input, Label, Button, Toast, ToastHeader, ToastBody, Row, Col, FormFeedback } from 'reactstrap';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import './post.scss'
import { addPostRedux, delPostRedux } from './action';
import reducer from './reducer';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  const mapStateToProps = (state) =>{
    return{
      data: state
    }
  }

  const Wrapper = connect(mapStateToProps)(Postform);

  export default function MainPost(){
    return(
    <Provider store={ store }>
      <Wrapper>
      </Wrapper>
    </Provider>
    );
  }

function Postform(props) {

  document.title = 'Notes';

  const dispatch = props.dispatch;
  //Need add work with server

  function addPost(event){
    event.preventDefault();
    const data = {
      id: props.data.length > 0 ? props.data[props.data.length-1].id + 1 : 0,
      title: event.target[0].value,
      note: event.target[1].value
    };
    dispatch(addPostRedux(data));
    event.target[0].value='';
    event.target[1].value='';
  }

  function deletePost(event){

    const data = {
      id: event.target.value
    };
    dispatch(delPostRedux(data))
  }

  let notes = props.data.map(res=>{
    return(
      <div className='note' key={res.id}>
        <div className='note-wrapp'>
          <div className='note-header'>
            <div className='header-toast'>
              {res.title}
              <button className='close' onClick={deletePost} value={res.id}>X</button>
            </div>
          </div>
          <div className='note-body'>
            {res.note}
          </div>
        </div>
      </div>
    )
  })

  return(
    <div>
      <div className='notes-main'>
        <form onSubmit={addPost}>
			<h1>You can create your notes</h1>
			<br></br>
			<label>Title</label>
			<input required type='text' name='title' id='title' placeholder='Title'></input>
			<br></br>
			<label>Note</label>
			<textarea required name='note' id='note' placeholder='Note'></textarea>
			<br></br>
			<input className='submitButton' type='submit' color='info' value='Add'></input>
        </form>
        <br></br>
      </div>
      <br></br>
      <div>
        <div className='notes-wrapper'>
          {notes}
        </div>
      </div>
    </div>
  )
}