import React from 'react';

export function MyProjects() {
  const cards = (e)=>{
    if(e.currentTarget.className.indexOf('active') !== -1){
      e.currentTarget.classList.remove('active');
    }else{
      e.currentTarget.classList.add('active');
    }
  }

  return(
    <section className='about-section-2'>
      <div className='about-section-2-content'>
        <div className='about-section-2-text'>
          <h2>My Projects</h2>
          <div className='about-projects-card'>
            <article onClick={cards} className='about-section-2-card active'>
              <h3 className='press'><span>Node.js Server</span><b>Press to open</b></h3>
              <div className='about-section-2-image'>
              </div>
              <div className='about-section-2-image-discryption'>
                <h3>Server for a mobile app on node.js</h3>
                <p>I have experience in creating node.js server for a mobile app created on 
                    Xamarin. It was my first project. In this project, I created 
                    a simple RESTfull service. I like this project, because it helped me
                    learn more about node.js.
                </p>
              </div>
            </article>
            <article onClick={cards} className='about-section-2-card active'>
              <h3 className='press'><span>WebRTC chat</span> <b>Press to open</b></h3>
              <div className='about-section-2-image chat-card'/>
              <div className='about-section-2-image-discryption'>
                  <h3>WebRTC chat</h3>
                  <p>I have experience in creating web video chat. It was project only for me. You can see this project on the page.
                  </p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <p className='about-section-2-PS'>P.S. I have not many projects now, but I can show you this pretty kitty</p>
      <div  className='about-app' >
        <a href='myprojects.com'><div className='about-pretty'></div></a>
      </div>
    </section>
  )
}