import { useState, useEffect } from "react";
import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Play,
  Lock,
  FileText,
  Info,
  Timer,
  BookOpen,
  Code,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Test {
  testId: string;
  name: string;
  description: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
  Sections: Section[];
}

interface Section {
  id: number;
  name: string;
  duration: number;
  type: string;
  correctMarks: number;
  instructions: string | null;
  testId: string;
  createdAt: string;
  updatedAt: string;
  test_id: string;
  MCQs?: MCQ[];
}

interface MCQ {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  correctOptionLetter: string;
  sectionId: number;
  createdAt: string;
  updatedAt: string;
  section_id: number;
}

const StudentAssessment = () => {
  const [passcode, setPasscode] = useState("");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [showPreTestScreen, setShowPreTestScreen] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  const [upcomingTests, setUpcomingTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/test/");
        if (!response.ok) throw new Error("Failed to fetch tests");

        const data = await response.json();
        console.log("Fetched data:", data);

        const formattedData = data.map((test: any) => ({
          ...test,
          testId: String(test.testId), // ensure testId is string
        }));

        setUpcomingTests(formattedData);
        console.log("Upcoming tests set:", formattedData);
      } catch (error) {
        console.error("Fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load tests. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [toast]);

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    setShowPasscodeDialog(true);
    setPasscode("");
    setPasscodeError("");
  };

  // const handlePasscodeSubmit = async () => {
  //   if (passcode.length !== 6) {
  //     setPasscodeError("Please enter a 6-digit passcode");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`http://localhost:5000/api/passcode/validate`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         // testId: selectedTest?.testId,
  //         code: passcode
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.valid) {
  //       setShowPasscodeDialog(false);
  //       setShowPreTestScreen(true);
  //       toast({
  //         title: "Access Granted",
  //         description: "Welcome to the assessment. Please review the instructions carefully.",
  //       });
  //     } else {
  //       setPasscodeError("Invalid passcode. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Passcode error:", error);
  //     setPasscodeError("Failed to validate passcode. Please try again.");
  //   }
  // };
  const handlePasscodeSubmit = async () => {
    if (passcode.length !== 6) {
      setPasscodeError("Please enter a 6-digit passcode");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/passcode/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: passcode, // ✅ FIXED
          }),
        }
      );

      const data = await response.json();

      if (data.valid) {
        setShowPasscodeDialog(false);
        setShowPreTestScreen(true);
        toast({
          title: "Access Granted",
          description:
            "Welcome to the assessment. Please review the instructions carefully.",
        });
      } else {
        setPasscodeError(data.message || "Invalid passcode. Please try again.");
      }
    } catch (error) {
      console.error("Passcode validation failed", error);
      setPasscodeError("Failed to validate passcode. Please try again.");
    }
  };

  const handleBeginTest = () => {
    setShowPreTestScreen(false);
    toast({
      title: "Test Started",
      description: "Good luck! The timer has begun.",
    });
    navigate(`/student/test/${selectedTest?.testId}`);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading tests...</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">📋 Assessment Center</h1>
              <p className="text-blue-100">
                Your upcoming tests and assessments
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{upcomingTests.length}</div>
              <div className="text-sm text-blue-200">Upcoming Tests</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Tests
          </h2>

          {upcomingTests.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No upcoming tests available</p>
              </CardContent>
            </Card>
          ) : (
            upcomingTests.map((test) => (
              <Card
                key={test.testId}
                className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {test.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {test.testId}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{test.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(test.createdAt)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {formatTime(test.createdAt)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Timer className="w-4 h-4" />
                          {test.Sections.reduce(
                            (total, s) => total + s.duration,
                            0
                          )}{" "}
                          minutes
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {test.Sections.map((section, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {section.type === "MCQ" ? "📝" : "💻"}{" "}
                            {section.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="ml-6">
                      <Button
                        onClick={() => handleStartTest(test)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Passcode Dialog */}
        <Dialog open={showPasscodeDialog} onOpenChange={setShowPasscodeDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Enter Test Passcode
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Please enter the 6-digit passcode to access the test
                </p>
                <Input
                  type="text"
                  placeholder="000000"
                  value={passcode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setPasscode(value);
                    setPasscodeError("");
                  }}
                  className="text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                />
                {passcodeError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {passcodeError}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPasscodeDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handlePasscodeSubmit} className="flex-1">
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pre-Test Screen Dialog */}
        <Dialog open={showPreTestScreen} onOpenChange={setShowPreTestScreen}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Test Instructions - {selectedTest?.name}
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Test Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedTest?.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedTest?.Sections.reduce(
                            (total, section) => total + section.duration,
                            0
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Minutes
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedTest?.Sections.length}
                        </div>
                        <div className="text-sm text-gray-600">Sections</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      General Instructions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedTest?.instructions}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sections" className="space-y-4">
                {selectedTest?.Sections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {section.type === "MCQ" ? (
                          <FileText className="w-5 h-5" />
                        ) : (
                          <Code className="w-5 h-5" />
                        )}
                        {section.name}
                        <Badge variant="outline">{section.duration} min</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        {section.instructions ||
                          "No specific instructions provided for this section."}
                      </p>
                      {section.MCQs && (
                        <div className="mt-2 text-sm text-gray-500">
                          Contains {section.MCQs.length} questions
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowPreTestScreen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBeginTest}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Begin Test
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StudentLayout>
  );
};

export default StudentAssessment;
