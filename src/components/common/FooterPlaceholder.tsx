import type { FC } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Mail, MapPin, Phone, Vote } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";

export const FooterPlaceholder: FC = () => {
  return (
    <footer className="w-full bg-[#187B28] text-slate-100 border-t-4 border-[#F9C511]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="Ghana Youth Parliament Logo"
                className="w-10 h-10 object-contain rounded border border-[#F9C511] bg-white"
              />
              <span className="font-bold text-white text-base tracking-tight">
                GHANA YOUTH PARLIAMENT
              </span>
            </div>
            <p className="text-xs text-slate-100 leading-relaxed">
              The official digital information, communication, representation and engagement hub for youth across all constituencies in Ghana.
            </p>
            <div className="text-xs text-emerald-100 border-l-2 border-[#F9C511] pl-3 py-1">
              Serving young leaders, Youth MPs, constituencies, and the public.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#F9C511] uppercase tracking-wider border-b border-emerald-700 pb-2">
              Navigation & Hubs
            </h3>
            <ul className="space-y-2 text-xs">
              {SITE_CONFIG.mainNav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="hover:text-[#F9C511] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources & Engagement */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#F9C511] uppercase tracking-wider border-b border-emerald-700 pb-2">
              Resources & Engagement
            </h3>
            <ul className="space-y-2 text-xs">
              {SITE_CONFIG.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="hover:text-[#F9C511] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Election Portals Notice */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#F9C511] uppercase tracking-wider border-b border-emerald-700 pb-2 flex items-center gap-1.5">
              <Vote className="w-4 h-4 text-[#F9C511]" /> Official Election Portals
            </h3>
            <p className="text-xs text-slate-100 leading-normal">
              Official voter registration, candidate management, voting, and election results are hosted on the designated official voting platforms:
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={SITE_CONFIG.elections.votingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-[#136320] border border-emerald-600 hover:border-[#F9C511] text-xs font-medium text-white transition-colors"
              >
                <span>Register / Vote Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F9C511]" />
              </a>
              <a
                href={SITE_CONFIG.elections.resultsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-[#136320] border border-emerald-600 hover:border-[#F9C511] text-xs font-medium text-white transition-colors"
              >
                <span>Official Election Results</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F9C511]" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info & Legal Disclaimer Bar */}
        <div className="mt-10 pt-6 border-t border-emerald-700 flex flex-col md:flex-row justify-between items-center text-xs text-slate-200 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F9C511]" /> {SITE_CONFIG.contact.address}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#F9C511]" /> {SITE_CONFIG.contact.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#F9C511]" /> {SITE_CONFIG.contact.phone}
            </span>
          </div>
          <div className="text-emerald-200 text-center md:text-right">
            &copy; {new Date().getFullYear()} Ghana Youth Parliament. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
