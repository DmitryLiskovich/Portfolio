import React, { useState, useRef, useEffect } from 'react';

export function Skills() {
  const [sectionActive, setSectionActive] = useState(false);

  const sectionFour = useRef(null);
    
    useEffect(()=>{
        window.addEventListener('scroll', function check(){
            if(sectionFour.current){
				if(sectionFour.current.getBoundingClientRect().y < window.innerHeight - sectionFour.current.clientHeight){
					setSectionActive(true);
					window.removeEventListener('scroll', check);
				}
			}
        })
    }, [])

  return(
    <section className={`about-section-4 ${sectionActive ? '' : 'not-show'}`} ref={sectionFour}>
      <h2>Skills</h2>
      <ul className='skills'>
        <li><p>HTML : </p> <div className='skills-container'><div className='skills-persent' style={{width: '99%'}}></div></div></li>
        <li><p>CSS : </p> <div className='skills-container'><div className='skills-persent' style={{width: '99%'}}></div></div></li>
        <li><p>JS : </p> <div className='skills-container'><div className='skills-persent' style={{width: '99%'}}></div></div></li>
        <li><p>React: </p> <div className='skills-container'><div className='skills-persent' style={{width: '95%'}}></div></div></li>
        <li><p>Redux: </p> <div className='skills-container'><div className='skills-persent' style={{width: '80%'}}></div></div></li>
        <li><p>Node.js: </p> <div className='skills-container'><div className='skills-persent' style={{width: '70%'}}></div></div></li>
      </ul>
    </section>
  )
}