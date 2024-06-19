import React, { useEffect, useState } from "react";
import "../events.css"; // Make sure to adjust the path based on your project structure
import { Monoton } from 'next/font/google'

export const monoton = Monoton({
  subsets: ['latin'],
  display: 'swap',
  weight : '400'
});


const EventsList: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <br />
    <hr />
    <h1 className={`${monoton.className} text-2xl lg:text-6xl p-4`}>
          Upcoming &nbsp;Events
    </h1>
    
    <div
      className={`flex overflow-x-auto p-4 ${scrolling ? "scrolling" : ""}`}
    >
      {/* Image 1 */}
      <img
        src="/events/session3.png"
        alt="Image 1"
        className="w-60 h-60 lg:w-72 lg:h-80 rounded-md mr-4"
      />

      {/* Image 2 */}
      <img
        src="/events/poster_hackathon.png"
        alt="Image 2"
        className="w-60 h-60 lg:w-72 lg:h-80 rounded-md mr-4"
      />
      {/*Uncomment this section  to add more images*/}
{/*       
      <img
        src="/events/session3.png"
        alt="Image 3"
        className="w-60 h-60 lg:w-72 lg:h-80 rounded-md mr-4"
      />

     
      <img
        src="/events/session3.png"
        alt="Image 4"
        className="w-60 h-60 lg:w-72 lg:h-80 rounded-md"
      /> */}
    </div>
    </>
  );
};

export default EventsList;
