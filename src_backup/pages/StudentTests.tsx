
import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Play, Eye, CheckCircle, Timer, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentTests = () => {
  const navigate = useNavigate();

  const upcomingTests = [
    {
      id: 1,
      title: "React Fundamentals",
      subject: "Frontend Development",
      duration: 60,
      questions: 25,
      deadline: "2 days",
      status: "Not Started",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      subject: "Programming",
      duration: 45,
      questions: 20,
      deadline: "5 days",
      status: "Not Started",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Database Concepts",
      subject: "Backend Development",
      duration: 90,
      questions: 40,
      deadline: "1 week",
      status: "In Progress",
      difficulty: "Hard",
      progress: 60
    }
  ];

  const completedTests = [
    {
      id: 4,
      title: "HTML/CSS Basics",
      subject: "Web Development",
      duration: 30,
      questions: 15,
      completedDate: "2 days ago",
      score: 85,
      maxScore: 100,
      status: "Completed",
      difficulty: "Easy"
    },
    {
      id: 5,
      title: "Python Fundamentals",
      subject: "Programming",
      duration: 75,
      questions: 30,
      completedDate: "1 week ago",
      score: 92,
      maxScore: 100,
      status: "Completed",
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "Data Structures",
      subject: "Computer Science",
      duration: 120,
      questions: 50,
      completedDate: "2 weeks ago",
      score: 78,
      maxScore: 100,
      status: "Completed",
      difficulty: "Hard"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">My Tests</h1>
          <p className="text-blue-100">Track your progress and upcoming assessments</p>
        </div>

        {/* Test Navigation */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Upcoming Tests ({upcomingTests.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed Tests ({completedTests.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Tests */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{test.subject}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {test.duration} minutes
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          {test.questions} questions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <AlertCircle className="w-4 h-4" />
                          Due in {test.deadline}
                        </div>
                      </div>
                      
                      {test.status === "In Progress" && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{test.progress}% Complete</span>
                          </div>
                          <Progress value={test.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6">
                      {test.status === "Not Started" ? (
                        <Button onClick={() => navigate(`/student/test/${test.id}`)}>
                          <Play className="w-4 h-4 mr-2" />
                          Start Test
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/student/test/${test.id}`)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Tests */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{test.subject}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {test.duration} minutes
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          {test.questions} questions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4" />
                          Completed {test.completedDate}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Your Score</span>
                          <span className={`font-medium ${getScoreColor(test.score)}`}>
                            {test.score}/{test.maxScore} ({Math.round((test.score / test.maxScore) * 100)}%)
                          </span>
                        </div>
                        <Progress value={(test.score / test.maxScore) * 100} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{completedTests.length}</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Timer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{upcomingTests.length}</div>
              <div className="text-sm text-gray-600">Pending Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(completedTests.reduce((acc, test) => acc + (test.score / test.maxScore) * 100, 0) / completedTests.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentTests;
