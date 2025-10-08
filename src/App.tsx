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
import AuthPage from "./pages/Auth";
import { RequireAuth } from "./components/RequireAuth";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  console.log('App rendering'),
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/comprendre-sommeil" element={<Layout><ComprendreSommeil /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />
        
        <Route path="/app" element={<RequireAuth><Layout><Home /></Layout></RequireAuth>} />
        <Route path="/onboarding" element={<RequireAuth><Layout><Onboarding /></Layout></RequireAuth>} />
        <Route path="/calculator" element={<RequireAuth><Layout><Calculator /></Layout></RequireAuth>} />
        <Route path="/routines" element={<RequireAuth><Layout><Routines /></Layout></RequireAuth>} />
        <Route path="/journal" element={<RequireAuth><Layout><Journal /></Layout></RequireAuth>} />
        <Route path="/achievements" element={<RequireAuth><Layout><Achievements /></Layout></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><Layout><div className="p-6 text-center text-muted-foreground">Réglages à venir</div></Layout></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

