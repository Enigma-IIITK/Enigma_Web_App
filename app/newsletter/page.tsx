'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [emailContent, setEmailContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the email content from the API
  useEffect(() => {
    async function fetchEmailContent() {
      try {
        const response = await fetch('/api/generate-email');
        const data = await response.json();
        setEmailContent(data.emailContent);
      } catch (err) {
        setError('Failed to fetch email content.');
        console.error('Error fetching email content:', err);
      }
    }

    fetchEmailContent();
  }, []);

  // Inside your Home component
useEffect(() => {
  async function sendEmailContent() {
    if (emailContent) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'qdeveloper08@gmail.com', // Replace with the actual recipient email
            content: emailContent,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error('Error sending email:', result.error);
        } else {
          console.log('Email sent successfully:', result.message);
        }
      } catch (err) {
        console.error('Error sending email:', err);
      }
    }
  }

  sendEmailContent();
}, [emailContent]);

  return (
    <div>
      <h1>Generated Email Content</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: emailContent || 'Loading...' }} />
      )}
    </div>
  );
}
