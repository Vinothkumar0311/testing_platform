
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

const MCQManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const questions = [
    {
      id: 1,
      question: "What is React?",
      category: "React",
      difficulty: "Easy",
      options: 4,
      correctAnswer: "A JavaScript library for building user interfaces",
      createdDate: "2023-10-15"
    },
    {
      id: 2,
      question: "What is JSX?",
      category: "React",
      difficulty: "Medium",
      options: 4,
      correctAnswer: "A syntax extension for JavaScript",
      createdDate: "2023-10-14"
    },
    {
      id: 3,
      question: "What is a closure in JavaScript?",
      category: "JavaScript",
      difficulty: "Hard",
      options: 4,
      correctAnswer: "A function that retains access to its outer scope",
      createdDate: "2023-10-13"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MCQ Management</h1>
            <p className="text-gray-600">Create and manage multiple choice questions</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-gray-600">Easy Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">45</div>
              <div className="text-sm text-gray-600">Medium Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">22</div>
              <div className="text-sm text-gray-600">Hard Questions</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search questions by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <Card>
          <CardHeader>
            <CardTitle>Questions ({filteredQuestions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">{question.question}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Category: {question.category}</span>
                        <span>•</span>
                        <span>{question.options} options</span>
                        <span>•</span>
                        <span>Created: {question.createdDate}</span>
                      </div>
                      <div className="mt-2">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                    <strong>Correct Answer:</strong> {question.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default MCQManagement;
