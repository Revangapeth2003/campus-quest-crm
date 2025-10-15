import { useState, useEffect } from "react";
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  CreditCard,
  Phone,
  Mail,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-gaming.jpg";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInquiries: 1247,
    activeLeads: 328,
    admissions: 89,
    pendingFees: 45
  });

  const [recentActivities] = useState([
    { id: 1, type: "inquiry", message: "New inquiry from Sarah Johnson", time: "2 min ago" },
    { id: 2, type: "admission", message: "John Doe admission confirmed", time: "15 min ago" },
    { id: 3, type: "fee", message: "Fee payment received from Alice", time: "1 hour ago" },
    { id: 4, type: "call", message: "Follow-up call scheduled", time: "2 hours ago" },
  ]);

  const statCards = [
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      icon: Users,
      color: "bg-gradient-primary",
      change: "+12%"
    },
    {
      title: "Active Leads", 
      value: stats.activeLeads,
      icon: TrendingUp,
      color: "bg-gradient-secondary",
      change: "+8%"
    },
    {
      title: "Admissions",
      value: stats.admissions,
      icon: GraduationCap,
      color: "bg-gradient-success",
      change: "+15%"
    },
    {
      title: "Pending Fees",
      value: stats.pendingFees,
      icon: CreditCard,
      color: "bg-warning",
      change: "-5%"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden">
        <img 
          src={heroImage} 
          alt="Gaming CRM Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center">
          <div className="p-8">
            <h1 className="text-4xl font-bold gradient-text mb-4 animate-bounce-in">
              Welcome to settlo AdmissionCRM
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Transform your admission process with our gaming-inspired CRM
            </p>
            <Button 
              className="bg-gradient-primary hover:glow-effect animate-pulse-glow"
              onClick={() => window.location.href = '/inquiries'}
            >
              Start Managing
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="gaming-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.color} animate-float`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold gradient-text">{card.value.toLocaleString()}</div>
                <p className="text-sm text-success font-medium">{card.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Activities */}
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="gradient-text">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'inquiry' ? 'bg-gradient-primary' :
                    activity.type === 'admission' ? 'bg-gradient-success' :
                    activity.type === 'fee' ? 'bg-warning' : 'bg-gradient-secondary'
                  }`}>
                    {activity.type === 'inquiry' && <Users className="w-4 h-4 text-white" />}
                    {activity.type === 'admission' && <GraduationCap className="w-4 h-4 text-white" />}
                    {activity.type === 'fee' && <CreditCard className="w-4 h-4 text-white" />}
                    {activity.type === 'call' && <Phone className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
