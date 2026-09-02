import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import { Vote, ExternalLink, ShieldCheck, ChevronDown } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
  Muted,
} from "@/components/ui";

interface FAQItem {
  question: string;
  answer: string;
}

const ELECTION_FAQS: FAQItem[] = [
  {
    question: "Where do I register as a voter or cast my vote?",
    answer: "Voting and voter registration for the Ghana Youth Parliament are conducted exclusively on the official YPG Vote platform at ypgvote.vercel.app. This information platform provides guidance, election schedules, and direct links to the official voting portal.",
  },
  {
    question: "Who is eligible to vote in Youth Parliament elections?",
    answer: "Any Ghanaian citizen aged 15 to 35 residing within one of the 275 parliamentary constituencies is eligible to register and vote on the official YPG Vote platform.",
  },
  {
    question: "How are election results verified and published?",
    answer: "Official election results are compiled by the Electoral Committee and published live on the official YPG Results platform at ypgvote.vercel.app/results immediately following poll closure and audit certification.",
  },
  {
    question: "How do I candidate myself to become a Youth MP?",
    answer: "Prospective candidates should review the eligibility criteria on our 'How to Become a Youth MP' guide, secure 20 constituent endorsements, and complete nomination filing on the YPG Vote portal.",
  },
];

const REGIONAL_STATUSES = [
  { region: "Greater Accra", status: "Nomination Open", count: "27 Constituencies" },
  { region: "Ashanti", status: "Nomination Open", count: "47 Constituencies" },
  { region: "Western", status: "Campaigning", count: "17 Constituencies" },
  { region: "Northern", status: "Nomination Open", count: "18 Constituencies" },
  { region: "Central", status: "Campaigning", count: "23 Constituencies" },
  { region: "Eastern", status: "Nomination Open", count: "33 Constituencies" },
  { region: "Volta", status: "Campaigning", count: "18 Constituencies" },
  { region: "Upper East", status: "Nomination Open", count: "15 Constituencies" },
];

export const ElectionInfoPage: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Election Information & Portal Guide"
        description="Official guidance, election schedules, regional status updates, and links to the YPG Vote election platform."
        breadcrumbs={[{ label: "Election Information" }]}
        badge={
          <Badge variant="accent" icon={<Vote className="w-3.5 h-3.5" />}>
            Official Election Hub
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* Prominent Official YPG Vote Callout Banner */}
        <section className="bg-gradient-to-br from-[#187B28] to-[#136320] text-white p-8 md:p-10 rounded-md shadow-md space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Official Election Systems Link
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                Cast Your Vote & Access Live Election Results
              </h2>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Voting, voter registration, and live certified result tallies for all 275 constituencies are hosted on the official Youth Parliament election platforms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://ypgvote.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="accent"
                  size="lg"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                  className="w-full justify-center font-bold"
                >
                  Official Voting Portal
                </Button>
              </a>

              <a
                href="https://ypgvote.vercel.app/results"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                  className="w-full justify-center bg-white/10 hover:bg-white/20 text-white border-white/40 font-bold"
                >
                  View Live Results
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Election Timeline Schedule */}
        <section className="space-y-6">
          <SectionTitleBlock title="2026 Parliamentary Election Timetable" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 space-y-3 border-t-4 border-t-[#187B28]">
              <span className="text-xs font-mono font-bold text-[#187B28] uppercase">Phase 01</span>
              <h4 className="font-bold text-base text-[#181818]">Voter Registration</h4>
              <Muted className="text-xs">01 July - 31 July 2026</Muted>
              <Text className="text-xs text-slate-600 leading-relaxed">
                Online voter account creation and constituency validation on ypgvote.vercel.app.
              </Text>
            </Card>

            <Card className="p-6 space-y-3 border-t-4 border-t-[#F9C511]">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">Phase 02</span>
              <h4 className="font-bold text-base text-[#181818]">Candidate Nominations</h4>
              <Muted className="text-xs">01 August - 20 August 2026</Muted>
              <Text className="text-xs text-slate-600 leading-relaxed">
                Filing of nomination forms and submission of 20 constituent endorsements.
              </Text>
            </Card>

            <Card className="p-6 space-y-3 border-t-4 border-t-[#187B28]">
              <span className="text-xs font-mono font-bold text-[#187B28] uppercase">Phase 03</span>
              <h4 className="font-bold text-base text-[#181818]">Official Campaigning</h4>
              <Muted className="text-xs">21 August - 10 September 2026</Muted>
              <Text className="text-xs text-slate-600 leading-relaxed">
                Constituency debates, townhalls, and policy manifesto presentations.
              </Text>
            </Card>

            <Card className="p-6 space-y-3 border-t-4 border-t-emerald-700 bg-emerald-50/50">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Phase 04</span>
              <h4 className="font-bold text-base text-[#181818]">Polling & Certification</h4>
              <Muted className="text-xs">15 September 2026</Muted>
              <Text className="text-xs text-slate-600 leading-relaxed">
                Live voting on ypgvote.vercel.app followed by official certified results release.
              </Text>
            </Card>
          </div>
        </section>

        {/* Regional Election Status Overview */}
        <section className="space-y-6">
          <SectionTitleBlock title="Regional Election Status Overview" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {REGIONAL_STATUSES.map((item, idx) => (
              <Card key={idx} className="p-4 space-y-2 border-l-4 border-l-[#187B28]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#181818]">{item.region}</h4>
                  <Badge variant="accent">{item.status}</Badge>
                </div>
                <Muted className="text-[11px]">{item.count}</Muted>
              </Card>
            ))}
          </div>
        </section>

        {/* Election FAQ Accordion */}
        <section className="space-y-6">
          <SectionTitleBlock title="Frequently Asked Election Questions" />

          <div className="space-y-3">
            {ELECTION_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <Card key={index} className="overflow-hidden border border-slate-200">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#181818] hover:text-[#187B28] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-[#187B28]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        {/* Become an MP CTA */}
        <Card className="p-8 bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-[#187B28]">Interested in Representing Your Constituency?</h4>
            <Text className="text-xs text-slate-600">
              Read our comprehensive step-by-step guide on eligibility criteria and candidate nomination procedures.
            </Text>
          </div>

          <Link to="/how-to-become-youth-mp" className="shrink-0">
            <Button variant="primary" size="md">
              Read Candidate Guide
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
