import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { SkipToContent } from "@/components/common/SkipToContent";

export const RootLayout: FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-slate-50 text-[#181818] font-sans antialiased">
        <SkipToContent />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};
