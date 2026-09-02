import { useState, useEffect, type FC, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Menu, X, Vote, User, LogOut, Search } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import { useAuth } from "@/context/AuthContext";

export const HeaderPlaceholder: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

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

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchModalOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Official Institutional Top Bar - Institutional Green & Ghana Gold */}
      <div className="bg-[#187B28] text-white text-xs py-1.5 border-b border-[#136320]">
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F9C511]"></span>
            <span className="font-medium tracking-wide">
              Official Digital Information & Engagement Hub — Republic of Ghana
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-100">
            <a
              href={SITE_CONFIG.elections.votingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#F9C511] transition-colors"
              title="Access Official YPG Voting Portal"
            >
              <Vote className="w-3.5 h-3.5 text-[#F9C511]" />
              <span>Official Voting Portal</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </a>
            <span className="text-emerald-300">|</span>
            <a
              href={SITE_CONFIG.elections.resultsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#F9C511] transition-colors"
              title="Access Official Election Results"
            >
              <span>Election Results</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Branding Section - Light Header with Real Logo */}
      <div className="container-custom py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/brand/logo.png"
            alt="Ghana Youth Parliament Logo"
            className="w-10 h-10 object-contain rounded border border-slate-200 bg-white"
          />
          <div>
            <div className="font-extrabold text-lg text-[#187B28] tracking-tight leading-none group-hover:text-[#136320]">
              GHANA YOUTH PARLIAMENT
            </div>
            <div className="text-xs text-slate-500 font-medium tracking-normal mt-0.5">
              Empowering Youth. Building Leadership.
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links, Search & User Session */}
        <div className="hidden lg:flex items-center space-x-2">
          <nav className="flex items-center space-x-1" aria-label="Main Navigation">
            {SITE_CONFIG.mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded ${
                    active
                      ? "bg-[#187B28] text-white"
                      : "text-[#181818] hover:bg-slate-100 hover:text-[#187B28]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Global Search Trigger Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded flex items-center gap-2 cursor-pointer transition-colors border border-slate-200"
            title="Global Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#187B28]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-white text-[10px] font-mono text-slate-500 border border-slate-300 rounded shadow-2xs">
              Ctrl+K
            </kbd>
          </button>

          {/* User Auth Profile Badge */}
          <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-2.5 py-1">
                <img
                  src={user.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#187B28]"
                />
                <Link to="/login" className="text-xs font-bold text-slate-800 hover:text-[#187B28] truncate max-w-[110px]">
                  {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-[#DC0B10] cursor-pointer p-0.5"
                  title="Sign Out Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 bg-slate-100 text-[#187B28] hover:bg-[#187B28] hover:text-white rounded text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" /> Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-[#181818] hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-slate-900 text-white border-t border-slate-800 px-4 py-4 space-y-1">
          {SITE_CONFIG.mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded text-sm font-medium ${
                  active ? "bg-[#F9C511] text-[#181818] font-bold" : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="flex items-center justify-between w-full px-3 py-2 bg-slate-800 text-white rounded text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#F9C511]" /> Search Platform
              </span>
              <kbd className="text-xs text-slate-400">Ctrl+K</kbd>
            </button>
          </div>
        </nav>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#187B28] font-bold text-xs"
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
