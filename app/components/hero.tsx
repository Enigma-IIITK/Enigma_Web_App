import React, { useEffect, useState } from 'react';
import '@fontsource/montserrat';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [sectionHeight, setSectionHeight] = useState<number>(87);

  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    setSectionHeight(Math.min(100, 60 + scrollPercentage));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const heroStyle: React.CSSProperties = {
    height: `${sectionHeight}vh`, // Set the height dynamically
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const buttonContainerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px', // Adjust the distance from the bottom as needed
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%', // Set the image height to 100% of the section height
    objectFit: 'cover',
  };

  return (
    <section className="bg-[url('/testbg2.png')]" id="scrollSection" style={heroStyle}>
      <center>
      <div className="vibrate-container">
          <img src="/title.png" alt="ENIGMA" style={imageStyle} className="lg:h-[100px] " />
        </div>
      </center>
      
      {/* Other content here */}
      
    </section>
  );
};


interface DrawOutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DrawOutlineButton: React.FC<DrawOutlineButtonProps> = ({ children, ...rest }) => {
  return (
    <a href="#letsgo"

      className="group relative bg-transparent px-4 py-2 border rounded font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300 hover:bg-slate-700 hover:border-transparent"
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
    </a>
  );
};




const FuzzyOverlay: React.FC = () => {
  return (
    <motion.div
      initial={{ transform: 'translateX(-10%) translateY(-10%)' }}
      animate={{
        transform: 'translateX(10%) translateY(10%)',
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: 'linear',
        repeatType: 'mirror',
      }}
      style={{
        backgroundImage: 'url("/logo_fuzz.jpg")',
        height: '1rem',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};

export default Hero;

