import type { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Mail, ArrowLeft, ExternalLink } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
  Muted,
  H3,
} from "@/components/ui";
import {
  getYouthMPById,
  getConstituencyById,
  getActivitiesByMpName,
} from "@/services/mock-data";

export const YouthMpProfilePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const mp = id ? getYouthMPById(id) : undefined;
  const constituency = mp ? getConstituencyById(mp.constituencyId) : undefined;
  const activities = mp ? getActivitiesByMpName(mp.fullName) : [];

  if (!mp) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Youth MP Profile Not Found</h2>
        <p className="text-xs text-slate-600">The requested Youth MP record does not exist.</p>
        <Link to="/mps">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to Youth MP Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title={mp.fullName}
        description={`Youth Member of Parliament for ${mp.constituency} (${mp.region} Region)`}
        breadcrumbs={[
          { label: "Youth MPs", href: "/mps" },
          { label: mp.fullName },
        ]}
        badge={
          <div className="flex items-center gap-2">
            {mp.status === "Current" ? (
              <Badge variant="primary">Current Youth MP</Badge>
            ) : (
              <Badge variant="neutral">Past Youth MP</Badge>
            )}
            {mp.isLeadership && <Badge variant="accent">{mp.leadershipTitle}</Badge>}
            <Badge variant="outline" icon={<MapPin className="w-3.5 h-3.5" />}>
              {mp.region} Region
            </Badge>
          </div>
        }
      />

      <div className="container-custom space-y-8">
        {/* Mandatory Sample Content Disclaimer Banner */}
        <Alert type="warning" title="SAMPLE CONTENT — FOR DEVELOPMENT ONLY">
          <p className="text-xs text-amber-900 leading-relaxed">
            This profile is an invented sample record created strictly for software development, layout testing, and demonstration purposes. In compliance with platform standards, an illustrated initials-based avatar is used to ensure no real individual's photograph or personal identity is associated with simulated political bios.
          </p>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Column (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* MP Profile Card Overview */}
            <Card className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-[#187B28]">
              {/* Brand-colored Initials Avatar Placeholder */}
              <div className="bg-slate-50 p-2 border border-slate-200 rounded-md shrink-0">
                <img
                  src={mp.photoUrl}
                  alt={mp.fullName}
                  className="w-32 h-32 rounded-full object-cover border-2 border-white shadow-sm bg-[#187B28]"
                />
              </div>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h2 className="font-bold text-xl text-[#187B28]">{mp.fullName}</h2>
                    {mp.status === "Current" ? (
                      <Badge variant="primary">Current MP</Badge>
                    ) : (
                      <Badge variant="neutral">Past MP</Badge>
                    )}
                    {mp.isLeadership && <Badge variant="accent">{mp.leadershipTitle}</Badge>}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-1">
                    Constituency:{" "}
                    {constituency ? (
                      <Link to={`/constituencies/${constituency.id}`} className="text-[#187B28] hover:underline font-bold">
                        {mp.constituency}
                      </Link>
                    ) : (
                      <span>{mp.constituency}</span>
                    )}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <Muted>Committee Assignment</Muted>
                    <span className="font-bold text-slate-900 block">{mp.committee}</span>
                  </div>
                  <div>
                    <Muted>Region Coverage</Muted>
                    <span className="font-bold text-slate-900 block">{mp.region} Region</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Biography & Parliamentary Mandate */}
            <section className="space-y-3">
              <SectionTitleBlock title="Biography & Legislative Mandate" />
              <Card className="p-6 space-y-3">
                <Text className="text-slate-700 leading-relaxed">
                  {mp.bio}
                </Text>
                <Text className="text-slate-700 leading-relaxed">
                  In addition to plenary debate contributions, {mp.fullName} engages actively in committee hearings, bill scrutiny, and community outreach forums within the {mp.constituency} constituency.
                </Text>
              </Card>
            </section>

            {/* Parliamentary Activities & Initiatives Led */}
            <section className="space-y-3">
              <SectionTitleBlock title="Parliamentary & Constituency Activities" />
              {activities.length === 0 ? (
                <Card className="p-6 text-center text-xs text-slate-500">
                  No public activities logged for this representative yet.
                </Card>
              ) : (
                <div className="space-y-4">
                  {activities.map((act) => (
                    <Card key={act.id} className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="neutral">{act.category}</Badge>
                        <Muted>{act.date}</Muted>
                      </div>
                      <H3 className="text-sm font-bold text-[#187B28]">{act.title}</H3>
                      <Text className="text-xs text-slate-600">{act.description}</Text>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Contact Details & Link Box */}
            <Card className="p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Official Contact & Directory
              </h4>
              <div className="space-y-3 text-xs">
                {mp.email && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-[#187B28] shrink-0" />
                    <a href={`mailto:${mp.email}`} className="text-[#187B28] hover:underline font-medium">
                      {mp.email}
                    </a>
                  </div>
                )}
                {constituency && (
                  <div className="flex items-center gap-2 text-slate-700 pt-1">
                    <MapPin className="w-4 h-4 text-[#187B28] shrink-0" />
                    <Link to={`/constituencies/${constituency.id}`} className="text-[#187B28] hover:underline font-medium">
                      View {constituency.name} Constituency Page &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </Card>

            {/* Verification Badge Box */}
            <Alert type="info" title="Sample Directory Record">
              <p className="text-xs text-slate-700 leading-relaxed">
                Status: <span className="font-bold">{mp.status} Youth MP</span>. Accredited parliamentary representative profile.
              </p>
            </Alert>

            {/* Election Platform Notice */}
            <Alert type="warning" title="Election Portal Information">
              <p className="text-xs text-amber-900 leading-relaxed">
                Youth MP election results and voting records are hosted on the YPG Vote platform.
              </p>
              <div className="pt-3">
                <a
                  href="https://ypgvote.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" size="sm" className="w-full justify-between" rightIcon={<ExternalLink className="w-3 h-3" />}>
                    YPG Vote Platform
                  </Button>
                </a>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};
