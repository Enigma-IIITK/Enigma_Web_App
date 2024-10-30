import cron from 'node-cron';
import { NextResponse } from 'next/server'; // Next.js server response
import { fetchEmailContent, fetchSubscribers, sendEmailToRecipient } from '../../utils/emailService'; // Adjust import path based on your setup

let emailTask: cron.ScheduledTask | null = null;

// Function to send emails to all subscribers
async function sendEmailsToAllSubscribers() {
  const emails = await fetchSubscribers(); // Fetch subscribers
  const content = await fetchEmailContent(); // Fetch email content

  for (const email of emails) {
    await sendEmailToRecipient(email, content); // Send email to each subscriber
  }
}

// Named export for the POST request
export async function POST(request: Request) {
  const { action } = await request.json();

  if (action === 'start') {
    if (!emailTask) {
      // Schedule the task to run every 5 minutes
      emailTask = cron.schedule('*/1 * * * *', async () => {
        console.log('Running scheduled email task...');
        await sendEmailsToAllSubscribers();
      });
      emailTask.start();
      return NextResponse.json({ message: 'Email schedule started' });
    } else {
      return NextResponse.json({ message: 'Email schedule is already running' }, { status: 400 });
    }
  } else if (action === 'stop') {
    if (emailTask) {
      emailTask.stop();
      emailTask = null;
      return NextResponse.json({ message: 'Email schedule stopped' });
    } else {
      return NextResponse.json({ message: 'No email schedule is running' }, { status: 400 });
    }
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
}
