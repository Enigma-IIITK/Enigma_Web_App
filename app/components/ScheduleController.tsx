import React from 'react';

export default function ScheduleControl() {
  async function startSchedule() {
    await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'start' }),
    });
    console.log('Email schedule started');
  }

  async function stopSchedule() {
    await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'stop' }),
    });
    console.log('Email schedule stopped');
  }

  return (
    <div>
      <button onClick={startSchedule}>Start Schedule</button>
      <button onClick={stopSchedule}>Stop Schedule</button>
    </div>
  );
}
