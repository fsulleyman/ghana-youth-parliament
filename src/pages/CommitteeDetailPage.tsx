import type { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, Users, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
  Muted,
} from "@/components/ui";
import {
  getCommitteeById,
  getMpsByCommitteeName,
  getYouthMPById,
} from "@/services/mock-data";

export const CommitteeDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const committee = id ? getCommitteeById(id) : undefined;
  const memberMps = committee ? getMpsByCommitteeName(committee.name) : [];
  const chairMp = committee?.chairMpId ? getYouthMPById(committee.chairMpId) : undefined;
  const viceChairMp = committee?.viceChairMpId ? getYouthMPById(committee.viceChairMpId) : undefined;

  if (!committee) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Committee Not Found</h2>
        <p className="text-xs text-slate-600">The requested committee record does not exist.</p>
        <Link to="/committees">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to Committee Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title={committee.name}
        description={`Standing Parliamentary Committee scrutinizing policy, conducting hearings, and presenting resolutions.`}
        breadcrumbs={[
          { label: "Committees", href: "/committees" },
          { label: committee.name },
        ]}
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="accent" icon={<BookOpen className="w-3.5 h-3.5" />}>
              Standing Committee
            </Badge>
            <Badge variant="primary" icon={<Users className="w-3.5 h-3.5" />}>
              {committee.memberCount} Members
            </Badge>
          </div>
        }
      />

      <div className="container-custom space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Column (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Committee Mandate & Scope */}
            <section className="space-y-3">
              <SectionTitleBlock title="Committee Mandate & Institutional Scope" />
              <Card className="p-6 space-y-4 border-l-4 border-l-[#187B28]">
                <Text className="text-slate-700 leading-relaxed font-medium">
                  {committee.mandate}
                </Text>
                <Text className="text-xs text-slate-600 leading-relaxed">
                  The {committee.name} Committee exercises oversight, conducts public hearings with youth stakeholders, scrutinizes proposed policy papers, and submits formal resolutions to the Speaker's Bureau for plenary consideration.
                </Text>
              </Card>
            </section>

            {/* Committee Officers (Chair & Vice Chair) */}
            <section className="space-y-3">
              <SectionTitleBlock title="Committee Leadership" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {chairMp ? (
                  <Card className="p-5 space-y-3 border-t-4 border-t-[#187B28]">
                    <Badge variant="accent">Committee Chair</Badge>
                    <div className="flex items-center gap-3">
                      <img
                        src={chairMp.photoUrl}
                        alt={chairMp.fullName}
                        className="w-14 h-16 object-cover rounded border border-slate-200 shrink-0 bg-slate-100"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[#187B28]">{chairMp.fullName}</h4>
                        <Muted className="text-xs">{chairMp.constituency} ({chairMp.region})</Muted>
                      </div>
                    </div>
                    <Link to={`/mps/${chairMp.id}`} className="block pt-2">
                      <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Profile
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <Card className="p-5 space-y-1">
                    <Badge variant="accent">Committee Chair</Badge>
                    <h4 className="font-bold text-sm text-[#187B28]">{committee.chairName}</h4>
                  </Card>
                )}

                {viceChairMp ? (
                  <Card className="p-5 space-y-3 border-t-4 border-t-[#F9C511]">
                    <Badge variant="accent">Vice Chair</Badge>
                    <div className="flex items-center gap-3">
                      <img
                        src={viceChairMp.photoUrl}
                        alt={viceChairMp.fullName}
                        className="w-14 h-16 object-cover rounded border border-slate-200 shrink-0 bg-slate-100"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[#181818]">{viceChairMp.fullName}</h4>
                        <Muted className="text-xs">{viceChairMp.constituency} ({viceChairMp.region})</Muted>
                      </div>
                    </div>
                    <Link to={`/mps/${viceChairMp.id}`} className="block pt-2">
                      <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Profile
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <Card className="p-5 space-y-1">
                    <Badge variant="accent">Vice Chair</Badge>
                    <h4 className="font-bold text-sm text-[#181818]">{committee.viceChairName}</h4>
                  </Card>
                )}
              </div>
            </section>

            {/* Assigned Youth MP Members */}
            <section className="space-y-3">
              <SectionTitleBlock title="Assigned Committee Members" />
              {memberMps.length === 0 ? (
                <Card className="p-6 text-center text-xs text-slate-500">
                  Full committee roster is being populated for development.
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {memberMps.map((mp) => (
                    <Card key={mp.id} className="p-4 flex items-center justify-between hover:border-[#187B28] transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={mp.photoUrl}
                          alt={mp.fullName}
                          className="w-12 h-14 object-cover rounded border border-slate-200 shrink-0 bg-slate-100"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-[#187B28]">{mp.fullName}</h4>
                          <p className="text-[11px] text-slate-600">{mp.constituency}</p>
                          <Muted className="text-[10px]">{mp.region} Region</Muted>
                        </div>
                      </div>
                      <Link to={`/mps/${mp.id}`}>
                        <Button variant="ghost" size="sm">Profile</Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Committee Quick Facts */}
            <Card className="p-5 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Committee Summary
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Members:</span>
                  <span className="font-bold">{committee.memberCount} MPs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reports Published:</span>
                  <span className="font-bold text-[#187B28]">{committee.reportsCount} Papers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Classification:</span>
                  <span className="font-bold">Standing Committee</span>
                </div>
              </div>
            </Card>

            {/* Committee Reports & Downloads */}
            <Card className="p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Published Policy Reports
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#187B28]">
                    <span>Policy Recommendation Paper 2026</span>
                    <FileText className="w-3.5 h-3.5 text-[#187B28]" />
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    Official committee recommendations presented during the 2026 Plenary Session.
                  </p>
                  <Link to="/resources" className="inline-block pt-1 text-[11px] font-bold text-[#187B28] hover:underline">
                    Download Report PDF &rarr;
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
