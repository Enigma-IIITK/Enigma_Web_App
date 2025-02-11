"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase/addData";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState<{ id: string; email: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const q = query(collection(db, "subscribers"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const subscribersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as { id: string; email: string }[];
        setSubscribers(subscribersList);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      await deleteDoc(doc(db, "subscribers", id));
      setSubscribers((prev) => prev.filter((subscriber) => subscriber.id !== id));
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Subscriber List</h1>
      
      <input
        type="text"
        placeholder="Search subscribers..."
        className="p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="w-full max-w-2xl mb-4">
        <p className="text-lg">Total Subscribers: {filteredSubscribers.length}</p>
      </div>

      <div className="w-full max-w-2xl overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Email</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="bg-gray-700 hover:bg-gray-600">
                  <td className="border border-gray-700 p-2">{subscriber.email}</td>
                  <td className="border border-gray-700 p-2 text-center">
                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                      onClick={() => handleDelete(subscriber.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center p-4">No subscribers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberList;
