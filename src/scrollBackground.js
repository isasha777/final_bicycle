import React, { useEffect, useState } from 'react';

const ScrollBackground = () => {
  const [background, setBackground] = useState('');

  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / maxScrollHeight) * 100;
      
        if (scrollPercentage > 50) {
          setBackground('url(/velo1)');
        } else {
          setBackground('url(/Users/alexnekrasow/Desktop/final project/bicycle-agency/src/velo1.jpg)');
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-background" style={{ background }}>
      <h1>ghbdkslkkdslds</h1>
    </div>
  );
};

export default ScrollBackground;
