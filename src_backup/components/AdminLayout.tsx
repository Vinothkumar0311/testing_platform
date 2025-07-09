
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Code, Home, Users, BookOpen, BarChart3, LogOut, TestTube, Shield, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    // { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    // { icon: BookOpen, label: "MCQ Management", path: "/admin/mcq" },
    // { icon: Code, label: "Code Challenges", path: "/admin/challenges" },
    { icon: TestTube, label: "Create Test", path: "/admin/create-test" },
    { icon: Shield, label: "Passcode", path: "/admin/passcode" },
    { icon: Users, label: "Students", path: "/admin/students" },
    { icon: CreditCard, label: "License", path: "/admin/license" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
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
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduPlatform Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin Panel</span>
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
                    ? "bg-green-600 text-white hover:bg-green-700" 
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

export default AdminLayout;
