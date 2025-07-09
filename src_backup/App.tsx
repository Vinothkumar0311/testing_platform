import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MCQTest from "./pages/MCQTest";
import CodeChallenge from "./pages/CodeChallenge";
import StudentProfile from "./pages/StudentProfile";
import MCQManagement from "./pages/MCQManagement";
import StudentManagement from "./pages/StudentManagement";
import AdminChallenges from "./pages/AdminChallenges";
import AdminAnalytics from "./pages/AdminAnalytics";
import StudentTests from "./pages/StudentTests";
import StudentChallenges from "./pages/StudentChallenges";
import StudentAssessment from "./pages/StudentAssessment";
import CreateTest from "./pages/CreateTest";
import AdminLicense from "./pages/AdminLicense";
import AdminPasscode from "./pages/AdminPasscode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Get the Google Client ID from environment variables
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/assessment" element={<StudentAssessment />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/student/test/:testId" element={<MCQTest />} />
              <Route path="/student/challenge/:challengeId" element={<CodeChallenge />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/tests" element={<StudentTests />} />
              <Route path="/student/challenges" element={<StudentChallenges />} />
              <Route path="/admin/mcq" element={<MCQManagement />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/challenges" element={<AdminChallenges />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/create-test" element={<CreateTest />} />
              <Route path="/admin/passcode" element={<AdminPasscode />} />
              <Route path="/admin/license" element={<AdminLicense />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;