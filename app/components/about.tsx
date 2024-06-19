import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Fredericka_the_Great } from 'next/font/google'

export const fredericka = Fredericka_the_Great({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

const About = () => {

  const isSmallScreen = useMediaQuery({ maxWidth: 480});

  return (
    <>
      <section className="" id='about'>
        <br /><br /> <br />+
        
        <div className='w-full h-screen  grid grid-cols-2 '>
          
            <div className='flex flex-col justify-center w-full lg :h-2/3 px-10 sm:text-6xl text-6xl sm:px-20'>
            
              <img src="/enigmaMachine.png" alt="" className="invisible lg:visible rounded lg:h-[80vh] w-full" />
              
            </div>
         
          <div className='col-span-2 lg:col-span-1'>
            <h1 className={` ${fredericka.className} py-6 px-2 text-white text-5xl lg:text-8xl`}>Peep Our Story</h1>
            <p className={`${fredericka.className} text-white text-xl lg:text-3xl px-2`}>
              Our journey takes us back to the roots of AI, tracing the captivating tale of the Enigma Machine and the brilliant minds that cracked its code during World War II. Just like Alan Turing and his team, we're dedicated to pushing boundaries and exploring the uncharted territories of AI.
            </p>
          </div>
          <div className='col-span-2 px-3'>
            <p className={`${fredericka.className} text-white text-xl lg:text-3xl`}>
              Our club transcends being a mere hub for AI/ML enthusiasts; it's a vibrant playground where you can immerse yourself in the sheer joy of experimenting with AI/ML technologies.
            </p>
          </div>
        </div>
      </section>
      <br />
    </>
  );
};

export default About;
