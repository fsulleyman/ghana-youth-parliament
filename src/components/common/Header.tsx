import { useState, useEffect, type FC, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Menu, X, Vote, Search } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import { Button } from "@/components/ui/button";

export const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Close drawers on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut handler for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchModalOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 overflow-x-hidden">
      {/* Official Top Institutional Bar */}
      <div className="bg-[#187B28] text-white text-[11px] sm:text-xs py-1.5 border-b border-[#136320]">
        <div className="container-custom flex flex-wrap sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F9C511] shrink-0" />
            <span className="font-medium tracking-wide truncate">
              Official Digital Hub — Republic of Ghana
            </span>
          </div>

          <div className="flex items-center gap-3 text-emerald-100 shrink-0 text-[11px]">
            <a
              href={SITE_CONFIG.elections.votingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#F9C511] transition-colors font-semibold"
              title="Access Official YPG Voting Portal"
            >
              <Vote className="w-3 h-3 text-[#F9C511]" />
              <span className="hidden xs:inline">Official Voting Portal</span>
              <span className="xs:hidden">Voting Portal</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </a>
            <span className="text-emerald-400">|</span>
            <a
              href={SITE_CONFIG.elections.resultsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#F9C511] transition-colors font-semibold"
              title="Access Official Election Results"
            >
              <span>Election Results</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Branding Section */}
      <div className="container-custom py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Branding Logo Block */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <img
            src="/brand/logo.png"
            alt="Ghana Youth Parliament Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded border border-slate-200 bg-white"
          />
          <div>
            <div className="font-extrabold text-base sm:text-lg text-[#187B28] tracking-tight leading-none group-hover:text-[#136320] transition-colors">
              GHANA YOUTH PARLIAMENT
            </div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-normal mt-0.5">
              Empowering Youth. Building Leadership.
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links — 2XL Screen Display */}
        <nav className="hidden 2xl:flex items-center space-x-1" aria-label="Main Navigation">
          {SITE_CONFIG.mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors rounded ${
                  active
                    ? "bg-[#187B28] text-white shadow-xs"
                    : "text-[#181818] hover:bg-slate-100 hover:text-[#187B28]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Action Cluster (Search, Vote CTA, Hamburger) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Global Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 sm:px-2.5 sm:py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200"
            title="Global Search (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#187B28]" />
            <span className="hidden md:inline text-xs font-semibold">Search</span>
            <kbd className="hidden lg:inline px-1 py-0.5 bg-white text-[9px] font-mono text-slate-500 border border-slate-300 rounded">
              Ctrl+K
            </kbd>
          </button>

          {/* Quick Vote CTA Button */}
          <a
            href={SITE_CONFIG.elections.votingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="accent" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              Vote Portal
            </Button>
          </a>

          {/* Mobile Drawer Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden p-2 rounded text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-slate-900 text-white border-t border-slate-800 px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200 max-w-full overflow-x-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Platform Navigation
            </div>
            {SITE_CONFIG.mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2 rounded text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#F9C511] text-[#181818] font-bold"
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={SITE_CONFIG.elections.votingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-3.5 py-2.5 bg-[#187B28] text-[#F9C511] rounded text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Vote className="w-4 h-4" /> Official Voting Portal
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Global Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-md shadow-xl border border-slate-200 w-full max-w-xl overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="font-bold text-xs text-[#187B28] flex items-center gap-2 uppercase tracking-wider">
                <Search className="w-4 h-4" /> Global Platform Search
              </span>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Type MP name, constituency, committee, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#187B28]"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#187B28] font-bold text-xs cursor-pointer"
                >
                  Search
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Press Enter to view all results</span>
                <span className="font-mono">ESC to close</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
