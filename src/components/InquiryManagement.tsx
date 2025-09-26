import { useState } from "react";
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Filter,
  Download,
  Eye,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AddInquiryDialog from "./AddInquiryDialog";

const InquiryManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [inquiries] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567890",
      course: "Computer Science",
      source: "Website",
      status: "new",
      date: "2024-01-15",
      lastContact: "Never"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@example.com", 
      phone: "+1234567891",
      course: "Business Administration",
      source: "WhatsApp",
      status: "contacted",
      date: "2024-01-14",
      lastContact: "2 days ago"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1234567892", 
      course: "Engineering",
      source: "Social Media",
      status: "interested",
      date: "2024-01-13",
      lastContact: "1 day ago"
    },
    {
      id: 4,
      name: "Alex Kumar",
      email: "alex@example.com",
      phone: "+1234567893",
      course: "Medicine",
      source: "Referral",
      status: "follow-up",
      date: "2024-01-12",
      lastContact: "3 hours ago"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gradient-primary';
      case 'contacted': return 'bg-gradient-secondary';
      case 'interested': return 'bg-gradient-success';
      case 'follow-up': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp': return <MessageSquare className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      case 'Phone': return <Phone className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || inquiry.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleAddInquiry = () => {
    setIsAddDialogOpen(true);
  };

  const handleContactInquiry = (type: string, inquiry: any) => {
    toast({
      title: `${type} Contact`,
      description: `Initiating ${type.toLowerCase()} contact with ${inquiry.name}`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Downloading inquiry data as CSV...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Inquiry Management</h1>
          <p className="text-muted-foreground">Manage and track all student inquiries</p>
        </div>
        <Button onClick={handleAddInquiry} className="bg-gradient-primary hover:glow-effect">
          <Plus className="w-4 h-4 mr-2" />
          Add Inquiry
        </Button>
      </div>

      {/* Filters */}
      <Card className="gaming-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInquiries.map((inquiry, index) => (
          <Card key={inquiry.id} className="gaming-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{inquiry.course}</p>
                </div>
                <Badge className={`${getStatusColor(inquiry.status)} text-white`}>
                  {inquiry.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{inquiry.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{inquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {getSourceIcon(inquiry.source)}
                  <span>Source: {inquiry.source}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last Contact: {inquiry.lastContact}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-primary hover:glow-effect"
                  onClick={() => handleContactInquiry('Phone', inquiry)}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-secondary hover:glow-accent"
                  onClick={() => handleContactInquiry('Email', inquiry)}
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-success hover:glow-success"
                  onClick={() => handleContactInquiry('WhatsApp', inquiry)}
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <Card className="gaming-card">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No inquiries found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      <AddInquiryDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </div>
  );
};

export default InquiryManagement;