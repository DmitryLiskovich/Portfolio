import React, { useState } from 'react';

export default function Slider() {
  const [currentPost, setCurrentPost] = useState(1);

  return(
    <section className='about-section-3'>
      <div>
        <h2>A little more about me</h2>
        <div className='about-section-3-slider'>
        <i className={`fas fa-chevron-left about-section-3-prev ${currentPost === 1 ? 'hidden' : ''}`} 
        onClick={()=> currentPost > 1 ? setCurrentPost(currentPost-1) : setCurrentPost(currentPost)}></i>
        <div className='about-section-3-slider-wrapper'>
          <div className='about-section-3-slider-posts'>
            <div className='about-section-3-slider-posts-wrapper' style={{transform: `translateX(${-(currentPost-1 )* 25}%)`}}>
              <div className='about-section-3-slider-post'>
                <h3>Sport</h3>
                <p>One of my hobbies is sport. I started doing sport when I was 10 y.o. Now I can do many different flips. I think it's amazing when you can do what other people can’t.</p>
              </div>
              <div className='about-section-3-slider-post'>
                <h3>3D models</h3>
                <p>What can I say about that? I can create 3d models and it's cool. But now I have fallen in love with frontend developing.</p>
              </div>
              <div className= 'about-section-3-slider-post'>
                <h3>Front-end</h3>
                <p>I discovered frontend developing a few months ago. And now I like it so much, and I devote to it all my free time.</p>
              </div>
              <div className= 'about-section-3-slider-post'>
              <iframe title='My parkour video' src="https://www.youtube.com/embed/D0ucfj_V4PQ"></iframe>
              </div>
            </div>
          </div>
        </div>
        <i className={`fas fa-chevron-right about-section-3-next ${currentPost === 4 ? 'hidden' : ''}`} 
        onClick={()=>currentPost < 4 ? setCurrentPost(currentPost+1) : setCurrentPost(currentPost)}></i>
				</div>
      </div>
    </section>
  )
}