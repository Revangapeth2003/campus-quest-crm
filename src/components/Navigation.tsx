import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  GraduationCap, 
  BarChart3, 
  UserPlus, 
  CreditCard,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/inquiries", icon: UserPlus, label: "Inquiries" },
    { path: "/admissions", icon: GraduationCap, label: "Admissions" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/fees", icon: CreditCard, label: "Fee Management" },
    { path: "/users", icon: Users, label: "User Management" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden glow-effect"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Navigation Sidebar */}
      <nav className={`
        fixed top-0 left-0 h-full w-64 bg-card/95 backdrop-blur-md border-r border-border z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold gradient-text mb-8">
            Settlo AdmissionCRM
          </h1>
          
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive(item.path) 
                      ? 'bg-gradient-primary text-primary-foreground glow-effect' 
                      : 'hover:bg-muted hover:glow-effect'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive(item.path) ? 'animate-float' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
