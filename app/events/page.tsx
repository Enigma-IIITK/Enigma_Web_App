'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CurrentEvent from "../components/currentEvent";
import PinnedSection from "../components/PinnedSection";
import EventsList from "../components/EventList";
import NavBar2 from "../components/navbar2";
import Carousel from "../components/carousel";
import ImageStack from "../components/sm_carousel";

const Page: React.FC = () => {
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
    <div className="relative overflow-hidden">
      <NavBar2 />

      {!isSmallScreen ? (
        <Carousel />
      ) : (
        <ImageStack/>
      )}

      {/* <CurrentEvent/>
      <hr />
      <PinnedSection/>
      <EventsList/> */}

      <div className="h-[20vh]">&nbsp;</div>
     
      <Footer />
    </div>
  );
};

export default Page;
