import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Copy,
  Clock,
  AlertTriangle,
  Users,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

const AdminPasscode = () => {
  const { toast } = useToast();
  const [passcode, setPasscode] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [studentsUsed, setStudentsUsed] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch current passcode on mount
  useEffect(() => {
    fetchCurrentPasscode();
  }, []);

  // Countdown timer based on lastUpdated
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const now = new Date();
        const updatedTime = new Date(lastUpdated);
        const diffSeconds = 86400 - Math.floor((now.getTime() - updatedTime.getTime()) / 1000);

        if (diffSeconds <= 0) {
          generateNewPasscode(); // auto-refresh
        } else {
          const hours = Math.floor(diffSeconds / 3600);
          const minutes = Math.floor((diffSeconds % 3600) / 60);
          const seconds = diffSeconds % 60;
          setTimeLeft({ hours, minutes, seconds });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  // GET request to backend
  const fetchCurrentPasscode = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/passcode/current");
      const data = await res.json();
      setPasscode(data.code);
      setLastUpdated(data.lastUpdated);
      setStudentsUsed(data.studentsUsed);
    } catch (err) {
      toast({
        title: "Fetch Failed",
        description: "Couldn't load current passcode.",
        variant: "destructive",
      });
    }
  };

  // POST new passcode to backend
  const generateNewPasscode = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/passcode/generate", {
        method: "POST",
      });
      const data = await res.json();
      setPasscode(data.passcode.code);
      setLastUpdated(data.passcode.lastUpdated);
      setStudentsUsed(data.passcode.studentsUsed || 0);

      toast({
        title: "Passcode Generated 🔄",
        description: `New passcode: ${data.passcode.code}`,
      });
    } catch (err) {
      toast({
        title: "Generation Failed",
        description: "Couldn't generate new passcode.",
        variant: "destructive",
      });
    }
  };

  const copyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(passcode);
      toast({
        title: "Copied",
        description: "Passcode copied to clipboard.",
      });
    } catch {
      toast({
        title: "Failed to Copy",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Emergency Passcode</h1>
              <p className="text-orange-100">
                24-hour rotating access code for student emergencies
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passcode Card */}
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-orange-600">
                  <Shield className="w-5 h-5" />
                  Current Passcode
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={generateNewPasscode}
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="bg-gray-900 rounded-lg p-6 mb-4">
                  <div className="text-4xl font-mono font-bold text-green-400 tracking-widest">
                    {passcode || "------"}
                  </div>
                </div>
                <Button onClick={copyPasscode} className="w-full gap-2" size="lg">
                  <Copy className="w-5 h-5" />
                  Copy Passcode
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  Last Updated:{" "}
                  {lastUpdated
                    ? new Date(lastUpdated).toLocaleString()
                    : "Loading..."}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Timer & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Clock className="w-5 h-5" />
                  Next Refresh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
                    {formatTime(timeLeft.seconds)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Refreshes in: {timeLeft.hours}h {timeLeft.minutes}m{" "}
                    {timeLeft.seconds}s
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Users className="w-5 h-5" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {studentsUsed}
                  </div>
                  <p className="text-sm text-gray-600">
                    Students used this passcode in the last 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="space-y-2">
              <p className="font-medium">🛟 Emergency Access Info</p>
              <p>
                Students can use this passcode to bypass OTP during test login
                in urgent cases.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <div className="space-y-2">
              <p className="font-medium">⚠️ Important Notice</p>
              <p>
                This passcode is refreshed every 24 hours. Only share during
                emergencies.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </AdminLayout>
  );
};

export default AdminPasscode;
