import React, {useState, useEffect, useRef} from 'react';
import './scss/about.scss';

function About () {
    const [currentPost, setCurrentPost] = useState(1);
    const [sectionActive, setSectionActive] = useState(false);
    const sectionFour = useRef(null);

    const cards = (e)=>{
        if(e.currentTarget.className.indexOf('active') !== -1){
			e.currentTarget.classList.remove('active');
		}else{
			e.currentTarget.classList.add('active');
		}
    }
    
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

    const slider = (post) => {
        document.title = 'About me';
        const image = ['sport','work','front'];

        
        return (
            <div>
                <h2>A little more about me</h2>
                <div className='about-section-3-slider'>
					<i className={`fas fa-chevron-left about-section-3-prev ${currentPost === 1 ? 'hidden' : ''}`} 
					onClick={()=> post > 1 ? setCurrentPost(currentPost-1) : setCurrentPost(currentPost)}></i>
					<div className='about-section-3-slider-wrapper'>
						<div className='about-section-3-slider-posts'>
							<div className='about-section-3-slider-posts-wrapper' style={{transform: `translateX(${-(currentPost-1 )* 33.33}%)`}}>
								<div className='about-section-3-slider-post first'>
									<h3>Sport</h3>
									<p>One of my hobbies is sport. I started doing sport when I was 10 y.o. Now I can do many different flips. I think it's amazing when you can do what other people can’t.</p>
								</div>
								<div className='about-section-3-slider-post second'>
									<h3>3D models</h3>
									<p>What can I say about that? I can create 3d models and it's cool. But now I have fallen in love with frontend developing.</p>
								</div>
								<div className= 'about-section-3-slider-post third'>
									<h3>Front-end</h3>
									<p>I discovered frontend developing a few months ago. And now I like it so much, and I devote to it all my free time.</p>
								</div>
							</div>
						</div>
					</div>
					<i className={`fas fa-chevron-right about-section-3-next ${currentPost === 3 ? 'hidden' : ''}`} 
					onClick={()=>post < 3 ? setCurrentPost(currentPost+1) : setCurrentPost(currentPost)}></i>
				</div>
            </div>
        );   
    }



    return(
        <div id="about" className='about'>
            <section className='about-section-1'>
                <div className='about-section-1-img'></div>
                <div className='about-section-1-text'>
					<div>
						<h2>Who am I?</h2>
						<h3>I AM A <span>FRONT-END</span> DEVELOPER</h3>
						<p>Hi, I'm a Front-End developer from Belarus. Development is my hobby. 
						I can create big projects with HTML5, CSS3, JavaScript, React.js and Node.js. I like what I do. Are you interested?</p>
					</div>
					<div onClick={()=> window.scrollTo(0, window.innerHeight - 56)} className='about-section-1 scroll'>
						<svg className='wheel' xmlns="http://www.w3.org/2000/svg" viewBox="-105 0 512 512.00002"><path  d="m150.601562 0c-83.042968 0-150.601562 67.558594-150.601562 150.601562v210.796876c0 83.042968 67.558594 150.601562 150.601562 150.601562 83.042969 0 150.601563-67.558594 150.601563-150.601562v-210.796876c0-83.042968-67.558594-150.601562-150.601563-150.601562zm119.882813 361.398438c0 66.101562-53.78125 119.882812-119.882813 119.882812-66.101562 0-119.882812-53.78125-119.882812-119.882812v-210.796876c0-66.101562 53.78125-119.882812 119.882812-119.882812 66.101563 0 119.882813 53.78125 119.882813 119.882812zm0 0"/><path d="m150.605469 101.851562c-8.484375 0-15.359375 6.875-15.359375 15.359376v70.695312c0 8.480469 6.875 15.359375 15.359375 15.359375 8.480469 0 15.359375-6.878906 15.359375-15.359375v-70.695312c0-8.484376-6.875-15.359376-15.359375-15.359376zm0 0"/></svg>
						<p>Scroll down</p>
					</div>
                </div>
            </section>
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
                                <div className='about-section-2-image chat'>
                                </div>
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
            <section className='about-section-3'>
                {slider(currentPost)}
            </section>
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
        </div>
    );
}

export default About;