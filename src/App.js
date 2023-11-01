import React, { useState, useEffect } from 'react';
import Intro from './views/Intro';
import Body from './views/Body';
import Navbar from './views/Navbar';
import Foot from './views/Foot';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleAnimationEnd = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showIntro]);

  return (
    <div>
      {showIntro ? (
        <Intro onAnimationEnd={handleAnimationEnd} />
      ) : (
        <div>
          <div>
            <Navbar />
            <Body />
          </div>
          <Foot />
        </div>
      )}
    </div>
  );
}

export default App;