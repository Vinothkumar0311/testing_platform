
import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Clock, Trophy, Play, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const upcomingTests = [
    { id: 1, title: "React Fundamentals", duration: "60 min", questions: 25, deadline: "2 days" },
    { id: 2, title: "JavaScript ES6+", duration: "45 min", questions: 20, deadline: "5 days" },
  ];

  const codeChalllenges = [
    { id: 1, title: "Array Algorithms", difficulty: "Medium", points: 100, timeLimit: "2 hours" },
    { id: 2, title: "String Manipulation", difficulty: "Easy", points: 50, timeLimit: "1 hour" },
  ];

  const recentScores = [
    { test: "HTML/CSS Basics", score: 85, maxScore: 100 },
    { test: "Python Fundamentals", score: 92, maxScore: 100 },
    { test: "Database Concepts", score: 78, maxScore: 100 },
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-blue-100">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Code className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Challenges Solved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">45h</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Upcoming Tests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{test.title}</h3>
                    <p className="text-sm text-gray-600">
                      {test.questions} questions • {test.duration} • Due in {test.deadline}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => navigate(`/student/test/${test.id}`)}>
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Code Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {codeChalllenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">
                      {challenge.difficulty} • {challenge.points} pts • {challenge.timeLimit}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/student/challenge/${challenge.id}`)}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScores.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{item.test}</span>
                      <span className="text-sm font-medium">{item.score}/{item.maxScore}</span>
                    </div>
                    <Progress value={(item.score / item.maxScore) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
