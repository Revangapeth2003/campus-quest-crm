import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import ApplicationDetailsDialog from "./ApplicationDetailsDialog";

const AdmissionTracker = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const [admissions, setAdmissions] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      course: "Computer Science",
      stage: "application-submitted",
      progress: 25,
      documents: ["Transcript", "ID Copy"],
      pendingDocuments: ["Recommendation Letter"],
      applicationDate: "2024-01-10",
      lastUpdate: "2024-01-15"
    },
    {
      id: 2,
      name: "Mike Chen", 
      email: "mike@example.com",
      course: "Business Administration",
      stage: "document-verification",
      progress: 50,
      documents: ["Transcript", "ID Copy", "Recommendation Letter"],
      pendingDocuments: ["Medical Certificate"],
      applicationDate: "2024-01-08",
      lastUpdate: "2024-01-14"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@example.com", 
      course: "Engineering",
      stage: "interview-scheduled",
      progress: 75,
      documents: ["Transcript", "ID Copy", "Recommendation Letter", "Medical Certificate"],
      pendingDocuments: [],
      applicationDate: "2024-01-05",
      lastUpdate: "2024-01-13"
    },
    {
      id: 4,
      name: "Alex Kumar",
      email: "alex@example.com",
      course: "Medicine",
      stage: "admitted",
      progress: 100,
      documents: ["Transcript", "ID Copy", "Recommendation Letter", "Medical Certificate"],
      pendingDocuments: [],
      applicationDate: "2024-01-01",
      lastUpdate: "2024-01-12"
    },
  ]);

  const stages = [
    { key: "application-submitted", label: "Application Submitted", icon: Clock, color: "bg-gradient-secondary", progress: 25 },
    { key: "document-verification", label: "Document Verification", icon: Eye, color: "bg-warning", progress: 50 },
    { key: "interview-scheduled", label: "Interview Scheduled", icon: AlertCircle, color: "bg-gradient-primary", progress: 75 },
    { key: "admitted", label: "Admitted", icon: CheckCircle, color: "bg-gradient-success", progress: 100 },
    { key: "rejected", label: "Rejected", icon: XCircle, color: "bg-destructive", progress: 0 },
  ];

  const getStageInfo = (stage: string) => {
    return stages.find(s => s.key === stage) || stages[0];
  };

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || admission.stage === stageFilter;
    const matchesCourse = courseFilter === 'all' || admission.course === courseFilter;
    
    return matchesSearch && matchesStage && matchesCourse;
  });

  const handleViewDetails = (admission: any) => {
    setSelectedApplication(admission);
    setIsDetailsDialogOpen(true);
  };

  const handleUpdateStage = (newStage: string) => {
    if (selectedApplication) {
      const updatedAdmissions = admissions.map(a => 
        a.id === selectedApplication.id 
          ? { 
              ...a, 
              stage: newStage,
              progress: stages.find(s => s.key === newStage)?.progress || 0
            }
          : a
      );
      setAdmissions(updatedAdmissions);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Admission Tracker</h1>
          <p className="text-muted-foreground">Track application progress and manage admissions</p>
        </div>
      </div>

      {/* Stage Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stages.slice(0, 4).map((stage, index) => {
          const count = admissions.filter(a => a.stage === stage.key).length;
          const Icon = stage.icon;
          return (
            <Card key={stage.key} className="gaming-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4 text-center">
                <div className={`inline-flex p-3 rounded-full ${stage.color} mb-2 animate-float`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text">{count}</div>
                <div className="text-sm text-muted-foreground">{stage.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="gaming-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage.key} value={stage.key}>{stage.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business Administration">Business Administration</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Admissions List */}
      <div className="space-y-4">
        {filteredAdmissions.map((admission, index) => {
          const stageInfo = getStageInfo(admission.stage);
          const StageIcon = stageInfo.icon;
          
          return (
            <Card key={admission.id} className="gaming-card animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${stageInfo.color} animate-pulse-glow`}>
                      <StageIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{admission.name}</CardTitle>
                      <p className="text-muted-foreground">{admission.course}</p>
                    </div>
                  </div>
                  <Badge className={`${stageInfo.color} text-white`}>
                    {stageInfo.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Progress</p>
                    <Progress value={admission.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{admission.progress}% Complete</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Application Details</p>
                    <p className="text-xs text-muted-foreground">Applied: {admission.applicationDate}</p>
                    <p className="text-xs text-muted-foreground">Updated: {admission.lastUpdate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Documents Submitted</p>
                    <div className="flex flex-wrap gap-1">
                      {admission.documents.map(doc => (
                        <Badge key={doc} variant="secondary" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {admission.pendingDocuments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Pending Documents</p>
                      <div className="flex flex-wrap gap-1">
                        {admission.pendingDocuments.map(doc => (
                          <Badge key={doc} variant="destructive" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleViewDetails(admission)}
                    className="hover:glow-effect"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                   <Button 
                     size="sm" 
                     className="bg-gradient-primary hover:glow-effect"
                     onClick={() => handleViewDetails(admission)}
                   >
                     <Edit className="w-3 h-3 mr-1" />
                     Update Stage
                   </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAdmissions.length === 0 && (
        <Card className="gaming-card">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No admissions found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      <ApplicationDetailsDialog 
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        application={selectedApplication}
        onUpdateStage={handleUpdateStage}
      />
    </div>
  );
};

export default AdmissionTracker;