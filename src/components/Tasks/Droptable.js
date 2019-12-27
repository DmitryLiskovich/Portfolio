import React from 'react';
import { Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { relative } from 'path';

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
	zIndex: 100,
	opacity: 1
});

const getListStyle = isDraggingOver => ({
	  minHeight: '20px',
});

export default function Droptable(props){
  return(
            <Col md='3' style={{padding: 0}}>
            <Toast style={{margin: 'auto', padding: 0}}>
              <ToastHeader>{props.title}</ToastHeader>
              <ToastBody>
                <Droppable droppableId={props.dropId}>
                    {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                  
                                {props.state.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                      snapshot.isDragging,
                                                      provided.draggableProps.style
                                                    )}>
                                                    <Task title={item.content.title} text={item.content.text}></Task>
                                                </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                    )}
                </Droppable>
              </ToastBody>
            </Toast>
          </Col>
  );
}