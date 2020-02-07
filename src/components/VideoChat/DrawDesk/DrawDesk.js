import React, {useState, useEffect, useRef} from 'react';
import paper, {Path} from 'paper/dist/paper-core';
import './drawdesk.scss';

export default function DrawDesk(props){
	const [pathHistory, setPathHistory] = useState([]);
	const draw = useRef(null);
	const [state, setState] = props.drawing;

	useEffect(()=>{
		let path;
		paper.setup(draw.current);
		draw.current.addEventListener('mousedown', onMouseDown);

		function onMouseDown(event) {
			if (path) {
				path.selected = false;
			}

			if(event.button === 2 && path){
				pathHistory.forEach(item=> item.remove());
				setPathHistory([]);
			}

		
			path = new Path({
				strokeColor: '#152238',
				selected: true
			});

			setPathHistory((state)=> ([...state, path]));
			draw.current.addEventListener('mousemove', onMouseDrag);
			draw.current.addEventListener('mouseup', onMouseUp);
		}
		
		function onMouseDrag(event) {
			if(path && event.layerX > 0){
				path.add(event.layerX, event.layerY);
			}
		}
		
		function onMouseUp() {
			if(path){
				path.simplify();
				path.selected = false;
			}
			draw.current.removeEventListener('mousemove', onMouseDrag);
			draw.current.removeEventListener('mouseup', onMouseUp);
		}
		setState({...state, drawing: false})
	}, []);

	const selectLine = (e)=>{
		if(e.target.tagName === 'LI'){
			pathHistory.forEach(item=> item.selected = false)
			pathHistory[+e.target.getAttribute('data-index')].selected = true;
		} else if(e.target.tagName === 'I'){
			pathHistory[+e.target.parentElement.getAttribute('data-index')].remove();
			const newPaths = pathHistory;
			newPaths.splice(+e.target.parentElement.getAttribute('data-index'), 1);
			console.log(newPaths);
			setPathHistory(history => [...newPaths]);
		}
	}

	return(
	<div className={`chat-drawing ${state.drawing ? '' : 'hidden'}`}>
		<i className="fas fa-pencil-ruler drawing-mode" onClick={()=>setState({...state, drawing: false})}></i>
		<canvas id='draw' ref={draw}></canvas>
		<div className='draw-tools'>
			<div>
				<h2>Layers</h2>
				<ul onClick={selectLine}>
					{pathHistory.map((item, index) => <li data-index={index} key={index}>Line - {index} <i className="fas fa-trash-alt"></i></li>)}
				</ul>
			</div>
		</div>
	</div>
	);
}