import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import {
  Landmark,
  Target,
  Eye,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award,
  ExternalLink,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  SectionTitleBlock,
  H3,
  Lead,
  Text,
  Muted,
} from "@/components/ui";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "elections" | "membership";
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is the primary purpose of the Ghana Youth Parliament?",
    answer: "The Ghana Youth Parliament serves as the central official platform for young citizens across all 275 constituencies to learn legislative procedures, debate national policy, develop leadership skills, and advocate for youth priorities.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "Is this website the platform where voting and election results take place?",
    answer: "No. The Ghana Youth Parliament already operates an official digital election system hosted at YPG Vote (https://ypgvote.vercel.app/) for voter registration, candidate management, voting, and election result calculations. This website serves as the informational and engagement hub connecting citizens to those external systems.",
    category: "elections",
  },
  {
    id: "faq-3",
    question: "Who is eligible to become a Youth Member of Parliament?",
    answer: "Youth MP eligibility guidelines are governed by official parliamentary rules. Generally, applicants must be young Ghanaian citizens within designated age limits residing in or connected to their representative constituency. Detailed eligibility criteria can be viewed in our Resource Centre.",
    category: "membership",
  },
  {
    id: "faq-4",
    question: "How are Youth Parliament policy recommendations submitted to national leaders?",
    answer: "After plenary debates and committee deliberations, formal resolutions and policy papers are compiled by the Secretariat and officially presented to the Parliament of Ghana, relevant Ministries, and national youth agencies.",
    category: "general",
  },
  {
    id: "faq-5",
    question: "How can young citizens participate without being a Youth MP?",
    answer: "Young citizens can participate by attending public committee sittings, submitting questions or community suggestions through our Youth Engagement portal, participating in regional youth forums, and following official news.",
    category: "membership",
  },
];

