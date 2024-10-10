// app/api/send-email/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, content } = await req.json();

    // Create URLSearchParams and append data
    const url = new URL('https://script.google.com/macros/s/AKfycbx68tQhrGjYfXo4yfGhpKeph3Gca4tsFA5MfVd99t-nkvn0FVg4FQf7UEJXgtO25ygKXg/exec');
    url.searchParams.append('email', email);

    // Send POST request to the Google Apps Script
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content}), // Include body if needed by your Google Script
    });

    const result = await response.json();

    // Return success response
    return NextResponse.json({ message: 'Email sent successfully', result });
  } catch (error) {
    // Handle errors
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
