"use client"
import { useState } from 'react';
import { db } from '../firebase/addData'; 
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { SparklesCore } from "../components/ui/sparkles"; 

const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Query to find the subscriber by email
      const q = query(collection(db, 'subscribers'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('No subscription found for this email.');
        setLoading(false);
        return;
      }

      // Delete each matching subscriber document
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(docSnapshot.ref.firestore, 'subscribers', docSnapshot.id));
      });

      setMessage('You have been successfully unsubscribed!');
      setEmail('');
    } catch (error) {
      setMessage('There was an error. Please try again.');
      console.error('Error removing document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="text-white text-2xl mb-4">Unsubscribe from our Newsletter</h1>
      <form onSubmit={handleUnsubscribe} className="flex flex-col items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Unsubscribing...' : 'Unsubscribe'}
        </button>
      </form>
      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
};

export default Unsubscribe;
