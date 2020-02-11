import React, {useState, useEffect, useRef} from 'react';
import paper, {Path} from 'paper/dist/paper-core';
import './drawdesk.scss';
let path;

export default function DrawDesk(props){
	const [pathHistory, setPathHistory] = useState([]);
	const [state, setState] = props.drawing;
	const [strokeWidthState, setStrokeWidth] = useState();
	const draw = useRef(null);
	const strokeWidth = useRef(null);

	useEffect(()=>{
		paper.setup(draw.current);
		['mousedown', 'touchstart'].forEach((eventType) => draw.current.addEventListener(eventType, onMouseDown));

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
				selected: true,
			});

			setPathHistory((state)=> ([...state, path]));
			['mousemove', 'touchmove'].forEach((eventType) => draw.current.addEventListener(eventType, onMouseDrag));
			['mouseup', 'touchend'].forEach((eventType) => draw.current.addEventListener(eventType, onMouseUp));
		}
		
		function onMouseDrag(event) {
			if(path && event.layerX && event.layerX > 0){
				path.add(event.layerX, event.layerY);
			}else{
				path.add(event.targetTouches[0].pageX, event.targetTouches[0].pageY - 56);
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

		strokeWidth.current.value = 1;
	}, []);

	if(path){
		path.strokeWidth = strokeWidthState;
	}

	const selectLine = (e)=>{
		if(e.target.tagName === 'LI'){
			pathHistory.forEach(item=> item.selected = false)
			pathHistory[+e.target.getAttribute('data-index')].selected = true;
		} else if(e.target.tagName === 'I'){
			pathHistory[+e.target.parentElement.getAttribute('data-index')].remove();
			const newPaths = pathHistory;
			newPaths.splice(+e.target.parentElement.getAttribute('data-index'), 1);
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
				<div className='tools'>
					{strokeWidthState}
					<input onInput={(e) => setStrokeWidth(e.target.value)} ref={strokeWidth} type='range' min='1' max='100'></input>
				</div>
			</div>
		</div>
	</div>
	);
}