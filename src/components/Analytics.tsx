import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  DollarSign,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("30");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data for charts
  const inquiryTrendData = [
    { name: 'Jan', inquiries: 120, admissions: 45, fees: 38000 },
    { name: 'Feb', inquiries: 150, admissions: 62, fees: 45000 },
    { name: 'Mar', inquiries: 180, admissions: 78, fees: 52000 },
    { name: 'Apr', inquiries: 220, admissions: 89, fees: 58000 },
    { name: 'May', inquiries: 190, admissions: 95, fees: 62000 },
    { name: 'Jun', inquiries: 240, admissions: 102, fees: 68000 },
  ];

  const conversionData = [
    { name: 'Inquiry to Lead', value: 75, color: '#00D4FF' },
    { name: 'Lead to Application', value: 60, color: '#B464FF' },
    { name: 'Application to Admission', value: 45, color: '#FF64B4' },
    { name: 'Admission to Enrollment', value: 85, color: '#64FF64' },
  ];

  const coursePopularityData = [
    { name: 'Computer Science', inquiries: 350, admissions: 89 },
    { name: 'Business Admin', inquiries: 280, admissions: 72 },
    { name: 'Engineering', inquiries: 320, admissions: 85 },
    { name: 'Medicine', inquiries: 200, admissions: 45 },
    { name: 'Arts', inquiries: 150, admissions: 38 },
  ];

  const counselorPerformanceData = [
    { name: 'John Doe', leads: 45, conversions: 32, conversionRate: 71 },
    { name: 'Jane Smith', leads: 38, conversions: 28, conversionRate: 74 },
    { name: 'Mike Johnson', leads: 52, conversions: 35, conversionRate: 67 },
    { name: 'Sarah Davis', leads: 41, conversions: 31, conversionRate: 76 },
  ];

  const feeRecoveryData = [
    { name: 'Jan', collected: 85, pending: 15 },
    { name: 'Feb', collected: 78, pending: 22 },
    { name: 'Mar', collected: 92, pending: 8 },
    { name: 'Apr', collected: 88, pending: 12 },
    { name: 'May', collected: 95, pending: 5 },
    { name: 'Jun', collected: 90, pending: 10 },
  ];

  const kpiCards = [
    {
      title: "Conversion Rate",
      value: "68.5%",
      change: "+5.2%",
      icon: TrendingUp,
      color: "bg-gradient-success"
    },
    {
      title: "Total Revenue",
      value: "$125,000",
      change: "+12.8%", 
      icon: DollarSign,
      color: "bg-gradient-primary"
    },
    {
      title: "Active Counselors",
      value: "12",
      change: "+2",
      icon: Users,
      color: "bg-gradient-secondary"
    },
    {
      title: "This Month Admissions",
      value: "89",
      change: "+15.3%",
      icon: GraduationCap,
      color: "bg-warning"
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing Data",
      description: "Updating analytics dashboard...",
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Updated",
        description: "Analytics dashboard has been refreshed.",
      });
    }, 2000);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Downloading analytics report as PDF...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hover:glow-effect"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} className="bg-gradient-primary hover:glow-effect">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
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
                <div className="text-3xl font-bold gradient-text">{card.value}</div>
                <p className="text-sm text-success font-medium">{card.change} from last period</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry Trends */}
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="gradient-text">Inquiry & Admission Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inquiryTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="inquiries" 
                  stackId="1" 
                  stroke="#00D4FF" 
                  fill="#00D4FF" 
                  fillOpacity={0.3}
                  name="Inquiries"
                />
                <Area 
                  type="monotone" 
                  dataKey="admissions" 
                  stackId="2" 
                  stroke="#64FF64" 
                  fill="#64FF64" 
                  fillOpacity={0.3}
                  name="Admissions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="gradient-text">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="value" fill="#B464FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Popularity */}
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="gradient-text">Course Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePopularityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="inquiries" fill="#00D4FF" name="Inquiries" />
                <Bar dataKey="admissions" fill="#64FF64" name="Admissions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Recovery */}
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="gradient-text">Fee Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={feeRecoveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="collected" 
                  stackId="1" 
                  stroke="#64FF64" 
                  fill="#64FF64" 
                  fillOpacity={0.6}
                  name="Collected (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="pending" 
                  stackId="1" 
                  stroke="#FF6464" 
                  fill="#FF6464" 
                  fillOpacity={0.6}
                  name="Pending (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Counselor Performance */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="gradient-text">Counselor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium">Counselor</th>
                  <th className="text-left p-4 font-medium">Leads Assigned</th>
                  <th className="text-left p-4 font-medium">Conversions</th>
                  <th className="text-left p-4 font-medium">Conversion Rate</th>
                  <th className="text-left p-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {counselorPerformanceData.map((counselor, index) => (
                  <tr key={counselor.name} className="border-b border-border/50 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                    <td className="p-4 font-medium">{counselor.name}</td>
                    <td className="p-4">{counselor.leads}</td>
                    <td className="p-4">{counselor.conversions}</td>
                    <td className="p-4">
                      <span className="text-success font-medium">{counselor.conversionRate}%</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-success h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${counselor.conversionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{counselor.conversionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;