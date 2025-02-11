'use client';

import { useState } from 'react';
import Groq from 'groq-sdk';

const questions = [
  "What do you like the most about your crush? (e.g., looks, personality, talent, kindness)",
  "Have you ever talked to them? (Yes/No)",
  "If yes, how do they usually respond? (e.g., friendly, neutral, not interested) If no, type 'Not yet'.",
  "Do you both have anything in common? (e.g., hobbies, favorite music, same school/college, etc.)",
  "How do you usually act around them? (e.g., nervous, confident, shy, don't see them much)",
  "How would you feel about confessing to them? (e.g., excited, scared, not sure, never thought about it)",
  "If they rejected you, what would you do? (e.g., move on, stay friends, keep trying, feel heartbroken)",
  "Why do you want them to be your Valentine? (e.g., just a crush, really like them, want to know them better)"
];

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,dangerouslyAllowBrowser: true
});

async function askGroq(gender: string, answers: any[]) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{
        role: "user",
        content: `You are an AI love guru. A user has answered 8 questions about their crush (who is a ${gender}).
        Based on these answers, predict if their crush might accept them as a Valentine.
        
        Here are the responses:
        ${answers.map((a) => `Q: ${a.question}\nA: ${a.answer}\n`).join('')}
        
        Based on their responses, predict:
        - Probability of success (0% to 100%)
        - A short explanation of why you think so
        - A final verdict: (Yes, No, or Maybe)`
      }],
      model: "llama3-70b-8192",
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error calling Groq:', error);
    throw new Error('Failed to get prediction');
  }
}

export default function Home() {
  const [gender, setGender] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [prediction, setPrediction] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await askGroq(
        gender,
        questions.map((q, i) => ({
          question: q,
          answer: answers[i]
        }))
      );
      setPrediction(result || 'No prediction received');
    } catch (error) {
      setError('Failed to get prediction. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
          💖 Valentine Crush Evaluator 💖
        </h1>

        {currentStep === 0 ? (
          <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
            <h2 className="text-xl mb-4 text-gray-800">Is your crush a boy or a girl?</h2>
            <div className="flex gap-4">
              {['boy', 'girl'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setGender(option);
                    handleNext();
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg text-lg transition-colors ${
                    gender === option
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 hover:bg-pink-100 text-gray-800'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : currentStep <= questions.length ? (
          <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentStep} of {questions.length}</span>
                <span>{Math.round((currentStep / questions.length) * 100)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${(currentStep / questions.length) * 100}%` }}
                />
              </div>
            </div>
            
            <h2 className="text-xl mb-4 text-gray-800">{questions[currentStep - 1]}</h2>
            <textarea
              value={answers[currentStep - 1]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[currentStep - 1] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="w-full p-3 border rounded-lg mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Type your answer here..."
            />
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={currentStep === questions.length ? handleSubmit : handleNext}
                disabled={!answers[currentStep - 1]}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  answers[currentStep - 1]
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === questions.length ? 'Get Prediction' : 'Next'}
              </button>
            </div>
          </div>
        ) : null}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Analyzing your responses...</p>
          </div>
        )}

        {prediction && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
              💘 AI's Verdict 💘
            </h2>
            <div className="whitespace-pre-wrap text-gray-800">
              {prediction}
            </div>
            <button
              onClick={() => {
                setCurrentStep(0);
                setGender('');
                setAnswers(Array(questions.length).fill(''));
                setPrediction('');
              }}
              className="mt-6 w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </main>
    </div>
  );
}