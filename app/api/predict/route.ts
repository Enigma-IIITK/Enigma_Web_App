import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

interface RequestData {
  request: Request;
  resolve: (value: NextResponse | PromiseLike<NextResponse>) => void;
  reject: (reason?: any) => void;
}

const requestQueue: RequestData[] = [];
let isProcessingQueue = false;

const processQueue = async () => {
  if (isProcessingQueue) return;
  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const { request, resolve, reject } = requestQueue.shift()!;
    try {
      const response = await handleRequest(request);
      resolve(response);
    } catch (error) {
      reject(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 30 requests per minute = 1 request every 2 seconds
  }

  isProcessingQueue = false;
};

const handleRequest = async (request: Request) => {
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
          "intro": ${mode === "roast" ? "a brutal opening that roasts their situation make it so bad that they would want to give up the chance of ever trying again" : "a warm, encouraging opening about their situation"},
          "analysis": ${mode === "roast" ? "savage commentary about their answers, pointing out embarrassing details, make all the commentary into a single paragraph make it so bad that they would want to give up the chance of ever trying again" : "thoughtful analysis of their chances based on their answers, make all the analysis into a single paragraph"},
          "verdict": ${mode === "roast" ? "a hilarious final roast with a 0-100% chance of romantic success, make it so bad that they would want to give up the chance of ever trying again" : "a supportive final prediction with a 0-100% chance of success"},
          "percentage": "a number between 0 and 100 representing their chances",
          "message": "mention the percentage along the appropriate message"
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
};

export async function POST(request: Request) {
  return new Promise<NextResponse>((resolve, reject) => {
    requestQueue.push({ request, resolve, reject });
    processQueue();
  });
}
