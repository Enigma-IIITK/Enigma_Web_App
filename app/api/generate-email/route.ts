import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs/promises'; // Use fs/promises for reading the HTML file
import { promisify } from 'util';

const execPromise = promisify(exec);

// Function to run the Python script
async function runPythonScript(): Promise<void> {
  const scriptPath = path.join(process.cwd(), 'Scripts', 'main.py');
  try {
    // Execute the Python script
    await execPromise(`C:/Users/zamza/AppData/Local/Programs/Python/Python310/python.exe ${scriptPath}`);
  } catch (error) {
    console.error('Error executing Python script:', error);
    throw new Error('Error running Python script');
  }
}

// Function to read the content of the generated HTML file
async function getEmailContent(): Promise<string> {
  const outputPath = path.join(process.cwd(), 'Scripts', 'output_email.html');
  try {
    // Read the HTML file
    const emailContent = await fs.readFile(outputPath, 'utf-8');
    return emailContent;
  } catch (error) {
    console.error('Error reading HTML file:', error);
    throw new Error('Error reading HTML file');
  }
}

// Named export for the GET method
export async function GET() {
  try {
    // Run the Python script to generate the email content
    await runPythonScript();

    // Get the generated email content from the HTML file
    const emailContent = await getEmailContent();

    // Return the email content as a JSON response
    return NextResponse.json({ emailContent });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
