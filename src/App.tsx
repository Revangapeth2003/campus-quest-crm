import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import InquiryManagement from "./components/InquiryManagement";
import AdmissionTracker from "./components/AdmissionTracker";
import Analytics from "./components/Analytics";
import FeeManagement from "./components/FeeManagement";
import UserManagement from "./components/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <Navigation />
          <main className="flex-1 md:ml-64 p-6 space-y-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inquiries" element={<InquiryManagement />} />
              <Route path="/admissions" element={<AdmissionTracker />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/fees" element={<FeeManagement />} />
              <Route path="/users" element={<UserManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
