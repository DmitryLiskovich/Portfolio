import React from 'react';
import { HeadSection } from './components/HeadSection';
import { MyProjects } from './components/MyProjects';
import { Slider } from './components/Slider';
import { Skills } from './components/Skills';
import './scss/about.scss';

function About () {
  document.title = "Dmitry Liskovich | About Me";

  return(
    <div id="about" className='about'>
      <HeadSection/>
      <MyProjects/>
      <Slider/>
      <Skills/>
    </div>
  );
}

export default About;