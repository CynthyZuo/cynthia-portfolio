import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect, ReactNode } from "react";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Experience from "./pages/Experience.tsx";
import VideoWorks from "./pages/VideoWorks.tsx";
import AIGC from "./pages/AIGC.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const CrossfadeWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(1);
  }, [location.pathname]);

  return (
    <div style={{ opacity }} className="w-full h-full">
      {children}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CrossfadeWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/video" element={<VideoWorks />} />
            <Route path="/aigc" element={<AIGC />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CrossfadeWrapper>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
