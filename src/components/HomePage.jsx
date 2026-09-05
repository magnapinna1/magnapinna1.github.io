import React, { useMemo } from 'react';
import '../styles/HomePage.css';
import BackgroundStars from './BackgroundStars';

const generateCurvedPath = (startX, startY, length, variance) => {
  let d = `M ${startX} ${startY}`;
  let currentX = startX;
  let currentY = startY;
  for (let i = 0; i < 2; i++) {
    const cp1x = currentX + (Math.random() * variance - variance / 2);
    const cp1y = currentY + length / 2;
    const cp2x = currentX + (Math.random() * variance - variance / 2);
    const cp2y = currentY + length;
    currentX = currentX + (Math.random() * (variance / 2) - variance / 4);
    currentY = currentY + length;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentX} ${currentY}`;
  }
  return d;
};


let _strands = null;
const getStrands = () => {
  if (_strands) return _strands;

  // Cut down count significantly on mobile to save battery
  const strandCount = window.innerWidth < 768 ? 12 : 30;

  _strands = Array.from({ length: strandCount }).map(() => {
    const startX = (Math.random() * 1.5 - 0.25) * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const length = Math.random() * 10 + 5;
    const variance = 10;
    const baseHue = Math.floor(Math.random() * 360);
    const baseRotation = Math.random() * 360;
    return {
      path: generateCurvedPath(startX, startY, length, variance),
      delay: Math.random() * 10,
      duration: Math.random() * 5 + 6,
      driftSpeed: Math.random() * 80 + 40,
      driftOffset: Math.random() * 100,
      baseHue,
      baseRotation,
    };
  });
  return _strands;
};


const CombJelliesSVG = () => {
  const strands = useMemo(() => {
    const strandCount = window.innerWidth < 768 ? 12 : 30;
    return Array.from({ length: strandCount }).map(() => {
      const startX = (Math.random() * 1.5 - 0.25) * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const length = Math.random() * 10 + 5;
      const variance = 10;
      const baseHue = Math.floor(Math.random() * 360);
      const baseRotation = Math.random() * 360;
      return {
        path: generateCurvedPath(startX, startY, length, variance),
        delay: Math.random() * 10,
        duration: Math.random() * 5 + 6,
        driftSpeed: Math.random() * 80 + 40,
        driftOffset: Math.random() * 100,
        baseHue,
        baseRotation,
      };
    });
  }, []);

  return (
  <div className="jelly-container">
    <svg className="jelly-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {strands.map((strand, i) => (
        <g key={`strand-group-${i}`} className="drifting-group" style={{
          animationDuration: `${strand.driftSpeed}s`,
          animationDelay: `-${strand.driftOffset}s`,
          '--jelly-hue': `${strand.baseHue}deg`,
          transformOrigin: '50% 50%'
        }}>
          {/* Group wrapper to handle the base rotation while leaving the animation transform alone */}
          <g style={{ transform: `rotate(${strand.baseRotation}deg)`, transformOrigin: 'center' }}>
            <path d={strand.path} fill="none" stroke="hsl(var(--jelly-hue), 10%, 15%)" strokeWidth="1" />
            <path d={strand.path} fill="none" strokeWidth="3" strokeLinecap="round" filter="url(#softGlow)" className="pulse-outer pulse-path" style={{ animationDuration: `${strand.duration}s`, animationDelay: `-${strand.delay}s` }} />
            <path d={strand.path} fill="none" strokeWidth="2" strokeLinecap="round" className="pulse-mid pulse-path" style={{ animationDuration: `${strand.duration}s`, animationDelay: `-${strand.delay}s` }} />
            <path d={strand.path} fill="none" strokeWidth="1" strokeLinecap="round" className="pulse-core pulse-path" style={{ animationDuration: `${strand.duration}s`, animationDelay: `-${strand.delay}s` }} />
          </g>
        </g>
      ))}
    </svg>
  </div>
  );
};

const HomePage = ({ effectsOn, mousePos }) => (
  <div className="portfolio-wrapper">
    <div className="effects-layer mouse-reveal" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <BackgroundStars /><CombJelliesSVG />
    </div>
    <div className="interactive-glow" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 0.8s ease', background: `radial-gradient(350px circle at var(--m-x) var(--m-y), rgba(42, 138, 106, 0.15), transparent 60%)`, boxShadow: `inset 0 0 100px rgba(188, 250, 255, 0.05)` }}></div>
    <div className={`bottom-ambient-gradient ${effectsOn ? '' : 'effects-off'}`}></div>
    <main className="main-content">
      <div className="glass-card" style={{ backdropFilter: effectsOn ? 'blur(14px)' : 'none', WebkitBackdropFilter: effectsOn ? 'blur(14px)' : 'none', transition: 'backdrop-filter 0.8s ease' }}>
        <div className="card-inner">
          <div className="left-column">
            <div className="profile-frame"><img src="./1668561727021.jpg" alt="Profile Pic" className="profile-pic" /></div>
            <nav className="links-nav">
              <a href="https://github.com/magnapinna1" className="nav-link">Github</a>
              <a href="https://www.linkedin.com/in/michael-morrill-591736177/" className="nav-link">LinkedIn</a>
              <a href="mailto:mmorrill99@gmail.com" className="nav-link">Email</a>
            </nav>
          </div>
          <div className="right-column">
            <header className="header-group">
              <h1 className="name-title">Michael Morrill</h1>
              <div className="separator"></div>
              <h2 className="role-title">Software Engineer</h2>
            </header>
            <div className="bio-content">
              <p>I'm a Software Engineer at <a href="https://wilcore.io/">Wilcore</a>. I'm currently working with the VA on healthcare innovations! I mainly use Python and Java to build cool stuff.</p>
              <p>Check out my projects page to see some of that cool stuff.</p>
            </div>
            <div className="skills-section">
              <h3 className="section-label">Core Expertise</h3>
              <div className="skills-list">
                <span className="skill-tag">Java (Spring)</span>
                <span className="skill-tag">Python (FastAPI)</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Kubernetes</span>
                <span className="skill-tag">AWS (EKS, DynamoDB, Lambda)</span>
                <span className="skill-tag">Apache Spark</span>
                <span className="skill-tag">Terraform</span>
                <span className="skill-tag">Qualys</span>
                <span className="skill-tag">Not Leetcode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
