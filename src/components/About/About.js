import React, {useState} from 'react';
import './scss/about.scss';

function About () {

    const [isOpen, setIsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(1);

    const cards = (e)=>{
		console.log();
        if(e.currentTarget.className.indexOf('active') !== -1){
			e.currentTarget.classList.remove('active');
		}else{
			e.currentTarget.classList.add('active');
		}
    }

    const slider = (post) => {
        document.title = 'About me';
        const posts = [`One of my hobbies is sport. I started doing sport when I was 10 y.o. Now I can do many different flips. I think it's amazing when you can do what other people can’t.`, 
        `What can I say about my current work? Usually, I create 3d models and it's cool. But now I have fallen in love with frontend developing.`, 
        `I discovered frontend developing a few months ago. And now I like it so much, and I devote to it all my free time.`];
        const title = ['Sport', 'Current work', 'Front-end'];
        const image = ['sport','work','front'];
        const objsArray = [
            {post: posts[0], title: title[0], image: image[0]},
            {post: posts[1], title: title[1], image: image[1]},
            {post: posts[2], title: title[2], image: image[2]},
        ];

        const currentPosts = `about-section-3-slider-post-slide-${post}`;
        
        return (
            <div>
                <h2>A little more about me</h2>
                <i className="fas fa-chevron-left about-section-3-prev" 
                onClick={()=> post > 1 ? setCurrentPost(currentPost-1) : setCurrentPost(currentPost)}></i>
                <div className={`about-section-3-image-${objsArray[post-1].image}`}></div>
                <i className="fas fa-chevron-right about-section-3-next" 
                onClick={()=>post < 3 ? setCurrentPost(currentPost+1) : setCurrentPost(currentPost)}></i>
                <div className='about-section-3-slider-post'>
                    <div className={currentPosts}>
                        <div className={post === 1 ? 'about-section-3-slider-post-1-active' : 'about-section-3-slider-post-1'}>
                            <h3>{objsArray[0].title}</h3>
                            <p>{objsArray[0].post}</p>
                        </div>
                        <div className={post === 2 ? 'about-section-3-slider-post-2-active' : 'about-section-3-slider-post-2'}>
                            <h3>{objsArray[1].title}</h3>
                            <p>{objsArray[1].post}</p>
                        </div>
                        <div className={post === 3 ? 'about-section-3-slider-post-3-active' : 'about-section-3-slider-post-3'}>
                            <h3>{objsArray[2].title}</h3>
                            <p>{objsArray[2].post}</p>
                        </div>
                    </div>
                </div>
                <ul className='about-points'>
                    <li className={post === 1 ? 'about-point-active' : 'about-point'} onClick={()=>setCurrentPost(1)}></li>
                    <li className={post === 2 ? 'about-point-active' : 'about-point'} onClick={()=>setCurrentPost(2)}></li>
                    <li className={post === 3 ? 'about-point-active' : 'about-point'} onClick={()=>setCurrentPost(3)}></li>
                </ul>
            </div>
        );   
    }



    return(
        <div id="about" className='about'>
            <section className='about-section-1'>
                <div className='about-section-1-img'></div>
                <div className='about-section-1-text'>
                    <h2>Who am I?</h2>
                    <h3>I AM A <span>FRONT-END</span> DEVELOPER</h3>
                    <p>Hi, I'm a Front-End developer from Belarus. Development is my hobby. 
                        I can create big projects with HTML5, CSS3, JavaScript, React.js and Node.js. I like what I do. Are you interested?</p>
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
        </div>
    );
}

export default About;