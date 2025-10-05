import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import Home from "./pages/Home";
import { Calculator } from "./pages/Calculator";
import Routines from "./pages/Routines";
import { Journal } from "./pages/Journal";
import Achievements from "./pages/Achievements";
import { Onboarding } from "./pages/Onboarding";
import { ComprendreSommeil } from "./pages/ComprendreSommeil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  console.log('App rendering'),
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Layout><Home /></Layout>} />
          <Route path="/onboarding" element={<Layout><Onboarding /></Layout>} />
          <Route path="/calculator" element={<Layout><Calculator /></Layout>} />
          
          <Route path="/routines" element={<Layout><Routines /></Layout>} />
          <Route path="/journal" element={<Layout><Journal /></Layout>} />
          <Route path="/achievements" element={<Layout><Achievements /></Layout>} />
          <Route path="/comprendre-sommeil" element={<Layout><ComprendreSommeil /></Layout>} />
          <Route path="/settings" element={<Layout><div className="p-6 text-center text-muted-foreground">Réglages à venir</div></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