export const AboutPage: FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-14 pb-20">
      {/* 1. Page Header Banner */}
      <PageHeaderBanner
        title="About Ghana Youth Parliament"
        description="Discover our mission, legislative simulation framework, organizational structure, and role in youth democratic participation."
        breadcrumbs={[{ label: "About Us" }]}
        badge={
          <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Institutional Overview
          </Badge>
        }
      />

      <div className="container-custom space-y-14">
        {/* 2. Institutional Overview & Mandate */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="Institutional Purpose & Role"
            subtitle="Bridging the gap between young Ghanaian citizens and national democratic governance."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <Lead>
                The Ghana Youth Parliament is an official parliamentary initiative designed to provide young people across all 275 constituencies with a structured, credible platform for legislative learning, public policy debate, and civic advocacy.
              </Lead>
              <Text>
                Operated under institutional principles of transparency, accessibility, and non-partisanship, the Youth Parliament mirrors the legislative procedures of the Parliament of Ghana. It empowers young leaders to analyze complex socio-economic challenges, draft committee reports, and present actionable policy recommendations to government institutions.
              </Text>
              <Text>
                Through regional constituency representation, parliamentary committee sittings, and public engagement programs, the Youth Parliament fosters a culture of active citizenship, democratic responsibility, and national development.
              </Text>
            </div>

            <Card className="p-6 space-y-4 bg-slate-50 border-emerald-200 border-l-4 border-l-[#187B28]">
              <h3 className="font-bold text-base text-[#187B28]">Core Institutional Values</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#187B28]"></span>
                  <span className="font-semibold">Institutional Credibility & Trust</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F9C511]"></span>
                  <span className="font-semibold">Inclusive Constituency Representation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#187B28]"></span>
                  <span className="font-semibold">Non-Partisan Policy Advocacy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#181818]"></span>
                  <span className="font-semibold">Youth Empowerment & Integrity</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 space-y-4 border-t-4 border-t-[#187B28]">
            <div className="w-12 h-12 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
              <Target className="w-6 h-6 text-[#187B28]" />
            </div>
            <H3 className="text-xl font-bold text-[#187B28]">Our Mission</H3>
            <Text className="text-slate-700 leading-relaxed">
              To empower Ghanaian youth through structured parliamentary simulation, civic education, and constituency-based representation, fostering a new generation of ethical, policy-literate national leaders.
            </Text>
          </Card>

          <Card className="p-8 space-y-4 border-t-4 border-t-[#F9C511]">
            <div className="w-12 h-12 rounded bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6 text-amber-700" />
            </div>
            <H3 className="text-xl font-bold text-[#181818]">Our Vision</H3>
            <Text className="text-slate-700 leading-relaxed">
              To be the premier youth parliamentary institution in Africa, recognized for transformative youth leadership, robust policy contributions, and inclusive democratic participation.
            </Text>
          </Card>
        </section>

        {/* 4. Core Institutional Objectives */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="Core Objectives"
            subtitle="The strategic pillars guiding Youth Parliament activities and legislative sittings."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-3">
              <div className="w-9 h-9 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5 text-[#187B28]" />
              </div>
              <h4 className="font-bold text-sm text-[#187B28]">Legislative Training</h4>
              <Muted>
                Train youth in parliamentary standing orders, bill drafting, debate etiquette, and committee investigation.
              </Muted>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="w-9 h-9 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5 text-[#187B28]" />
              </div>
              <h4 className="font-bold text-sm text-[#187B28]">Policy Formulation</h4>
              <Muted>
                Conduct policy research on youth employment, education, digital economy, gender equality, and climate.
              </Muted>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="w-9 h-9 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-[#187B28]" />
              </div>
              <h4 className="font-bold text-sm text-[#187B28]">Constituency Linkages</h4>
              <Muted>
                Ensure every constituency has an active Youth MP capturing grassroots youth concerns and ideas.
              </Muted>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="w-9 h-9 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#187B28]" />
              </div>
              <h4 className="font-bold text-sm text-[#187B28]">Institutional Dialogue</h4>
              <Muted>
                Maintain formal dialogue channels with the Parliament of Ghana, National Youth Authority, and Ministries.
              </Muted>
            </Card>
          </div>
        </section>

        {/* 5. History & Background (Placeholder Architecture) */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="History & Milestones"
            subtitle="Tracing the establishment and evolution of the Ghana Youth Parliament."
          />

          <Alert type="info">
            Official historical records, founding dates, and administrative archives are currently being verified by the Secretariat. Content below represents CMS-ready milestone placeholders.
          </Alert>

          <div className="space-y-4">
            <div className="p-5 border-l-4 border-l-[#187B28] bg-white border rounded-r-md space-y-1">
              <Badge variant="accent">SAMPLE CONTENT — FOR DEVELOPMENT ONLY</Badge>
              <h4 className="font-bold text-sm text-[#187B28]">Establishment & Framework Approval</h4>
              <p className="text-xs text-slate-600">
                Initial organizational framework conceived to establish a national youth legislative simulation body connecting regional constituencies across Ghana.
              </p>
            </div>

            <div className="p-5 border-l-4 border-l-[#F9C511] bg-white border rounded-r-md space-y-1">
              <Badge variant="accent">SAMPLE CONTENT — FOR DEVELOPMENT ONLY</Badge>
              <h4 className="font-bold text-sm text-[#181818]">Constituency Expansion & Standing Orders</h4>
              <p className="text-xs text-slate-600">
                Formal adoption of parliamentary standing orders, committee structures, and constituency delegate election procedures.
              </p>
            </div>

            <div className="p-5 border-l-4 border-l-slate-800 bg-white border rounded-r-md space-y-1">
              <Badge variant="primary">2026 Milestone</Badge>
              <h4 className="font-bold text-sm text-[#187B28]">Digital Platform Launch & YPG Vote Integration</h4>
              <p className="text-xs text-slate-600">
                Deployment of the official digital information platform paired with direct informational access to the YPG Vote election system.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Governance & Organizational Structure */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="Organizational Structure"
            subtitle="The leadership and administrative hierarchy of the Youth Parliament."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 space-y-2 border-t-4 border-t-[#187B28]">
              <h4 className="font-bold text-sm text-[#187B28]">Speaker's Bureau</h4>
              <p className="text-xs text-slate-600">
                Led by the Speaker and Deputy Speakers presiding over plenary sittings, enforcing standing orders, and maintaining chamber order.
              </p>
            </Card>

            <Card className="p-5 space-y-2 border-t-4 border-t-[#F9C511]">
              <h4 className="font-bold text-sm text-[#181818]">Parliamentary Committees</h4>
              <p className="text-xs text-slate-600">
                Specialized standing committees examining specific policy areas including Education, Employment, Gender, and Constitutional Affairs.
              </p>
            </Card>

            <Card className="p-5 space-y-2 border-t-4 border-t-slate-800">
              <h4 className="font-bold text-sm text-slate-900">Parliamentary Secretariat</h4>
              <p className="text-xs text-slate-600">
                Administrative secretariat managing official records, plenary agendas, publication of papers, and website content moderation.
              </p>
            </Card>
          </div>
        </section>

        {/* 7. Frequently Asked Questions (FAQ Accordion System) */}
        <section id="faq" className="space-y-6 pt-4">
          <SectionTitleBlock
            title="Frequently Asked Questions (FAQ)"
            subtitle="Find clear answers regarding Youth Parliament operations, elections, and participation."
          />

          <div className="space-y-3 max-w-4xl">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-md overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm text-[#181818] flex items-center gap-2">
                      <span className="text-[#187B28]">Q.</span> {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#187B28] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                      {faq.category === "elections" && (
                        <div className="pt-3">
                          <a
                            href={SITE_CONFIG.elections.votingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#187B28] hover:underline"
                          >
                            Access Official YPG Voting Portal <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="p-8 bg-[#187B28] text-white rounded-md border-b-4 border-[#F9C511] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Interested in Participating?</h3>
            <p className="text-xs text-emerald-100">
              Discover guidelines on how to become a Youth MP or submit public feedback to Parliament.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/how-to-become-youth-mp">
              <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                How to Become a Youth MP
              </Button>
            </Link>
            <a
              href={SITE_CONFIG.elections.votingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                Election Portal
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
