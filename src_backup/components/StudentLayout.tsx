
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Code, Home, User, BookOpen, Trophy, LogOut, ClipboardList } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface StudentLayoutProps {
  children: ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    // { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: ClipboardList, label: "Assessment", path: "/student/assessment" },
    // { icon: BookOpen, label: "Tests", path: "/student/tests" },
    // { icon: Code, label: "Challenges", path: "/student/challenges" },
    // { icon: User, label: "Profile", path: "/student/profile" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduPlatform</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, John Doe</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start ${
                  location.pathname === item.path 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
