export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const SITE_CONFIG = {
  name: "Ghana Youth Parliament",
  shortName: "GYP",
  tagline: "Official Digital Information & Youth Engagement Platform",
  description: "The central official information, communication, representation and engagement hub for the Ghana Youth Parliament.",
  
  /* Centrally Managed External Election Platform Integration */
  elections: {
    votingUrl: "https://ypgvote.vercel.app/",
    resultsUrl: "https://ypgvote.vercel.app/results",
    notice: "Election registration, candidate management, voting, and official result calculations are handled directly on the official YPG Vote platform."
  },

  /* Primary Institutional Navigation Hierarchy */
  mainNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Constituencies", href: "/constituencies" },
    { label: "Youth MPs", href: "/mps" },
    { label: "Leadership", href: "/leadership" },
    { label: "Committees", href: "/committees" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "Elections", href: "/elections" },
  ] as NavItem[],

  /* Quick Access & Footer Navigation */
  quickLinks: [
    { label: "Become a Youth MP", href: "/how-to-become-youth-mp" },
    { label: "Youth MP Activities", href: "/activities" },
    { label: "Media Centre", href: "/media" },
    { label: "Youth Engagement", href: "/engagement" },
    { label: "Frequently Asked Questions", href: "/about#faq" },
  ] as NavItem[],

  contact: {
    address: "Parliament House, Accra, Ghana",
    email: "info@youthparliament.gov.gh",
    phone: "+233 (0) 30 200 0000",
  }
};
