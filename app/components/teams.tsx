'use client'
import React from "react";


import { Rubik_Moonrocks} from 'next/font/google'

export const rubick = Rubik_Moonrocks({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

const Teams = () => {
    return (
        <section>
            <div className="container py-16 mx-auto px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="col-span-1 row-span-2 relative">
                        <img
                            src="/img/TANYAGUPTA.jpg"
                            alt="Your Image"
                            className="w-full h-[70vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>CLUB LEAD</p>
                            <p className="text-white">TANYA GUPTA</p>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/img/AKHILESHNEKAR2.jpg"
                            alt="Your Image"
                            className="w-full h-[35vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>PR LEAD</p>
                            <p className="text-white">AKHILESH NEKAR</p>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1 row-span-1 relative">
                        <img
                            src="/img/me2.jpg"
                            alt="Your Image"
                            className="w-full h-[32vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>TECH LEAD</p>
                            <p className="text-white">ASHIQ FIROZ</p>
                        </div>
                    </div>
                    
                    <div className=" w-full col-span-3 lg:col-span-2 row-span-2 relative">
                        <img
                            src="/img/ADITYAUBALIGA.png"
                            alt="Your Image"
                            className="w-full h-[80vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>CLUB LEAD</p>
                            <p className="text-white">ADITYA U BALIGA</p>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 relative">
                        <img
                            src="/img/MARIPALLYAMOGH.jpg"
                            alt="Your Image"
                            className="w-full h-[30vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>RESEARCH LEAD</p>
                            <p className="text-white">MARIPALLY AMOGH</p>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 relative">
                        <img
                            src="/img/ADITIRAWAT2.jpg"
                            alt="Your Image"
                            className="w-full h-[40vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>CREATIVE LEAD</p>
                            <p className="text-white">ADITI RAWAT</p>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 relative">
                        <img
                            src="/img/gautham.jpg"
                            alt="Your Image"
                            className="w-full h-[35vh] object-cover rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                            <p className={`${rubick.className} text-white`}>DESIGN LEAD</p>
                            <p className="text-white">GAUTHAM SURESH</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teams;
