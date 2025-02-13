import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: Request) {
  try {
    const { gender, answers } = await request.json();

    const completion = await groq.chat.completions.create({
      messages: [{
        role: "user",
        content: `You are an AI love guru. A user has answered 8 questions about their crush (who is a ${gender}).
        Based on these answers, predict if their crush might accept them as a Valentine.
        
        Here are the responses:
        ${answers.map((a: any) => `Q: ${a.question}\nA: ${a.answer}\n`).join('')}
        
        Based on their responses,(don't give your opinion about the information you received) predict:
        - A final verdict: (Yes, No, or Maybe)
        - Probability of success (0% to 100%)
        - A short explanation of why you think so`
      }],
      model: "llama3-70b-8192",
    });

    return NextResponse.json({ 
      prediction: completion.choices[0]?.message?.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get prediction' },
      { status: 500 }
    );
  }
}
