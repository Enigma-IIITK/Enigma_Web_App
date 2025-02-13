import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: Request) {
  try {
    const { gender, answers, mode } = await request.json();

    const completion = await groq.chat.completions.create({
      messages: [{
        role: "user",
        content: `You are an AI love guru with ${mode === "roast" ? "savage roasting abilities" : "gentle wisdom"}. 
        Analyze these 8 responses about their crush (who is a ${gender}) and ${
          mode === "roast"
            ? "absolutely destroy their confidence with clever, hilarious insults"
            : "provide kind but realistic guidance"
        }.
    
        Their responses:
        ${answers.map((a: any) => `Q: ${a.question}\nA: ${a.answer}\n`).join("")}
    
        Respond with a JSON object containing these sections only, do not add any extra text:
        {
          "intro": ${mode === "roast" ? "a brutal opening that roasts their situation" : "a warm, encouraging opening about their situation"},
          "analysis": ${mode === "roast" ? "savage commentary about their answers, pointing out embarrassing details" : "thoughtful analysis of their chances based on their answers"},
          "verdict": ${mode === "roast" ? "a hilarious final roast with a 0-100% chance of romantic success" : "a supportive final prediction with a 0-100% chance of success"},
          "percentage": "a number between 0 and 100 representing their chances",
          "message": "mention the percentage along the appropiate message"
        }`
      }],
      model: "llama3-70b-8192",
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0]?.message?.content || "";
    const parsedResponse = JSON.parse(response);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to get prediction' }, { status: 500 });
  }
}
