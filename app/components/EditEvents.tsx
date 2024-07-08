import React, { useState } from 'react';
import { BadgePlus } from 'lucide-react';

const EventHead: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="min-h-[100vh]">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center px-6 py-4 bg-gray-100 ">
                    <h2 className="text-2xl font-bold text-gray-900 ">
                        Upcoming Events
                    </h2>
                    <button 
                        data-modal-target="authentication-modal" 
                        data-modal-toggle="authentication-modal" 
                        className="h-min w-min block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                        type="button"
                        onClick={toggleModal}
                    >
                        <BadgePlus />
                    </button>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 backdrop-blur-md ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Poster</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Venue
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    Apple Watch
                                </td>
                                <td className="px-6 py-4">
                                   Venue
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    date
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    time
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    Apple Watch
                                </td>
                                <td className="px-6 py-4">
                                   Venue
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    date
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    time
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add an Event
                                </h3>
                                <button 
                                    type="button" 
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
                                    data-modal-hide="authentication-modal"
                                    onClick={toggleModal}
                                >  X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Title</label>
                                        <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                                        <input type="text" name="venue" id="venue" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                        <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                        <input type="time" name="time" id="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Event</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                <div className="px-6 py-4 bg-gray-100 ">
                    <h2 className="text-2xl font-bold text-gray-900 ">
                        Previous Events
                    </h2>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Poster</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Venue
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    Apple Watch
                                </td>
                                <td className="px-6 py-4">
                                   Venue
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    date
                                </td>
                               
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    Apple Watch
                                </td>
                                <td className="px-6 py-4">
                                   Venue
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    date
                                </td>
                               
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventHead;
