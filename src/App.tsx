import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Calculator } from "./pages/Calculator";
import { Routine } from "./pages/Routine";
import { Journal } from "./pages/Journal";
import { Achievements } from "./pages/Achievements";
import { Onboarding } from "./pages/Onboarding";
import { SleepEducation } from "./pages/SleepEducation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/sleep-education" element={<SleepEducation />} />
            <Route path="/settings" element={<div className="p-6 text-center text-muted-foreground">Réglages à venir</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
