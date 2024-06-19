import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Rubik_Moonrocks} from 'next/font/google'

export const rubick = Rubik_Moonrocks({
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
        '/events/session3.png'
    ];
    const headings = {
        "/events/inaguration.jpeg" : "Club Inauguration",
        "/events/poster_hackathon.png" : "AI Hackathon",
        "/events/session1.png" : "O TO HERO IN REINFORCEMENT LEARNING",
        "/events/session2.png" : "DEEP DIVE INTO NEAT AI",
        "/events/session3.png" : "HANDS ON XPERIENCE",
    }

    const [items, setItems] = useState<string[]>(initialItems);
    const [centerIndex, setCenterIndex] = useState<number>(2);
    const [scrolling, setScrolling] = useState<boolean>(false);

    const handleItemClick = (index: number) => {
        if (index !== centerIndex) {
            let newItems = [...items];
            if (index > centerIndex) {
                let n = newItems.length;
                let t = newItems[n-1];
                newItems[n-1] = newItems[0];
                newItems[0] = newItems[1];

                for(var i = 1;i<n-1;i++){
                    newItems[i] = newItems[i+1];
                }

                newItems[n-2] = t;

                // [newItems[centerIndex], newItems[centerIndex - 1]] = [newItems[centerIndex - 1], newItems[centerIndex]];
            }
            else {
                let n = newItems.length;
                let t = newItems[0]
                newItems[0] = newItems[n-1]
                newItems[n-1] = newItems[n-2]
                let temp;
                for(var i = 1;i<n-1;i++){
                    temp = newItems[i];
                    newItems[i] = t;
                    t = temp;
                }

                //[newItems[centerIndex], newItems[centerIndex + 1]] = [newItems[centerIndex + 1], newItems[centerIndex]];
            }
            //[newItems[centerIndex], newItems[index]] = [newItems[index], newItems[centerIndex]];

            

            setItems(newItems);
        }
    };

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (!scrolling) {
                setScrolling(true);
                setTimeout(() => {
                    if (event.deltaY > 0) {
                        handleItemClick(centerIndex + 1);
                    } else {
                        handleItemClick(centerIndex - 1);
                    }
                    setScrolling(false);
                }, 500); // Adjust the delay as needed
            }
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [centerIndex, items, scrolling]);

    return (
        <div className="flex justify-center items-center space-x-4 px-10">
            {items.map((src, index) => (
                <motion.div
                    key={index}
                    className={`rounded-md overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${index === centerIndex ? 'flex-grow-0 flex-shrink-0 w-2/3 z-10' : 'flex-grow-0 flex-shrink-0 w-1/6 filter blur-sm'
                        }`}
                    onClick={() => handleItemClick(index)}
                    initial={{ scale: 1 }}
                    animate={{ scale: index === centerIndex ? 1.1 : 1 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={src}
                            src={src}
                            className="w-full h-[65vh] object-cover rounded-md"
                            alt={`Item ${index + 1}`}
                            initial={{ width: "65%", marginLeft: "17.5%", scaleY: 0.8 }}
                            animate={{ width: "100%", marginLeft: "0%", scaleY: 1 }}
                            exit={{ width: "50%", marginLeft: "25%", scaleY: 0.8 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </AnimatePresence>
                    {index === centerIndex && (
            <div className="text-center mt-2 ">
              <h1 className={`${rubick.className} text-white text-5xl`}>{headings[src]}</h1>
            </div>
          )}

                </motion.div>
            ))}
        </div>
    );
};

export default Carousel;
