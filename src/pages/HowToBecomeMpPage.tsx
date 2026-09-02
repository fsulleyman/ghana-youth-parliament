import type { FC } from "react";
import { UserCheck, CheckCircle2, ExternalLink } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
} from "@/components/ui";

export const HowToBecomeMpPage: FC = () => {
  const eligibilityCriteria = [
    {
      title: "Age Requirement",
      detail: "Must be between 15 and 35 years of age at the time of election nomination.",
    },
    {
      title: "Ghanaian Citizenship",
      detail: "Must possess valid Ghanaian citizenship proof (Ghana Card, Passport, or Birth Certificate).",
    },
    {
      title: "Constituency Connection",
      detail: "Must reside, work, or be registered as a voter in the candidate's target constituency.",
    },
    {
      title: "Constituent Endorsements",
      detail: "Must secure at least 20 verified supporting signatures from registered youth voters in the constituency.",
    },
    {
      title: "Non-Partisan Commitment",
      detail: "Must agree to abide by the Youth Parliament Code of Conduct and non-partisan parliamentary decorum.",
    },
  ];

  const nominationSteps = [
    {
      step: "01",
      title: "Verify Candidate Eligibility",
      description: "Review age, citizenship, and constituency residency qualifications before creating your candidate profile.",
    },
    {
      step: "02",
      title: "Collect Constituent Endorsements",
      description: "Gather 20 digital or physical endorsement signatures from registered youth voters in your constituency.",
    },
    {
      step: "03",
      title: "File Nomination on YPG Vote",
      description: "Submit nomination forms and candidate manifesto on the official YPG Vote portal at ypgvote.vercel.app.",
    },
    {
      step: "04",
      title: "Campaign & Engage Constituents",
      description: "Participate in local constituency debates, present your policy vision, and mobilize youth voters.",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="How to Become a Youth MP"
        description="Comprehensive guide on candidate eligibility, nomination procedures, constituent endorsements, and campaign rules."
        breadcrumbs={[
          { label: "Election Information", href: "/elections" },
          { label: "How to Become a Youth MP" },
        ]}
        badge={
          <Badge variant="accent" icon={<UserCheck className="w-3.5 h-3.5" />}>
            Candidate Guide
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* Eligibility Criteria Checklist */}
        <section className="space-y-6">
          <SectionTitleBlock title="Candidate Eligibility Requirements" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibilityCriteria.map((item, idx) => (
              <Card key={idx} className="p-6 space-y-3 border-l-4 border-l-[#187B28]">
                <div className="flex items-center gap-2 font-bold text-[#187B28] text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <Text className="text-xs text-slate-600 leading-relaxed">
                  {item.detail}
                </Text>
              </Card>
            ))}
          </div>
        </section>

        {/* Step-by-Step Nomination Process Roadmap */}
        <section className="space-y-6">
          <SectionTitleBlock title="4-Step Candidate Nomination Roadmap" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {nominationSteps.map((s, idx) => (
              <Card key={idx} className="p-6 space-y-3 border-t-4 border-t-[#F9C511] flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-700 uppercase">Step {s.step}</span>
                  <h4 className="font-bold text-base text-[#181818]">{s.title}</h4>
                  <Text className="text-xs text-slate-600 leading-relaxed">{s.description}</Text>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Campaign Code of Conduct & Guidelines */}
        <section className="space-y-4">
          <SectionTitleBlock title="Campaign Code of Conduct & Fair Play Rules" />

          <Alert type="info" title="Ethical Campaigning Principles">
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>
                Candidates in the Ghana Youth Parliament elections must adhere strictly to democratic values:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Non-Partisanship: Focus on youth policy and community solutions rather than national political party allegiances.</li>
                <li>Respectful Debate: Maintain civil decorum in all constituency forums, townhalls, and digital campaigning.</li>
                <li>Integrity: No voter inducement, false statements, or identity misrepresentation.</li>
              </ul>
            </div>
          </Alert>
        </section>

        {/* Direct Link to YPG Vote Candidate Filing */}
        <section className="bg-slate-50 border border-slate-200 p-8 rounded-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-[#187B28]">Ready to Submit Your Nomination?</h4>
            <Text className="text-xs text-slate-600">
              Access the official YPG Vote nomination portal to complete candidate filing and upload your manifesto.
            </Text>
          </div>

          <a
            href="https://ypgvote.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="primary" size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
              Open YPG Nomination Portal
            </Button>
          </a>
        </section>
      </div>
    </div>
  );
};
