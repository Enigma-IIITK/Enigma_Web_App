
import { db } from '../firebase/addData'; 
import { collection, getDocs } from 'firebase/firestore';

// Function to fetch email content from the API
export async function fetchEmailContent() {
  const response = await fetch('/api/generate-email'); 
  const data = await response.json();
  return data.emailContent;
}

// Function to fetch subscriber emails from Firebase
export async function fetchSubscribers() {
  const subscriberCollection = collection(db, 'subscribers');
  const querySnapshot = await getDocs(subscriberCollection);
  return querySnapshot.docs.map((doc) => doc.data().email);
}

// Function to send an email to a single recipient
export async function sendEmailToRecipient(email, content) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, content }),
  });
  return response.json();
}
