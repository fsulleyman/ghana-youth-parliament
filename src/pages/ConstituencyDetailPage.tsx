import type { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ExternalLink, ArrowLeft, Mail, Award } from "lucide-react";
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
  getConstituencyById,
  getYouthMPByConstituencyId,
  getActivitiesByConstituencyId,
} from "@/services/mock-data";

export const ConstituencyDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const constituency = id ? getConstituencyById(id) : undefined;
  const youthMp = id ? getYouthMPByConstituencyId(id) : undefined;
  const activities = id ? getActivitiesByConstituencyId(id) : [];

  if (!constituency) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Constituency Not Found</h2>
        <p className="text-xs text-slate-600">The requested constituency record does not exist.</p>
        <Link to="/constituencies">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to Constituency Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title={constituency.name}
        description={`Official parliamentary constituency details, youth population metrics, and Youth MP representation.`}
        breadcrumbs={[
          { label: "Constituencies", href: "/constituencies" },
          { label: constituency.name },
        ]}
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="accent" icon={<MapPin className="w-3.5 h-3.5" />}>
              {constituency.region} Region
            </Badge>
            <span className="text-xs font-mono font-bold bg-emerald-950 text-[#F9C511] px-2 py-0.5 rounded border border-[#F9C511]">
              {constituency.code}
            </span>
          </div>
        }
      />

      <div className="container-custom space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Constituency Summary */}
            <section className="space-y-3">
              <SectionTitleBlock title="Constituency Profile" />
              <Card className="p-6 space-y-3">
                <Text className="text-slate-700 leading-relaxed">
                  {constituency.description}
                </Text>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <Muted>Constituency Code</Muted>
                    <span className="font-bold text-slate-900 font-mono">{constituency.code}</span>
                  </div>
                  <div>
                    <Muted>Capital / Main Hub</Muted>
                    <span className="font-bold text-slate-900">{constituency.capital}</span>
                  </div>
                  <div>
                    <Muted>Est. Youth Population</Muted>
                    <span className="font-bold text-[#187B28]">{constituency.totalYouthPopulation}</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* Representative Youth MP Card */}
            <section className="space-y-3">
              <SectionTitleBlock title="Youth MP Representation" />
              {youthMp ? (
                <Card className="p-6 flex flex-col sm:flex-row items-start gap-6 border-l-4 border-l-[#187B28]">
                  <img
                    src={youthMp.photoUrl}
                    alt={youthMp.fullName}
                    className="w-28 h-32 object-cover rounded border border-slate-200 shrink-0 bg-slate-100"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-[#187B28]">{youthMp.fullName}</h3>
                      {youthMp.isLeadership && (
                        <Badge variant="accent">{youthMp.leadershipTitle}</Badge>
                      )}
                    </div>
                    <Muted>
                      Youth MP for {constituency.name} ({constituency.region})
                    </Muted>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {youthMp.bio}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-slate-700">
                        <Award className="w-3.5 h-3.5 text-[#187B28]" />
                        <span className="font-semibold">{youthMp.committee}</span>
                      </span>
                      {youthMp.email && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Mail className="w-3.5 h-3.5 text-[#187B28]" />
                          <span>{youthMp.email}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 text-center text-xs text-slate-500">
                  No verified Youth MP assigned to this constituency record yet.
                </Card>
              )}
            </section>

            {/* Local Parliamentary Activities */}
            <section className="space-y-3">
              <SectionTitleBlock title="Local Parliamentary Activities" />
              {activities.length === 0 ? (
                <Card className="p-6 text-center text-xs text-slate-500">
                  No published activities logged for this constituency yet.
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
            {/* External Election Notice Box */}
            <Alert type="warning" title="Official Election Platform Notice">
              <p className="text-xs text-amber-900 leading-relaxed">
                Youth MP elections for {constituency.name} are officially administered on the YPG Vote platform.
              </p>
              <div className="pt-3 space-y-2">
                <a
                  href={`https://ypgvote.vercel.app/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="primary" size="sm" className="w-full justify-between" rightIcon={<ExternalLink className="w-3 h-3" />}>
                    Voting Portal
                  </Button>
                </a>
                <a
                  href={`https://ypgvote.vercel.app/results`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" size="sm" className="w-full justify-between" rightIcon={<ExternalLink className="w-3 h-3" />}>
                    Constituency Results
                  </Button>
                </a>
              </div>
            </Alert>

            {/* Quick Stats Card */}
            <Card className="p-5 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Constituency Quick Facts
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Region:</span>
                  <span className="font-bold">{constituency.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Code:</span>
                  <span className="font-mono font-bold">{constituency.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Youth Population:</span>
                  <span className="font-bold text-[#187B28]">{constituency.totalYouthPopulation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Initiatives:</span>
                  <span className="font-bold">{constituency.activeInitiativesCount}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
