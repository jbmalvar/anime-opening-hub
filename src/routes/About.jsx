import './About.css'

function About() {
  return (
    <div className="About">
      <div className="AboutContainer">
        <div className="AboutContent">
          <h1 className="AboutTitle">About This Website</h1>
          <p>
            I created this for a class. Just a hub for showing you thoughts on anime openings. 
            Just kidding, literally just a discount reddit sub whatever they are called
            That's about all the effort I'm going to put into this about page. I'll 
            probably add more later, but for now, this the best you gonna get.
          </p>
          <p>Stuff I wish I got to:</p>
          <ul>
            <li>Route Pages for Anime Pages</li>
            <li>Overall UI feels offputting at times</li>
            <li>Multiple Anime Openings for one anime</li>
          </ul>

          <p>Guide for making post:</p>
          <ul>
            <li>Everything is pretty basic</li>
            <li>On every anime, there is an id for them ensure you grab the correct one and input it otherwise post will have wrong information</li>
            <li>Then simply create a post</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
