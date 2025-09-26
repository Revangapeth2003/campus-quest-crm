import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Send,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const FeeManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [feeRecords] = useState([
    {
      id: 1,
      studentName: "Sarah Johnson",
      course: "Computer Science",
      totalFee: 25000,
      paidAmount: 15000,
      pendingAmount: 10000,
      dueDate: "2024-02-15",
      status: "overdue",
      lastPayment: "2024-01-10",
      installments: [
        { amount: 15000, date: "2024-01-10", status: "paid" },
        { amount: 10000, date: "2024-02-15", status: "pending" }
      ]
    },
    {
      id: 2,
      studentName: "Mike Chen",
      course: "Business Administration", 
      totalFee: 22000,
      paidAmount: 22000,
      pendingAmount: 0,
      dueDate: "2024-01-30",
      status: "paid",
      lastPayment: "2024-01-25",
      installments: [
        { amount: 11000, date: "2024-01-10", status: "paid" },
        { amount: 11000, date: "2024-01-25", status: "paid" }
      ]
    },
    {
      id: 3,
      studentName: "Emma Davis",
      course: "Engineering",
      totalFee: 28000,
      paidAmount: 14000,
      pendingAmount: 14000,
      dueDate: "2024-02-20",
      status: "due-soon",
      lastPayment: "2024-01-15",
      installments: [
        { amount: 14000, date: "2024-01-15", status: "paid" },
        { amount: 14000, date: "2024-02-20", status: "pending" }
      ]
    },
    {
      id: 4,
      studentName: "Alex Kumar", 
      course: "Medicine",
      totalFee: 35000,
      paidAmount: 17500,
      pendingAmount: 17500,
      dueDate: "2024-03-01",
      status: "upcoming",
      lastPayment: "2024-01-20",
      installments: [
        { amount: 17500, date: "2024-01-20", status: "paid" },
        { amount: 17500, date: "2024-03-01", status: "pending" }
      ]
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-gradient-success';
      case 'overdue': return 'bg-destructive';
      case 'due-soon': return 'bg-warning';
      case 'upcoming': return 'bg-gradient-primary';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'overdue': return AlertTriangle;
      case 'due-soon': return Calendar;
      case 'upcoming': return DollarSign;
      default: return Calendar;
    }
  };

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendReminder = (type: string, record: any) => {
    toast({
      title: `${type} Reminder Sent`,
      description: `Fee reminder sent to ${record.studentName} via ${type.toLowerCase()}`,
    });
  };

  const summaryStats = {
    totalPending: feeRecords.reduce((sum, record) => sum + record.pendingAmount, 0),
    overdueCount: feeRecords.filter(record => record.status === 'overdue').length,
    dueSoonCount: feeRecords.filter(record => record.status === 'due-soon').length,
    collectionRate: 78.5
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Fee Management</h1>
          <p className="text-muted-foreground">Track payments and manage fee collections</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gaming-card animate-bounce-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pending
            </CardTitle>
            <div className="p-2 rounded-lg bg-warning animate-float">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">${summaryStats.totalPending.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Outstanding fees</p>
          </CardContent>
        </Card>

        <Card className="gaming-card animate-bounce-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
            <div className="p-2 rounded-lg bg-destructive animate-float">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{summaryStats.overdueCount}</div>
            <p className="text-sm text-destructive font-medium">Require immediate action</p>
          </CardContent>
        </Card>

        <Card className="gaming-card animate-bounce-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Due Soon
            </CardTitle>
            <div className="p-2 rounded-lg bg-warning animate-float">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{summaryStats.dueSoonCount}</div>
            <p className="text-sm text-warning font-medium">Within 7 days</p>
          </CardContent>
        </Card>

        <Card className="gaming-card animate-bounce-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Collection Rate
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-success animate-float">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{summaryStats.collectionRate}%</div>
            <p className="text-sm text-success font-medium">+2.3% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="gaming-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name or course..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="due-soon">Due Soon</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records */}
      <div className="space-y-4">
        {filteredRecords.map((record, index) => {
          const StatusIcon = getStatusIcon(record.status);
          const progressPercentage = (record.paidAmount / record.totalFee) * 100;
          
          return (
            <Card key={record.id} className="gaming-card animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${getStatusColor(record.status)} animate-pulse-glow`}>
                      <StatusIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{record.studentName}</CardTitle>
                      <p className="text-muted-foreground">{record.course}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(record.status)} text-white`}>
                    {record.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Total Fee</p>
                    <p className="text-lg font-bold gradient-text">${record.totalFee.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Paid Amount</p>
                    <p className="text-lg font-bold text-success">${record.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Pending Amount</p>
                    <p className="text-lg font-bold text-warning">${record.pendingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Due Date</p>
                    <p className="text-lg font-bold">{record.dueDate}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Payment Progress</p>
                    <p className="text-sm text-muted-foreground">{progressPercentage.toFixed(1)}%</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-success h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Installment History</p>
                    <div className="space-y-1">
                      {record.installments.map((installment, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span>${installment.amount.toLocaleString()} - {installment.date}</span>
                          <Badge 
                            variant={installment.status === 'paid' ? 'default' : 'secondary'}
                            className={installment.status === 'paid' ? 'bg-gradient-success text-white' : ''}
                          >
                            {installment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {record.status !== 'paid' && (
                    <div>
                      <p className="text-sm font-medium mb-2">Send Reminder</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendReminder('Email', record)}
                          className="hover:glow-effect"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendReminder('SMS', record)}
                          className="hover:glow-accent"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          SMS
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendReminder('WhatsApp', record)}
                          className="hover:glow-success"
                        >
                          <MessageSquare className="w-3 h-3 mr-1" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <Card className="gaming-card">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No fee records found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeeManagement;