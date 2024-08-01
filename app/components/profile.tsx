"use client";
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/AuthContext';
import firebase_app from "../firebase/config";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { collection, doc,query, where, getDocs, getFirestore, updateDoc, setDoc, addDoc } from 'firebase/firestore';
import Modal from './modal'; // Import the Modal component

const db = getFirestore(firebase_app);

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDocId, setUserDocId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is signed in');

        setEmail(user.email || '');
        const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const userDocId = querySnapshot.docs[0].id;
          setUserDocId(userDocId);
          setName(userData.name || '');
          setInstagram(userData.instagram || '');
          setLinkedin(userData.linkedin || '');

          if (!userData.name || !userData.instagram || !userData.linkedin) {
            setIsModalOpen(true);
          }
        } else {
          setIsModalOpen(true);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is signed in');

      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage('Password updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is signed in');

      if (userDocId) {
        const userDoc = doc(db, 'users', userDocId);
        await updateDoc(userDoc, {
          name,
          email,
          instagram,
          linkedin
        });
      } else {
        await addDoc(collection(db, 'users'), {
          name,
          email,
          instagram,
          linkedin
        });
      }
      setMessage('Profile updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-md shadow-sm bg-gray-900 text-gray-200">
      <h2 className="text-2xl font-bold mb-6">Profile Page</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Instagram URL</label>
        <input
          type="url"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="flex space-x-4">
        <button
          onClick={handleProfileUpdate}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Update Profile
        </button>
        <button
          onClick={handlePasswordChange}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Change Password
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4 bg-gray-900 text-gray-200 rounded-md">
            <h3 className="text-xl font-bold mb-4">Complete Your Profile</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Instagram URL</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300"
              />
            </div>
            <button
              onClick={handleProfileUpdate}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
