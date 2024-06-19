import React from "react";
import '../events.css'
import { Monoton } from 'next/font/google'

export const monoton = Monoton({
  subsets: ['latin'],
  display: 'swap',
  weight : '400'
});

const CurrentEvent = () => {
  return (
    <section className="flex flex-col lg:flex-row p-8 items-center lg:justify-center">
      <div className="lg:flex-initial lg:px-6">
        <h1 className={`${monoton.className} text-3xl lg:text-6xl py-4`}>
          Next &nbsp;Event
        </h1>
      </div>
      <div className="basis-auto glow-border" id="card">
        <img
          src="/events/session2.png"
          alt="Your Image"
          className="w-full lg:w-[60vh]  h-[50vh] lg:h-[80vh] object-cover rounded-md lg:ml-4 mt-4 lg:mt-0"
        />
      </div>
    </section>
  );
};

export default CurrentEvent;
