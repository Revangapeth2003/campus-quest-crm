import { useState } from "react";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  User, 
  Mail, 
  Phone,
  Calendar,
  Eye,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import UserFormDialog from "./UserFormDialog";

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@college.edu",
      phone: "+1234567890",
      role: "admin",
      status: "active",
      avatar: "",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-20 09:30",
      permissions: ["all"],
      performance: { leads: 0, conversions: 0 }
    },
    {
      id: 2,
      name: "Sarah Davis",
      email: "sarah.davis@college.edu", 
      phone: "+1234567891",
      role: "counselor",
      status: "active",
      avatar: "",
      joinDate: "2023-03-20",
      lastLogin: "2024-01-20 14:15",
      permissions: ["inquiries", "admissions"],
      performance: { leads: 45, conversions: 32 }
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@college.edu",
      phone: "+1234567892", 
      role: "counselor",
      status: "active",
      avatar: "",
      joinDate: "2023-05-10",
      lastLogin: "2024-01-19 16:45",
      permissions: ["inquiries", "admissions"],
      performance: { leads: 52, conversions: 35 }
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@college.edu",
      phone: "+1234567893",
      role: "finance",
      status: "active", 
      avatar: "",
      joinDate: "2023-07-05",
      lastLogin: "2024-01-20 11:20",
      permissions: ["fees", "analytics"],
      performance: { leads: 0, conversions: 0 }
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@college.edu",
      phone: "+1234567894",
      role: "principal",
      status: "active",
      avatar: "",
      joinDate: "2022-08-01", 
      lastLogin: "2024-01-18 10:00",
      permissions: ["all"],
      performance: { leads: 0, conversions: 0 }
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@college.edu",
      phone: "+1234567895",
      role: "counselor", 
      status: "inactive",
      avatar: "",
      joinDate: "2023-09-15",
      lastLogin: "2024-01-10 15:30",
      permissions: ["inquiries"],
      performance: { leads: 28, conversions: 18 }
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive';
      case 'principal': return 'bg-gradient-primary';
      case 'counselor': return 'bg-gradient-success';
      case 'finance': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield;
      case 'principal': return UserCheck;
      case 'counselor': return User;
      case 'finance': return User;
      default: return User;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-gradient-success' : 'bg-muted';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setDialogMode("add");
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const roleStats = {
    admins: users.filter(u => u.role === 'admin').length,
    counselors: users.filter(u => u.role === 'counselor').length,
    finance: users.filter(u => u.role === 'finance').length,
    principals: users.filter(u => u.role === 'principal').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Button onClick={handleAddUser} className="bg-gradient-primary hover:glow-effect">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="gaming-card animate-bounce-in">
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-destructive mb-2 animate-float">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text">{roleStats.admins}</div>
            <div className="text-sm text-muted-foreground">Admins</div>
          </CardContent>
        </Card>
        
        <Card className="gaming-card animate-bounce-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-gradient-primary mb-2 animate-float">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text">{roleStats.principals}</div>
            <div className="text-sm text-muted-foreground">Principals</div>
          </CardContent>
        </Card>
        
        <Card className="gaming-card animate-bounce-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-gradient-success mb-2 animate-float">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text">{roleStats.counselors}</div>
            <div className="text-sm text-muted-foreground">Counselors</div>
          </CardContent>
        </Card>
        
        <Card className="gaming-card animate-bounce-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-warning mb-2 animate-float">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text">{roleStats.finance}</div>
            <div className="text-sm text-muted-foreground">Finance</div>
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="counselor">Counselor</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user, index) => {
          const RoleIcon = getRoleIcon(user.role);
          
          return (
            <Card key={user.id} className="gaming-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge className={`${getRoleColor(user.role)} text-white`}>
                          <RoleIcon className="w-3 h-3 mr-1" />
                          {user.role}
                        </Badge>
                        <Badge className={`${getStatusColor(user.status)} text-white`}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined: {user.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>Last Login: {user.lastLogin}</span>
                  </div>
                </div>

                {user.role === 'counselor' && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-2">Performance</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Leads: </span>
                        <span className="font-medium">{user.performance.leads}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Conversions: </span>
                        <span className="font-medium">{user.performance.conversions}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-2">Permissions</p>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map(permission => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleViewDetails(user)}
                    className="flex-1 hover:glow-effect"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-primary hover:glow-effect"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteUser(user)}
                    className="hover:glow-effect"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="gaming-card">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No users found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      <UserFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={selectedUser}
        mode={dialogMode}
      />
    </div>
  );
};

export default UserManagement;