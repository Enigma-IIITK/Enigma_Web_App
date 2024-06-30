'use client'
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import NavBar2 from "../components/navbar2";
import Carousel from "../components/carousel";
import ImageStack from "../components/sm_carousel";
import EventHeader from "../components/EventHeader";
import EventFooter from "../components/EventFooter";

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
     <>
      <NavBar2 />
      <EventHeader />
      <EventFooter/>
      <div className="h-[20vh]">&nbsp;</div>

      <Footer />
    </>
  );
};

export default Page;
