import type { FC } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export const NotFoundPage: FC = () => {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full inst-card p-8 text-center space-y-4">
        <span className="text-4xl font-extrabold text-[#0E2A47]">404</span>
        <h1 className="text-xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          The official page or resource you are searching for does not exist or has been moved within the platform directory.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E2A47] text-white text-xs font-semibold rounded hover:bg-[#0A1E34] transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export const PlaceholderPage: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="container-custom py-12 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-[#0E2A47]">{title}</h1>
        <p className="text-xs text-slate-600 mt-1">
          Official section module scheduled for integration in upcoming development phase.
        </p>
      </div>

      <div className="inst-card p-8 text-center space-y-4 max-w-xl mx-auto my-8">
        <div className="inst-header-badge">SAMPLE CONTENT — FOR DEVELOPMENT ONLY</div>
        <h2 className="text-lg font-bold text-slate-800">{title} Section Shell</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          This section architecture is established and CMS-ready. Official content will be populated in Phase {title}.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E2A47] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Overview
        </Link>
      </div>
    </div>
  );
};
