"use client"
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bebas_Neue } from '@next/font/google';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/addData'; 

// Firebase configuration and initialization should be done in a separate file (e.g., firebase.js or db.js)

export const Bebas = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

const Carousel: React.FC = () => {
  const [initialItems, setInitialItems] = useState<string[]>([]);
  const [headings, setHeadings] = useState<{ [key: string]: string }>({});
  const [items, setItems] = useState<string[]>(initialItems);
  const [centerIndex, setCenterIndex] = useState<number>(2);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      let eventsList = eventsSnapshot.docs.map(doc => doc.data());
      
      const now = new Date();
      eventsList.filter(event => new Date(`${event.date} ${event.time}`) > now);

      
      const items: string[] = [];
      const headings: { [key: string]: string } = {};


      eventsList.forEach(event => {
        if (event.imagePath && event.title) {
          items.push(event.imagePath);
          headings[event.imagePath] = event.title;
        }
      });

      console.log(items)

      setInitialItems(items);
      setHeadings(headings);
      setItems(items);
    };

    fetchEvents();
  }, []);


  

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
      
    </div>
  );
};

export default Carousel;
