import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center gaming-card mx-4">
      <div className="text-center p-8">
        <h1 className="mb-4 text-6xl font-bold gradient-text animate-bounce-in">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found in the gaming universe</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium hover:glow-effect transition-all duration-200"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
