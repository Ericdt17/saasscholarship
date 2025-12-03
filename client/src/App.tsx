import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Scholarships from "./pages/Scholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import CreateScholarship from "./pages/CreateScholarship";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Applications from "./pages/Applications";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import SavedScholarships from "./pages/SavedScholarships";
import Jobs from "./pages/Jobs";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/new" element={<CreateScholarship />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/saved" element={<SavedScholarships />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
