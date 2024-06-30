import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {Bebas_Neue} from '@next/font/google'

export const Bebas = Bebas_Neue({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
  });

const Carousel: React.FC = () => {
  const initialItems = [
    '/events/inaguration.jpeg',
    '/events/poster_hackathon.png',
    '/events/session1.png',
    '/events/session2.png',
    '/events/session3.png',
  ];
  const headings = {
    "/events/inaguration.jpeg": "Club Inauguration",
    "/events/poster_hackathon.png": "AI Hackathon",
    "/events/session1.png": "O TO HERO IN REINFORCEMENT LEARNING",
    "/events/session2.png": "DEEP DIVE INTO NEAT AI",
    "/events/session3.png": "HANDS ON XPERIENCE",
  }

  const [items, setItems] = useState<string[]>(initialItems);
  const [centerIndex, setCenterIndex] = useState<number>(2);

  const handleItemClick = (index: number) => {
    if (index !== centerIndex) {
      let newItems = [...items];
      if (index > centerIndex) {
        let n = newItems.length;
        let t = newItems[n - 1];
        newItems[n - 1] = newItems[0];
        newItems[0] = newItems[1];

        for (var i = 1; i < n - 1; i++) {
          newItems[i] = newItems[i + 1];
        }

        newItems[n - 2] = t;

      } else {
        let n = newItems.length;
        let t = newItems[0];
        newItems[0] = newItems[n - 1];
        newItems[n - 1] = newItems[n - 2];
        let temp;
        for (var i = 1; i < n - 1; i++) {
          temp = newItems[i];
          newItems[i] = t;
          t = temp;
        }
      }
      setItems(newItems);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 px-10">
      {items.map((src, index) => (
        <motion.div
          key={index}
          className={`rounded-md overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${index > 4 ? 'hidden' : index === centerIndex ? 'flex-grow-0 flex-shrink-0 w-2/3 z-10' : 'flex-grow-0 flex-shrink-0 w-1/6 filter blur-sm'
          }`}          
          onClick={() => handleItemClick(index)}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={src}
              src={src}
              className="w-full h-[65vh] object-cover rounded-md"
              alt={`Item ${index + 1}`}
              
            />
          </AnimatePresence>
          {index === centerIndex && (
            <div className="text-center mt-2">
              <h1 className={`${Bebas.className} text-white text-2xl lg:text-5xl`}>{headings[src]}</h1>
            </div>
          )}

        </motion.div>
        
      ))}
       {/* <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none outline-none cursor-pointer z-20"
        onClick={() => handleItemClick(centerIndex > 0 ? centerIndex - 1 : items.length - 1)}
      >
        <img src="/random/left_arrow.png" alt="Left Arrow" className="w-10 h-10" />
      </button> */}
      {/* <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none outline-none cursor-pointer z-20"
        onClick={() => handleItemClick(centerIndex < items.length - 1 ? centerIndex + 1 : 0)}
      >
        <img src="/random/right_arrow.png" alt="Right Arrow" className="w-10 h-10" />
      </button> */}
    </div>
  );
};

export default Carousel;
