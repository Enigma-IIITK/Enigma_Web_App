import React, { useState, useEffect } from 'react';
import { BadgePlus, Trash2 } from 'lucide-react';
import { collection, query, getDocs, addDoc, updateDoc, doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import firebase_app from "../firebase/config";

const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);
const collection_name = "events"

interface Event {
    id: string;
    title: string;
    venue: string;
    date: string;
    time: string;
    rsvpCount: number;
    imagePath: string;
}

const EventHead: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [previousEvents, setPreviousEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        title: '',
        venue: '',
        date: '',
        time: '',
        rsvpCount: 0,
        imagePath: '',
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const eventsRef = collection(db, collection_name);
        const eventsSnapshot = await getDocs(query(eventsRef));
        const eventsList = eventsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Event));

        const now = new Date();
        setUpcomingEvents(eventsList.filter(event => new Date(`${event.date} ${event.time}`) > now));
        setPreviousEvents(eventsList.filter(event => new Date(`${event.date} ${event.time}`) <= now));
    };

    const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);
    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (isEditModalOpen && selectedEvent) {
            setSelectedEvent(prev => ({ ...prev, [name]: value } as Event));
        } else {
            setNewEvent(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageUpload = async (file: File) => {
        const storageRef = ref(storage, `event_images/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const imageFile = (document.getElementById('image') as HTMLInputElement).files?.[0];
            let imagePath = '';
            if (imageFile) {
                imagePath = await handleImageUpload(imageFile);
            }

            const eventData = {
                ...newEvent,
                rsvpCount: 0,
                imagePath,
            };

            await addDoc(collection(db, collection_name), eventData);
            toggleAddModal();
            fetchEvents();
            setNewEvent({ title: '', venue: '', date: '', time: '', rsvpCount: 0, imagePath: '' });
        } catch (error) {
            console.error("Error adding event: ", error);
        }
    };

    const handleEditEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEvent) return;

        try {
            const imageFile = (document.getElementById('edit-image') as HTMLInputElement).files?.[0];
            let imagePath = selectedEvent.imagePath;
            if (imageFile) {
                imagePath = await handleImageUpload(imageFile);
            }

            const eventData = {
                ...selectedEvent,
                imagePath,
            };

            await updateDoc(doc(db, collection_name, selectedEvent.id), eventData);
            toggleEditModal();
            fetchEvents();
            setSelectedEvent(null);
        } catch (error) {
            console.error("Error editing event: ", error);
        }
    };

    const handleDeleteEvent = async (event: Event) => {
        if (window.confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
            try {
                // Delete the event document from Firestore
                await deleteDoc(doc(db, collection_name, event.id));
    
                // Delete the event image from Storage
                if (event.imagePath) {
                    const imageRef = ref(storage, event.imagePath);
                    await deleteObject(imageRef);
                }
    
                // Refresh the events list
                fetchEvents();
            } catch (error) {
                console.error("Error deleting event: ", error);
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    return (
        <div className="min-h-[100vh]">
            {/* Upcoming Events Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                    <button
                        className="h-min w-min block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={toggleAddModal}
                    >
                        <BadgePlus />
                    </button>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500 backdrop-blur-md">
                        {/* Table header */}
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-16 py-3">Poster</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Venue</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3">RSVP Count</th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody>
                            {upcomingEvents.map((event) => (
                                <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={event.imagePath} className="w-16 md:w-32 max-w-full max-h-full" alt={event.title} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{event.title}</td>
                                    <td className="px-6 py-4">{event.venue}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{formatDate(event.date)}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{event.time}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{event.rsvpCount}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => {
                                                setSelectedEvent(event);
                                                toggleEditModal();
                                            }}
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Event Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add an Event
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    onClick={toggleAddModal}
                                >
                                    X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleAddEvent}>
                                    <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Poster</label>
                                        <input type="file" name="image" id="image" accept="image/*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Title</label>
                                        <input type="text" name="title" id="title" value={newEvent.title} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                                        <input type="text" name="venue" id="venue" value={newEvent.venue} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                        <input type="date" name="date" id="date" value={newEvent.date} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                        <input type="time" name="time" id="time" value={newEvent.time} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Event</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Event
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    onClick={toggleEditModal}
                                >
                                    X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" onSubmit={handleEditEvent}>
                                    <div>
                                        <label htmlFor="edit-image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Poster</label>
                                        <input type="file" name="image" id="edit-image" accept="image/*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Title</label>
                                        <input type="text" name="title" id="edit-title" value={selectedEvent.title} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-venue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                                        <input type="text" name="venue" id="edit-venue" value={selectedEvent.venue} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                        <input type="date" name="date" id="edit-date" value={selectedEvent.date} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                        <input type="time" name="time" id="edit-time" value={selectedEvent.time} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Event</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                <div className="px-6 py-4 bg-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Previous Events</h2>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-16 py-3">Poster</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Venue</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Participant Count</th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {previousEvents.map((event) => (
                                <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={event.imagePath} className="w-16 md:w-32 max-w-full max-h-full rounded-md" alt={event.title} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{event.title}</td>
                                    <td className="px-6 py-4">{event.venue}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{formatDate(event.date)}</td>
                                    <td className="px-6 py-4">{event.rsvpCount}</td>
                                    <td className="px-6 py-4">
                                    <button
                                            onClick={() => handleDeleteEvent(event)}
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventHead;