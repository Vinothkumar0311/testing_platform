// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import StudentLayout from "@/components/StudentLayout";
// // import { Button } from "@/components/ui/button";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Label } from "@/components/ui/label";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Clock } from "lucide-react";

// // const MCQTest = () => {
// //   const { testId } = useParams();
// //   const [testData, setTestData] = useState<any>(null);
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [answers, setAnswers] = useState<Record<number, string>>({});
// //   const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
// //   const [timeLeft, setTimeLeft] = useState(1800); // default 30 mins
// //   const [isPaused, setIsPaused] = useState(false);

// //   // Fetch test data
// //   useEffect(() => {
// //     const fetchTest = async () => {
// //       const res = await fetch(`http://localhost:5000/api/test/${testId}`);
// //       const json = await res.json();
// //       setTestData(json);
// //       const totalSeconds = json.Sections.reduce((acc: number, sec: any) => acc + sec.duration * 60, 0);
// //       setTimeLeft(totalSeconds);
// //     };
// //     fetchTest();
// //   }, [testId]);

// //   // Timer logic
// //   useEffect(() => {
// //     if (!isPaused && timeLeft > 0) {
// //       const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
// //       return () => clearInterval(timer);
// //     }
// //   }, [timeLeft, isPaused]);

// //   if (!testData) return <StudentLayout><div className="p-6">Loading...</div></StudentLayout>;

// //   const allQuestions = testData.Sections.flatMap((section: any) =>
// //     section.MCQs.map((q: any, index: number) => ({
// //       ...q,
// //       sectionName: section.name,
// //       questionNo: index + 1
// //     }))
// //   );

// //   const currentQuestion = allQuestions[currentQuestionIndex];

// //   const formatTime = (s: number) =>
// //     `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// //   const handleAnswer = (value: string) => {
// //     setAnswers({ ...answers, [currentQuestion.id]: value });
// //   };

// //   const handleMark = () => {
// //     const newSet = new Set(markedForReview);
// //     if (newSet.has(currentQuestion.id)) {
// //       newSet.delete(currentQuestion.id);
// //     } else {
// //       newSet.add(currentQuestion.id);
// //     }
// //     setMarkedForReview(newSet);
// //   };

// //   const handleNext = () => {
// //     if (currentQuestionIndex < allQuestions.length - 1) {
// //       setCurrentQuestionIndex((i) => i + 1);
// //     }
// //   };

// //   const handleClear = () => {
// //     const newAnswers = { ...answers };
// //     delete newAnswers[currentQuestion.id];
// //     setAnswers(newAnswers);
// //   };

// //   const getStatusColor = (qid: number) => {
// //     if (answers[qid]) return "bg-green-500 text-white";
// //     if (markedForReview.has(qid)) return "bg-purple-500 text-white";
// //     if (qid === currentQuestion.id) return "bg-orange-500 text-white";
// //     return "bg-gray-200 text-gray-700";
// //   };

// //   return (
// //     <StudentLayout>
// //       <div className="flex h-screen">
// //         {/* Main Area */}
// //         <div className="flex-1 flex flex-col">
// //           <div className="bg-white border-b p-4 flex justify-between items-center">
// //             <h1 className="text-lg font-semibold">{testData.name}</h1>
// //             <div className="flex items-center gap-4 text-orange-600">
// //               <Clock className="w-4 h-4" />
// //               <span>Time Left: {formatTime(timeLeft)}</span>
// //               <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)}>
// //                 {isPaused ? "Resume" : "Pause"}
// //               </Button>
// //             </div>
// //           </div>

// //           <div className="p-4">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>
// //                   Q{currentQuestion.questionNo}: {currentQuestion.questionText}
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <RadioGroup
// //                   value={answers[currentQuestion.id] || ""}
// //                   onValueChange={handleAnswer}
// //                 >
// //                   {["A", "B", "C", "D"].map((opt) => (
// //                     <div key={opt} className="flex items-center space-x-3 p-3 border rounded mb-2">
// //                       <RadioGroupItem value={opt} id={`opt-${opt}`} />
// //                       <Label htmlFor={`opt-${opt}`}>
// //                         {opt}) {currentQuestion[`option${opt}`]}
// //                       </Label>
// //                     </div>
// //                   ))}
// //                 </RadioGroup>

// //                 <div className="flex justify-between mt-6 pt-4 border-t">
// //                   <Button variant="outline" onClick={handleMark}>
// //                     {markedForReview.has(currentQuestion.id) ? "Unmark" : "Mark for Review"} & Next
// //                   </Button>
// //                   <Button variant="outline" onClick={handleClear}>Clear</Button>
// //                   <Button onClick={handleNext} disabled={currentQuestionIndex === allQuestions.length - 1}>
// //                     Save & Next
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>

// //         {/* Sidebar */}
// //         <div className="w-80 border-l p-4 bg-white">
// //           <h3 className="text-md font-semibold mb-2">Question Palette</h3>
// //           <div className="grid grid-cols-4 gap-2">
// //             {allQuestions.map((q: any, idx: number) => (
// //               <button
// //                 key={q.id}
// //                 className={`w-8 h-8 rounded ${getStatusColor(q.id)}`}
// //                 onClick={() => setCurrentQuestionIndex(idx)}
// //               >
// //                 {q.questionNo}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </StudentLayout>
// //   );
// // };

// // export default MCQTest;


// import { useEffect, useState } from "react";
// import StudentLayout from "@/components/StudentLayout";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";

// const MCQTest = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [testData, setTestData] = useState<any>(null);
//   const [isTestEnded, setIsTestEnded] = useState(false);

//   // Fetch test data
//   useEffect(() => {
//     const fetchTest = async () => {
//       const res = await fetch(`http://localhost:5000/api/test/${testId}`);
//       const data = await res.json();
//       setTestData(data);
//     };
//     fetchTest();
//   }, [testId]);

//   // Fullscreen + event listeners on mount
//   useEffect(() => {
//     const enterFullscreen = async () => {
//       const elem = document.documentElement;
//       if (elem.requestFullscreen) {
//         await elem.requestFullscreen();
//       }
//     };

//     const handleVisibilityChange = () => {
//       if (document.hidden && !isTestEnded) {
//         endTest("You left the tab. Test ended.");
//       }
//     };

//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement && !isTestEnded) {
//         endTest("You exited fullscreen. Test ended.");
//       }
//     };

//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       e.preventDefault();
//       e.returnValue = "";
//     };

//     enterFullscreen();

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isTestEnded]);

//   const endTest = (reason: string) => {
//     setIsTestEnded(true);
//     if (document.fullscreenElement) {
//       document.exitFullscreen();
//     }

//     toast({
//       title: "Test Ended",
//       description: reason,
//       variant: "destructive",
//     });

//     // Navigate to result/summary or home
//     navigate("/student");
//   };

//   const handleManualSubmit = () => {
//     endTest("You submitted the test.");
//   };

//   if (!testData) return <p className="p-10 text-center">Loading test...</p>;

//   return (
//     <StudentLayout>
//       <div className="p-6 space-y-4">
//         <h1 className="text-xl font-bold">{testData.name}</h1>
//         <p className="text-gray-600">{testData.description}</p>

//         <div className="mt-4 border p-4 rounded-lg bg-gray-50">
//           {/* Dummy question view */}
//           {testData.Sections.map((section: any, i: number) => (
//             <div key={i} className="mb-6">
//               <h2 className="font-semibold">{section.name}</h2>
//               {section.MCQs.map((q: any) => (
//                 <div key={q.id} className="my-4">
//                   <p className="font-medium">{q.questionText}</p>
//                   <ul className="ml-4 list-disc text-sm">
//                     <li>A. {q.optionA}</li>
//                     <li>B. {q.optionB}</li>
//                     <li>C. {q.optionC}</li>
//                     <li>D. {q.optionD}</li>
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <Button
//           onClick={handleManualSubmit}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           Submit Test
//         </Button>
//       </div>
//     </StudentLayout>
//   );
// };

// export default MCQTest;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import StudentLayout from "@/components/StudentLayout";

const MCQTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // default 30 mins
  const [isPaused, setIsPaused] = useState(false);
  const [isTestEnded, setIsTestEnded] = useState(false);

  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch(`http://localhost:5000/api/test/${testId}`);
      const json = await res.json();
      setTestData(json);
      const totalSeconds = json.Sections.reduce((acc: number, sec: any) => acc + sec.duration * 60, 0);
      setTimeLeft(totalSeconds);
    };
    fetchTest();
  }, [testId]);

  // Timer logic
  useEffect(() => {
    if (!isPaused && timeLeft > 0 && !isTestEnded) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isTestEnded) {
      endTest("Time's up! Test auto-submitted.");
    }
  }, [timeLeft, isPaused, isTestEnded]);

  // Fullscreen + event listeners on mount
  useEffect(() => {
    if (isTestEnded) return;

    const enterFullscreen = async () => {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !isTestEnded) {
        endTest("You left the tab. Test ended.");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isTestEnded) {
        endTest("You exited fullscreen. Test ended.");
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isTestEnded) {
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave? Your test will be submitted.";
      }
    };

    enterFullscreen();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isTestEnded]);

  const endTest = (reason: string) => {
    setIsTestEnded(true);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error("Exit fullscreen error:", err));
    }

    toast({
      title: "Test Ended",
      description: reason,
      variant: "destructive",
    });

    // Submit answers to server here if needed
    console.log("Submitted answers:", answers);

    // Navigate to result/summary or home after a delay
    setTimeout(() => navigate("/student"), 3000);
  };

  const handleManualSubmit = () => {
    if (window.confirm("Are you sure you want to submit the test?")) {
      endTest("Test submitted successfully.");
    }
  };

  if (!testData) return <StudentLayout><div className="p-6">Loading...</div></StudentLayout>;

  const allQuestions = testData.Sections.flatMap((section: any) =>
    section.MCQs.map((q: any, index: number) => ({
      ...q,
      sectionName: section.name,
      questionNo: index + 1
    }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleMark = () => {
    const newSet = new Set(markedForReview);
    if (newSet.has(currentQuestion.id)) {
      newSet.delete(currentQuestion.id);
    } else {
      newSet.add(currentQuestion.id);
    }
    setMarkedForReview(newSet);
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  const handleClear = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
  };

  const getStatusColor = (qid: number) => {
    if (answers[qid]) return "bg-green-500 text-white";
    if (markedForReview.has(qid)) return "bg-purple-500 text-white";
    if (qid === currentQuestion.id) return "bg-orange-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <StudentLayout>
      <div className="flex h-screen">
        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b p-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">{testData.name}</h1>
            <div className="flex items-center gap-4 text-orange-600">
              <Clock className="w-4 h-4" />
              <span>Time Left: {formatTime(timeLeft)}</span>
              {/* <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsPaused(!isPaused)}
                disabled={isTestEnded}
              >
                {isPaused ? "Resume" : "Pause"}
              </Button> */}
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleManualSubmit}
                disabled={isTestEnded}
              >
                Submit Test
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Q{currentQuestion.questionNo}: {currentQuestion.questionText}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={handleAnswer}
                  disabled={isTestEnded}
                >
                  {["A", "B", "C", "D"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-3 p-3 border rounded mb-2">
                      <RadioGroupItem value={opt} id={`opt-${opt}`} />
                      <Label htmlFor={`opt-${opt}`}>
                        {opt}) {currentQuestion[`option${opt}`]}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-6 pt-4 border-t">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0 || isTestEnded}>
                      Previous
                    </Button>
                    <Button variant="outline" onClick={handleMark} disabled={isTestEnded}>
                      {markedForReview.has(currentQuestion.id) ? "Unmark" : "Mark for Review"} & Next
                    </Button>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={handleClear} disabled={isTestEnded}>
                      Clear
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={currentQuestionIndex === allQuestions.length - 1 || isTestEnded}
                    >
                      Save & Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l p-4 bg-white">
          <h3 className="text-md font-semibold mb-2">Question Palette</h3>
          <div className="grid grid-cols-4 gap-2">
            {allQuestions.map((q: any, idx: number) => (
              <button
                key={q.id}
                className={`w-8 h-8 rounded ${getStatusColor(q.id)}`}
                onClick={() => setCurrentQuestionIndex(idx)}
                disabled={isTestEnded}
              >
                {q.questionNo}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-green-500 mr-2"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-purple-500 mr-2"></div>
              <span>Marked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-orange-500 mr-2"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-gray-200 mr-2"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default MCQTest;