'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import About from './components/about';
import Hero from './components/hero';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { HoverImageLinks } from './components/linkHover';
import { Vortex } from './components/ui/vortex';
import { VelocityScroll } from './components/ui/scroll-based-velocity-text';
import Navbar2 from './components/navbar2';

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Attach event listener for resizing
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>

      <Navbar2 />
      
      <div className="  h-[35rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-5xl md:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-blue-400">
            ENIGMA
          </h2>

          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            The Official AI ML Club of IIIT Kottayam.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button className="px-4 py-2 bg-white/30 backdrop-blur-md hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-500 transition duration-200 rounded-full text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] border border-white/20">
              Join Us in our Journey
            </button>
          </div>
        </Vortex>
      </div>
    
      <VelocityScroll
      text="..."
      default_velocity={5}
      className="font-display text-center text-4xl font-bold tracking-[-0.02em]  bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-blue-400 drop-shadow-sm  md:text-7xl md:leading-[5rem]"
    />
      {!isSmallScreen && <br />}
      <HoverImageLinks />
      <br />
      <About />
      <br /><br /><br />
      <Footer />
    </>
  );
}
