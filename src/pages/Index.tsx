// Gaming-style CRM Index Page - redirects to Dashboard

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard immediately
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-pulse-glow">
          <h1 className="mb-4 text-4xl font-bold gradient-text">Loading AdmissionCRM...</h1>
          <p className="text-xl text-muted-foreground">Initializing your gaming experience</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
