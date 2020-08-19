import React, { lazy } from 'react';
import { HeadSection } from './components/HeadSection';
import './scss/about.scss';

const MyProjects = lazy(() => import('./components/MyProjects'));
const Slider = lazy(() => import('./components/Slider'));
const Skills = lazy(() => import('./components/Skills'));

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