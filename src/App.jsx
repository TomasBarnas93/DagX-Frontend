import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Intro from './views/Intro';
import Navbar from './views/Navbar';
import Body from './views/Body';
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <Navbar />
            <Body />
          </div>
          <Foot />
        </motion.div>
      )}
    </div>
  );
}

export default App;
