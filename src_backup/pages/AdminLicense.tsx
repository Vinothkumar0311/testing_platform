import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLicense = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [specialPlanData, setSpecialPlanData] = useState({
    name: "",
    esimNumber: "",
    email: "",
    expiryDate: ""
  });


  const licenseOptions = [
    { id: "1year", label: "1 Year Plan", price: "$99", duration: "1 year" },
    { id: "2year", label: "2 Year Plan", price: "$179", duration: "2 years" },
    { id: "3year", label: "3 Year Plan", price: "$249", duration: "3 years" },
    { id: "4year", label: "4 Year Plan", price: "$299", duration: "4 years" },
    { id: "special", label: "Special Plan", price: "Custom", duration: "Custom expiry" }
  ];


  const handleLicenseSubmit = () => {
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "Choose a license plan to continue",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlan === "special") {
      if (!specialPlanData.name || !specialPlanData.esimNumber || !specialPlanData.email || !specialPlanData.expiryDate) {
        toast({
          title: "Missing Information",
          description: "Please fill all required fields for Special Plan",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "License Updated! ✅",
      description: `Successfully configured ${licenseOptions.find(opt => opt.id === selectedPlan)?.label}`,
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">License Management</h1>
              <p className="text-green-100">Configure and manage platform license plans</p>
            </div>
          </div>
        </div>

        {/* License Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Choose License Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {licenseOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover-scale ${
                    selectedPlan === option.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan(option.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{option.label}</h3>
                    {selectedPlan === option.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {option.price}
                  </div>
                  <Badge variant="outline">{option.duration}</Badge>
                </div>
              ))}
            </div>

            {/* Special Plan Upload Section */}
            {selectedPlan === "special" && (
              <Card className="border-orange-200 bg-orange-50 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Upload className="w-5 h-5" />
                    Special Plan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={specialPlanData.name}
                        onChange={(e) => setSpecialPlanData({
                          ...specialPlanData,
                          name: e.target.value
                        })}
                        placeholder="Enter name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="esim">ESIM Number</Label>
                      <Input
                        id="esim"
                        value={specialPlanData.esimNumber}
                        onChange={(e) => setSpecialPlanData({
                          ...specialPlanData,
                          esimNumber: e.target.value
                        })}
                        placeholder="Enter ESIM number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email ID</Label>
                      <Input
                        id="email"
                        type="email"
                        value={specialPlanData.email}
                        onChange={(e) => setSpecialPlanData({
                          ...specialPlanData,
                          email: e.target.value
                        })}
                        placeholder="Enter email address"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Custom Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="date"
                        value={specialPlanData.expiryDate}
                        onChange={(e) => setSpecialPlanData({
                          ...specialPlanData,
                          expiryDate: e.target.value
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <Button 
                onClick={handleLicenseSubmit}
                className="px-8 hover-scale"
                disabled={!selectedPlan}
              >
                Save License Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminLicense;