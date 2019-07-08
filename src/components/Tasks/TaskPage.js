import React, {useState, useEffect} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Container, Row, Form } from 'reactstrap';
import Droptable from './Droptable';
import AddTask from './FormTask';
import './task.scss'

export default function TaskPage() {

  const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
  };

  if(!localStorage.getItem('counter')){
    localStorage.setItem('counter', '0');
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      const result = {droppable: state.toDo, droppable2: state.onHold, droppable3: state.inProcess, droppable4: state.pendingPR};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
      return result;
  };


  
  const [state, setState] = useState({
    toDo: [],
    onHold: [],
    inProcess: [],
    pendingPR: [],
});

if(!localStorage.getItem('data')){
  localStorage.setItem('data', JSON.stringify(state));
}

console.log(JSON.parse(localStorage.getItem('data')));

  const id2List = {
      droppable: 'toDo',
      droppable2: 'onHold',
      droppable3: 'inProcess',
      droppable4: 'pendingPR',
  };

  useEffect(()=>{
    setState(JSON.parse(localStorage.getItem('data')));
  }, []);

  function getList(id){ 
      return state[id2List[id]];
  }

  function onDragEnd(result) {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          const items = reorder(
              getList(source.droppableId),
              source.index,
              destination.index
          );
          console.log(destination.droppableId);

          let stateDrop = {...state ,toDo: items};
          if (source.droppableId === 'droppable2' ) {
              stateDrop = { ...state, onHold: items };
          }
          if (source.droppableId === 'droppable3' ) {
              stateDrop = { ...state, inProcess: items };
          }
          if (source.droppableId === 'droppable4' ) {
              stateDrop = { ...state, pendingPR: items };
          }
          localStorage.setItem('data', JSON.stringify(stateDrop));
          setState(JSON.parse(localStorage.getItem('data')));
      } else {
          const result = move(
              getList(source.droppableId),
              getList(destination.droppableId),
              source,
              destination
          );
          const newStates = {
            toDo: result.droppable,
            onHold: result.droppable2,
            inProcess: result.droppable3,
            pendingPR: result.droppable4,
          };
          localStorage.setItem('data', JSON.stringify(newStates));
          setState(JSON.parse(localStorage.getItem('data')));
      }
  };

  function addNewTask(event){
    event.preventDefault();
    let counter = parseInt(localStorage.getItem('counter'));
    if(!event.target[0].value || !event.target[1].value ) return;
    const newId = 'task-' + counter++;
    localStorage.setItem('counter', JSON.stringify(counter));
    const newItems = [...state.toDo, {id: newId, content: {title: event.target[0].value, text: event.target[1].value}}];
    localStorage.setItem('data', JSON.stringify({...state, toDo: newItems}));
    setState(JSON.parse(localStorage.getItem('data')));
  }

  return (
      <div>
        <Container className='task-form' style={{background: '#fff'}}>
          <Form onSubmit={addNewTask}>
            <AddTask></AddTask>
          </Form>
        </Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <Container>
            <Row>
              <Droptable title='To Do' state={state.toDo} dropId ={'droppable'}></Droptable>
              <Droptable title='On hold' state={state.onHold} dropId ={'droppable2'}></Droptable>
              <Droptable title='In process' state={state.inProcess} dropId ={'droppable3'}></Droptable>
              <Droptable title='Pending PR' state={state.pendingPR} dropId ={'droppable4'}></Droptable>
            </Row>
          </Container>
        </DragDropContext>
      </div>
  );
}
