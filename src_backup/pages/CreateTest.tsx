
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, TestTube, Clock, FileText, Settings, Trash2, Eye } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface Section {
  id: string;
  name: string;
  duration: number;
  instructions: string;
  type: "MCQ" | "Coding";
  correctMarks: number;
}

const CreateTest = () => {
  const { toast } = useToast();
  const [testName, setTestName] = useState("");
  const [numSections, setNumSections] = useState(1);
  const [description, setDescription] = useState("");
  const [testInstructions, setTestInstructions] = useState("");
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "",
      duration: 30,
      instructions: "",
      type: "MCQ",
      correctMarks: 1
    }
  ]);
  const [openSections, setOpenSections] = useState<string[]>(["1"]);

  const handleNumSectionsChange = (value: string) => {
    const num = parseInt(value) || 1;
    setNumSections(num);
    
    if (num > sections.length) {
      const newSections = [...sections];
      for (let i = sections.length; i < num; i++) {
        newSections.push({
          id: (i + 1).toString(),
          name: "",
          duration: 30,
          instructions: "",
          type: "MCQ",
          correctMarks: 1
        });
      }
      setSections(newSections);
    } else if (num < sections.length) {
      setSections(sections.slice(0, num));
    }
  };

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const addSection = () => {
    const newId = (sections.length + 1).toString();
    setSections([...sections, {
      id: newId,
      name: "",
      duration: 30,
      instructions: "",
      type: "MCQ",
      correctMarks: 1
    }]);
    setNumSections(sections.length + 1);
    setOpenSections([...openSections, newId]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== id));
      setOpenSections(openSections.filter(sectionId => sectionId !== id));
      setNumSections(sections.length - 1);
    }
  };

  const toggleSection = (id: string) => {
    setOpenSections(openSections.includes(id) 
      ? openSections.filter(sectionId => sectionId !== id)
      : [...openSections, id]
    );
  };

  const handleSaveTest = () => {
    if (!testName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a test name",
        variant: "destructive",
      });
      return;
    }

    const incompleteSections = sections.filter(section => !section.name.trim());
    if (incompleteSections.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please complete all section names",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success! 🎉",
      description: "Test created successfully",
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3">
            <TestTube className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Create New Test</h1>
              <p className="text-blue-100">Design comprehensive assessments for your students</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="testName">Test Name *</Label>
                  <Input
                    id="testName"
                    placeholder="Enter test name"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="numSections">Number of Sections</Label>
                  <Input
                    id="numSections"
                    type="number"
                    min="1"
                    max="10"
                    value={numSections}
                    onChange={(e) => handleNumSectionsChange(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Test Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose and content of this test"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="instructions">Test Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="General instructions for students taking this test"
                    value={testInstructions}
                    onChange={(e) => setTestInstructions(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Test Sections ({sections.length})
                  </CardTitle>
                  <Button onClick={addSection} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sections.map((section, index) => (
                  <Collapsible
                    key={section.id}
                    open={openSections.includes(section.id)}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <div className="border rounded-lg p-4 space-y-4">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {section.name || `Section ${index + 1}`}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {section.type} • {section.duration} minutes
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {sections.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSection(section.id);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="space-y-4">
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Section Name *</Label>
                            <Input
                              placeholder="e.g., Programming Fundamentals"
                              value={section.name}
                              onChange={(e) => updateSection(section.id, "name", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Duration (minutes)</Label>
                            <Input
                              type="number"
                              min="1"
                              value={section.duration}
                              onChange={(e) => updateSection(section.id, "duration", parseInt(e.target.value) || 30)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Section Type</Label>
                            <Select
                              value={section.type}
                              onValueChange={(value) => updateSection(section.id, "type", value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MCQ">MCQ Questions</SelectItem>
                                <SelectItem value="Coding">Coding Problems</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Correct Answer Marks</Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.5"
                              value={section.correctMarks}
                              onChange={(e) => updateSection(section.id, "correctMarks", parseFloat(e.target.value) || 1)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Section Instructions</Label>
                          <Textarea
                            placeholder="Specific instructions for this section"
                            value={section.instructions}
                            onChange={(e) => updateSection(section.id, "instructions", e.target.value)}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Test Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {testName || "Untitled Test"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {sections.length} section{sections.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className="p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium text-sm">
                          {section.name || `Section ${index + 1}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {section.duration}m
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          section.type === "MCQ" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-purple-100 text-purple-700"
                        }`}>
                          {section.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fixed Save Button */}
        <div className="fixed bottom-6 right-6 z-10">
          <Button
            onClick={handleSaveTest}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
          >
            <TestTube className="w-5 h-5" />
            Save Test
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateTest;
