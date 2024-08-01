"use client"
import React, { useEffect, useState } from 'react';
import { Bebas_Neue } from '@next/font/google';
import { db } from '../firebase/addData';  // Adjust the path according to your project structure
import { collection, getDocs } from 'firebase/firestore';

export const Bebas = Bebas_Neue({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
});

export default function EventFooter() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollection = collection(db, 'events');
            const eventSnapshot = await getDocs(eventsCollection);
            let eventList = eventSnapshot.docs.map(doc => doc.data());

            const now = new Date();
            eventList.filter(event => new Date(`${event.date} ${event.time}`) < now);
            
            setEvents(eventList);
        };

        fetchEvents();
    }, []);

    return (
        <>
            <br />
            <div className="container py-8">
                <span className="text-3xl lg:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text px-4">Upcoming Events</span>
            </div>
            <br />
            <div className="overflow-x-scroll scrollbar-hide">
                <div className="flex space-x-8 px-4">
                    <div className="flex-none">
                        <div className="w-14 lg:w-28">&nbsp;</div>
                    </div>
                    {events.map((event, index) => (
                        <div className="flex-none" key={index}>
                            <img src={event.imageUrl || "/events/session1.png"} className="rounded-md h-[50vh]" alt={event.name || "Event"} />
                            <br />
                            <button className="p-[3px] relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
                                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                                    <a href={"/rspv/"+event.id}>RSVP NOW</a>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
