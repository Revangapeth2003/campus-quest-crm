import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Eye, 
  Edit,
  User,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApplicationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  application: any;
  onUpdateStage: (newStage: string) => void;
}

const ApplicationDetailsDialog = ({ isOpen, onClose, application, onUpdateStage }: ApplicationDetailsDialogProps) => {
  const { toast } = useToast();
  const [selectedStage, setSelectedStage] = useState(application?.stage || "");

  const stages = [
    { key: "application-submitted", label: "Application Submitted", icon: Clock, color: "bg-gradient-secondary", progress: 25 },
    { key: "document-verification", label: "Document Verification", icon: Eye, color: "bg-warning", progress: 50 },
    { key: "interview-scheduled", label: "Interview Scheduled", icon: AlertCircle, color: "bg-gradient-primary", progress: 75 },
    { key: "admitted", label: "Admitted", icon: CheckCircle, color: "bg-gradient-success", progress: 100 },
    { key: "rejected", label: "Rejected", icon: XCircle, color: "bg-destructive", progress: 0 },
  ];

  const handleUpdateStage = () => {
    if (selectedStage === application.stage) {
      toast({
        title: "No Changes",
        description: "Stage is already set to the selected value.",
        variant: "destructive"
      });
      return;
    }

    onUpdateStage(selectedStage);
    toast({
      title: "Stage Updated",
      description: `Application stage updated for ${application.name}.`,
    });
    onClose();
  };

  if (!application) return null;

  const currentStage = stages.find(s => s.key === application.stage);
  const StageIcon = currentStage?.icon || Clock;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="gradient-text flex items-center gap-2">
            <User className="w-5 h-5" />
            Application Details - {application.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
            <div>
              <h3 className="font-semibold mb-2">Student Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{application.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{application.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1234567890</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Application Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Course: </span>
                  <span className="font-medium">{application.course}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Applied: {application.applicationDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Updated: {application.lastUpdate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Stage */}
          <div className="p-4 rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">Current Stage</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${currentStage?.color} animate-pulse-glow`}>
                <StageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Badge className={`${currentStage?.color} text-white mb-1`}>
                  {currentStage?.label}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Progress: {application.progress}% Complete
                </p>
              </div>
            </div>
            <Progress value={application.progress} className="h-3" />
          </div>

          {/* Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-3 text-success">Documents Submitted</h3>
              <div className="space-y-2">
                {application.documents.map((doc: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {application.pendingDocuments.length > 0 && (
              <div className="p-4 rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-3 text-warning">Pending Documents</h3>
                <div className="space-y-2">
                  {application.pendingDocuments.map((doc: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-warning" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Update Stage */}
          <div className="p-4 rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">Update Application Stage</h3>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map(stage => (
                      <SelectItem key={stage.key} value={stage.key}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleUpdateStage}
                className="bg-gradient-primary hover:glow-effect"
                disabled={selectedStage === application.stage}
              >
                <Edit className="w-4 h-4 mr-1" />
                Update Stage
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-gradient-secondary hover:glow-accent"
              onClick={() => {
                toast({
                  title: "Interview Scheduled",
                  description: `Interview scheduled for ${application.name}`,
                });
              }}
            >
              Schedule Interview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;