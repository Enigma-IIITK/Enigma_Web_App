"use client";

import { useState, useEffect } from "react";
import { Heart, ArrowRight, ArrowLeft, Share2, Loader2, Flame, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "What do you like the most about your crush? (e.g., looks, personality, talent, kindness)",
  "Have you ever talked to them?",
  "If yes, how do they usually respond? (e.g., friendly, neutral, not interested) If no, type 'Not yet'.",
  "Do you both have anything in common? (e.g., hobbies, favorite music, same school/college, etc.)",
  "How do you usually act around them? (e.g., nervous, confident, shy, don't see them much)",
  "How would you feel about confessing to them? (e.g., excited, scared, not sure, never thought about it)",
  "If they rejected you, what would you do? (e.g., move on, stay friends, keep trying, feel heartbroken)",
  "Why do you want them to be your Valentine? (e.g., just a crush, really like them, want to know them better)",
];

const predefinedAnswers = {
  0: [
    "Their smile lights up my world and their personality is just amazing",
    "They're incredibly talented and kind to everyone",
    "Everything about them is perfect, from their looks to their heart",
  ],
  1: [
    "Yes, but I get nervous every time",
    "No, I just admire from afar",
    "Only in group settings",
  ],
  2: [
    "They're always friendly but I can't tell if they like me",
    "They seem interested in our conversations",
    "Not yet, waiting for the perfect moment",
  ],
  3: [
    "We both love the same music and movies",
    "We're in the same club/team at school",
    "We share similar dreams and aspirations",
  ],
  4: [
    "I'm too shy to even make eye contact",
    "I try to act cool but probably look awkward",
    "I can be myself around them but get butterflies",
  ],
  5: [
    "I'm scared but I think it's time to take the risk",
    "I'm excited but worried about ruining our friendship",
    "I've been practicing what to say in the mirror",
  ],
  6: [
    "I'd respect their decision and try to move on",
    "It would hurt, but our friendship matters more",
    "Take time to heal and focus on self-improvement",
  ],
  7: [
    "They make me want to be a better person",
    "We have amazing chemistry and potential",
    "I've never felt this way about anyone before",
  ],
};

async function askGroq(gender: string, answers: any[], mode: "normal" | "roast") {
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gender, answers, mode })
    });

    if (!response.ok) {
      throw new Error('Failed to get prediction');
    }

    const data = await response.json();
    console.log(data)
    return {
      intro: data.intro || "Loading your love forecast...",
      analysis: data.analysis || "Analyzing your romantic potential...",
      verdict: data.verdict || "Calculating final prediction...",
      percentage: data.percentage || 0,
      message: data.message || "Calculating your chances..."
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to get prediction");
  }
}

const FloatingEmoji = ({
  emoji,
  mode,
}: {
  emoji: string;
  mode: "normal" | "roast";
}) => {
  const randomX = Math.random() * 100 - 50;
  const randomDuration = 3 + Math.random() * 2;
  const randomDelay = Math.random() * 2;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 0,
        x: randomX,
        scale: mode === "roast" ? 1.5 : 1,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: -100,
        rotate: mode === "roast" ? [0, -10, 10, -10, 0] : [0, 10, -10, 10, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="absolute text-2xl pointer-events-none"
    >
      {emoji}
    </motion.div>
  );
};

const FloatingEmojis = ({ mode }: { mode: "normal" | "roast" }) => {
  const normalEmojis = ["❤️", "💖", "💝", "💕", "🥰", "😊", "💗"];
  const roastEmojis = ["🔥", "👿", "😈", "💀", "☠️", "🌋", "🖤"];
  const emojis = mode === "normal" ? normalEmojis : roastEmojis;

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
      {emojis.map((emoji, index) => (
        <FloatingEmoji key={index} emoji={emoji} mode={mode} />
      ))}
    </div>
  );
};

export default function Home() {
  const [gender, setGender] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<"normal" | "roast">("normal");
  const [showRoastDisclaimer, setShowRoastDisclaimer] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [autoAdvanceTimer, setAutoAdvanceTimer] =
    useState<NodeJS.Timeout | null>(null);
  const [tabProgress, setTabProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (prediction) {
  //     const timer = setInterval(() => {
  //       setTabProgress((prev) => {
  //         if (prev >= 100) {
  //           setCurrentTab((prevTab) => {
  //             console.log("prev s tab", prevTab);
  //             if (prevTab === 0) {
  //               return 1;
  //             } else if (prevTab === 1) {
  //               return 2;
  //             } else {
  //               return 0;
  //             }
  //           });
  //           return 0;
  //         }
  //         return prev + 2;
  //       });
  //     }, 100);

  //     return () => clearInterval(timer);
  //   }
  // }, [prediction, currentTab]);

  const handleSubmit = async (selectedMode: "normal" | "roast") => {
    setIsLoading(true);
    setError("");
    try {
      const result = await askGroq(
        gender,
        questions.map((q, i) => ({
          question: q,
          answer: answers[i],
        })),
        selectedMode
      );
      setPrediction(result);
      setMode(selectedMode);
      setShowRoastDisclaimer(false);
    } catch (error) {
      setError("Failed to get prediction. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (answers[currentStep].trim() === "") {
      setError("Don't leave us hanging! Answer this question to proceed.");
      return;
    }
    setError("");
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleModeSelect = (selectedMode: "normal" | "roast") => {
    if (selectedMode === "roast") {
      setShowRoastDisclaimer(true);
    } else {
      handleSubmit(selectedMode);
    }
  };

  const handlePredefinedAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
  };

  if (showInitialAnimation) {
    return (
      <motion.div
        className="min-h-screen bg-pink-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-24 h-24 text-pink-500 mx-auto" />
          </motion.div>
          <h1 className="mt-4 text-3xl font-bold text-pink-600">
            Loading Love...
          </h1>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        mode === "normal" ? "bg-pink-50" : "bg-red-950"
      } transition-colors duration-500`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl font-bold mb-2 ${
              mode === "normal" ? "text-pink-600" : "text-red-200"
            }`}
          >
            {mode === "normal"
              ? "Turing's Rizz'O Meter"
              : "Turing's Roast Machine"}
          </h1>
          <p
            className={`text-xl ${
              mode === "normal" ? "text-pink-500" : "text-red-300"
            }`}
          >
            {mode === "normal"
              ? "Will Your Crush Be Your Valentine? Let's Find Out!"
              : "Prepare to Face the Brutal Truth!"}
          </p>
        </motion.div>

        {!showResults && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white rounded-lg shadow-xl p-8 ${
              mode === "normal" ? "border-pink-200" : "border-red-700"
            } border-2`}
          >
            {currentStep === 0 && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First, tell us about your crush's gender:
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">
                  penguin
                  </option>
                  <option value="non">
                  who are you the cops?
                  </option>
                </select>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {questions[currentStep]}
              </h3>
              <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {predefinedAnswers[
                  currentStep as keyof typeof predefinedAnswers
                ].map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedAnswer(answer)}
                    className="p-3 text-sm bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl transition-colors duration-200 text-center"
                  >
                    {answer}
                  </button>
                ))}
              </div>
              <textarea
                value={answers[currentStep]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[currentStep] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={4}
                placeholder="Type your answer here..."
              />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-md ${
                  currentStep === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600"
                } text-white transition-colors`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
              >
                {currentStep === questions.length - 1 ? "Submit" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            <div className="mt-6 bg-gray-100 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </motion.div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
              <p className="text-xl font-semibold">
                Calculating your rizz levels...
              </p>
              <p className="text-gray-600">Please wait!</p>
            </div>
          </div>
        )}

        {showResults && !isLoading && !prediction && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white rounded-lg shadow-xl p-8 ${
              mode === "normal" ? "border-pink-200" : "border-red-700"
            } border-2`}
          >
            <div className="mb-6">
              <button
                onClick={() => handleModeSelect("normal")}
                className="w-full mb-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                Get Honest Advice
              </button>
              <button
                onClick={() => handleModeSelect("roast")}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Flame className="w-5 h-5 mr-2" />
                Roast Me
              </button>
            </div>
          </motion.div>
        )}

        {prediction && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
              mode === "normal" ? "border-pink-200" : "border-red-700"
            } border-2 relative`}
          >
            <FloatingEmojis mode={mode} />
            <div className="h-1.5 bg-gray-100">
              <div
                className={`h-full ${
                  mode === "normal" ? "bg-pink-500" : "bg-red-600"
                } transition-all duration-100 rounded-full`}
                style={{ width: `${tabProgress}%` }}
              />
            </div>

            <div className="flex border-b p-1 bg-gradient-to-b from-white to-gray-50">
              {[
                mode === "normal" ? "Is It True Love?" : "Reality Check",
                mode === "normal" ? "Heart Reading" : "Brutal Truth",
                mode === "normal" ? "Cupid's Verdict" : "Final Verdict",
              ].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => {
                    console.log(index)
                    setCurrentTab(index);
                    setTabProgress(0);
                  }}
                  className={`flex-1 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    currentTab === index
                      ? mode === "normal"
                        ? "bg-pink-50 text-pink-600 shadow-sm border border-pink-200"
                        : "bg-red-950 text-red-200 shadow-sm border border-red-800"
                      : "text-gray-500 hover:bg-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`prose max-w-none ${
                    mode === "normal" ? "text-gray-800" : "text-red-800"
                  }`}
                >
                  {currentTab === 0 && (
                    <div className="relative">{prediction.intro}</div>
                  )}
                  {currentTab === 1 && (
                    <div className="relative">{prediction.analysis}</div>
                  )}
                  {currentTab === 2 && (
                    <div className="relative">
                      <center>
                      {prediction.verdict}<br></br>
                      Your predicted chance is : {prediction.percentage}%</center>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
                <button
                  onClick={() => {
                  window.location.reload();
                  }}
                  className={`flex-1 py-3 ${
                  mode === "normal"
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-red-600 hover:bg-red-700"
                  } text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`}
                >
                  Start Over
                </button>
                <button
                  onClick={() => handleModeSelect("roast")}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                >
                  <Flame className="w-5 h-5 mr-2" />
                  Roast Me
                </button>
                </div>
            </div>
          </motion.div>
        )}

        {showRoastDisclaimer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-950 rounded-lg p-8 max-w-md border-2 border-red-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-red-500">
                  ⚠️ Final Warning
                </h3>
                <button
                  onClick={() => setShowRoastDisclaimer(false)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-red-200 mb-6">
                You're about to enter the Roast Zone. Our AI has been trained in
                the art of savage comebacks and brutal honesty. Proceed at your
                own risk. We are not responsible for any emotional damage caused
                by the truth (or our savage humor).
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSubmit("roast")}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <Flame className="w-5 h-5 mr-2" />
                  Roast Me
                </button>
                <button
                  onClick={() => {
                    setShowRoastDisclaimer(false);
                    handleSubmit("normal");
                  }}
                  className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Nevermind, I'm Scared
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <footer
          className={`mt-12 text-center text-sm ${
            mode === "normal" ? "text-pink-600" : "text-red-200"
          }`}
        >
          For entertainment purposes only. Love is unpredictable, but we're here
          to make it fun!
        </footer>
      </div>
    </div>
  );
}
