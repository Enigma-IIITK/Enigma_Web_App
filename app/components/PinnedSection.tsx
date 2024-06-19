import React from "react";
import { Monoton } from 'next/font/google';

export const monoton = Monoton({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

const PinnedSection = () => {
  return (
    <>
      <br />
      <h1 className={`${monoton.className} text-4xl lg:text-6xl p-4`}>
        Past &nbsp;Events
      </h1>
      <div className="grid grid-cols-12 p-4 container">
        <div className="col-span-2"></div>
        <div className="col-span-12 lg:col-span-6 px-5 mb-4 lg:mb-0">
          <img
            src="/events/inaguration.jpeg"
            alt="Your Image"
            className="object-cover rounded-md lg:h-[80vh]"
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <img
            src="/events/session1.png"
            alt="Your Image"
            className="object-cover rounded-md lg:h-[80vh]"
          />
        </div>
      </div>
    </>
  );
};

export default PinnedSection;
