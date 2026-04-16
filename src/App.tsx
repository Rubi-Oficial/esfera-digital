import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GrowthOS from "./pages/GrowthOS.tsx";

// Lazy-loaded routes (code-split per route)
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogArticle = lazy(() => import("./pages/BlogArticle.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Indicacao = lazy(() => import("./pages/Indicacao.tsx"));
const CRM = lazy(() => import("./pages/CRM.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));
const MeuProjeto = lazy(() => import("./pages/MeuProjeto.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const CheckoutReturn = lazy(() => import("./pages/CheckoutReturn.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<GrowthOS />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/meu-projeto" element={<MeuProjeto />} />
            <Route path="/indicacao" element={<Indicacao />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/return" element={<CheckoutReturn />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
