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
      <Col md='4' style={{marginBottom: '10px'}} key={res.id}>
        <Toast>
          <ToastHeader>
            <div className='header-toast'>
              {res.title}
              <button className='close' onClick={deletePost} value={res.id}>X</button>
            </div>
          </ToastHeader>
          <ToastBody>
            {res.note}
          </ToastBody>
        </Toast>
      </Col>
    )
  })

  return(
    <div>
        <Container className='notes-main text-center'>
          <Form onSubmit={addPost}>
            <FormGroup>
              <br></br>
              <h1>You can create your notes</h1>
              <br></br>
              <br></br>
              <Label>Title</Label>
              <Input required type='text' name='title' id='title' placeholder='Title'></Input>
              <FormFeedback>Please, write your title</FormFeedback>
              <br></br>
              <Label>Note</Label>
              <Input required type='textarea' name='note' id='note' placeholder='Note'></Input>
              <FormFeedback>Please, write your note</FormFeedback>
              <br></br>
              <Button type='submit' color='info'>Add</Button>
            </FormGroup>
          </Form>
          <br></br>
        </Container>
        <br></br>
        <Container>
          <Row>
            {notes}
          </Row>
        </Container>
    </div>
  )
}