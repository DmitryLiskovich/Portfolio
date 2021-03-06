import React, {useState, useEffect} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Droptable from './components/Droptable';
import AddTask from './components/FormTask';
import './task.scss'

export default function TaskPage() {
	document.title = 'Dmitry Liskovich | Tasks'

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

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

	const id2List = {
		droppable: 'toDo',
		droppable2: 'onHold',
		droppable3: 'inProcess',
		droppable4: 'pendingPR',
	};

	useEffect(()=>{
		if(!localStorage.getItem('counter')){
			localStorage.setItem('counter', '0');
		}

		if(!localStorage.getItem('data')){
			localStorage.setItem('data', JSON.stringify(state));
		}

		setState(JSON.parse(localStorage.getItem('data')));
	}, []);

	function getList(id){ 
		return state[id2List[id]];
	}

	function onDragEnd(result) {
		const { source, destination } = result;

		if (!destination) {
			const sourceList = id2List[source.droppableId];
			const elements = state;
			elements[sourceList] = elements[sourceList].filter((item) => item.id !== result.draggableId);
			localStorage.setItem('data', JSON.stringify(elements));
			setState(JSON.parse(localStorage.getItem('data')));
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				getList(source.droppableId),
				source.index,
				destination.index
			);

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
			<div className='task-form'>
				<form onSubmit={addNewTask}>
					<AddTask></AddTask>
				</form>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className='dropable'>
					<Droptable title='To Do' zIndex={1} state={state.toDo} dropId ={'droppable'}></Droptable>
					<Droptable title='On hold' zIndex={2} state={state.onHold} dropId ={'droppable2'}></Droptable>
					<Droptable title='In process' zIndex={3} state={state.inProcess} dropId ={'droppable3'}></Droptable>
					<Droptable title='Pending PR' zIndex={4} state={state.pendingPR} dropId ={'droppable4'}></Droptable>
				</div>
			</DragDropContext>
		</div>
	);
}
