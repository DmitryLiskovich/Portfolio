import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const getItemStyle = (isDragging, draggableStyle) => {
	return{
		...draggableStyle,
		zIndex: 100,
		opacity: 1,
	}
};


const getListStyle = (isDraggingOver) => {
	if(isDraggingOver){
		return {
			transition: 'ease-in-out all 0.5s',
		}
	}
	return {
		transition: 'ease-in-out all 0.5s',
	};
}

export default function Droptable(props){
	return(
		<Droppable droppableId={props.dropId}>
			{(provided, snapshot) => (
			<div className='dropable-field' 
				ref={provided.innerRef}
				style={getListStyle(snapshot.isDraggingOver)}>
				<div className='dropable-field-header'>{props.title}</div>
						<div className={`dropable-field-drop ${snapshot.isDraggingOver ? 'over' : ''}`}>
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
				</div>
			)}
		</Droppable>
	);
}