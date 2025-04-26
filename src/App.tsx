
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Dashboard Routes
import Dashboard from "./pages/dashboard/Index";
import KPIs from "./pages/dashboard/KPIs";
import Finances from "./pages/dashboard/Finances";
import Habits from "./pages/dashboard/Habits";
import Sessions from "./pages/dashboard/Sessions";

// Workers Routes
import Workers from "./pages/workers/Index";
import CutProfile from "./pages/workers/CutProfile";
import VideoCutter from "./pages/workers/VideoCutter";
import SilenceRemover from "./pages/workers/SilenceRemover";
import Satisfy from "./pages/workers/Satisfy";
import Renderer from "./pages/workers/Renderer";
import Subtitles from "./pages/workers/Subtitles";
import Overlay from "./pages/workers/Overlay";

// Tasks Routes
import Tasks from "./pages/tasks/Index";
import WorkTimer from "./pages/tasks/WorkTimer";
import ContentTracker from "./pages/tasks/ContentTracker";

// Files Routes
import Files from "./pages/files/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            
            {/* Dashboard Routes */}
            <Route path="dashboard">
              <Route index element={<Dashboard />} />
              <Route path="kpis" element={<KPIs />} />
              <Route path="finances" element={<Finances />} />
              <Route path="habits" element={<Habits />} />
              <Route path="sessions" element={<Sessions />} />
            </Route>
            
            {/* Workers Routes */}
            <Route path="workers">
              <Route index element={<Workers />} />
              <Route path="cut-profile" element={<CutProfile />} />
              <Route path="video-cutter" element={<VideoCutter />} />
              <Route path="silence-remover" element={<SilenceRemover />} />
              <Route path="satisfy" element={<Satisfy />} />
              <Route path="renderer" element={<Renderer />} />
              <Route path="subtitles" element={<Subtitles />} />
              <Route path="overlay" element={<Overlay />} />
            </Route>
            
            {/* Tasks Routes */}
            <Route path="tasks">
              <Route index element={<Tasks />} />
              <Route path="work-timer" element={<WorkTimer />} />
              <Route path="content-tracker" element={<ContentTracker />} />
            </Route>
            
            {/* Files Routes */}
            <Route path="files">
              <Route index element={<Files />} />
            </Route>
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
