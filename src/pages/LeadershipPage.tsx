import type { FC } from "react";
import { Link } from "react-router-dom";
import { Award, Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
  Muted,
} from "@/components/ui";
import { MOCK_LEADERSHIP } from "@/services/mock-data";

export const LeadershipPage: FC = () => {
  const presidingOfficers = MOCK_LEADERSHIP.filter((l) => l.category === "presiding");
  const bureauMembers = MOCK_LEADERSHIP.filter((l) => l.category === "bureau");
  const secretariatMembers = MOCK_LEADERSHIP.filter((l) => l.category === "secretariat");

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Parliamentary Leadership"
        description="Presiding officers, chamber leadership bureau, and secretariat leadership of the Ghana Youth Parliament."
        breadcrumbs={[{ label: "Leadership" }]}
        badge={
          <Badge variant="accent" icon={<Award className="w-3.5 h-3.5" />}>
            Official Leadership
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* 1. Presiding Officers */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="Presiding Officers of the Chamber"
            subtitle="The Speaker and Deputy Speakers presiding over plenary sittings and constitutional proceedings."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {presidingOfficers.map((officer) => (
              <Card key={officer.id} className="p-6 flex flex-col sm:flex-row items-start gap-6 border-l-4 border-l-[#187B28]">
                <img
                  src={officer.photoUrl}
                  alt={officer.fullName}
                  className="w-32 h-40 object-cover rounded border border-slate-200 shrink-0 bg-slate-100 shadow-xs"
                />
                <div className="space-y-3 flex-1 flex flex-col justify-between h-full">
                  <div className="space-y-1.5">
                    <Badge variant="accent">{officer.title}</Badge>
                    <h3 className="font-bold text-lg text-[#187B28]">{officer.fullName}</h3>
                    {officer.constituency && (
                      <Muted className="text-xs">
                        Youth MP for <span className="font-semibold text-slate-800">{officer.constituency}</span>
                      </Muted>
                    )}
                    <Text className="text-xs text-slate-600 leading-relaxed pt-1">
                      {officer.roleDescription}
                    </Text>
                  </div>
                  {officer.mpId && (
                    <div className="pt-3 border-t border-slate-100">
                      <Link to={`/mps/${officer.mpId}`}>
                        <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          View Full MP Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 2. Chamber Leadership Bureau */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="Chamber Leadership Bureau"
            subtitle="Majority and Minority caucus leaders guiding parliamentary business and legislative motions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bureauMembers.map((bureau) => (
              <Card key={bureau.id} className="p-6 space-y-3 border-t-4 border-t-[#F9C511]">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{bureau.title}</Badge>
                  <Badge variant="neutral" icon={<ShieldCheck className="w-3 h-3 text-[#187B28]" />}>
                    Bureau Officer
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-[#181818]">{bureau.fullName}</h3>
                {bureau.constituency && (
                  <Muted className="text-xs">
                    Youth MP for <span className="font-semibold text-slate-800">{bureau.constituency}</span>
                  </Muted>
                )}
                <Text className="text-xs text-slate-600 leading-relaxed">
                  {bureau.roleDescription}
                </Text>
                {bureau.mpId && (
                  <div className="pt-2">
                    <Link to={`/mps/${bureau.mpId}`}>
                      <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Profile Details
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Parliamentary Secretariat */}
        <section className="space-y-6">
          <SectionTitleBlock
            title="Office of the Clerk & Secretariat"
            subtitle="Administrative leadership managing parliamentary records, plenary agendas, and institutional operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secretariatMembers.map((sec) => (
              <Card key={sec.id} className="p-6 space-y-3 border-l-4 border-l-slate-800">
                <div className="w-10 h-10 rounded bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5 text-slate-800" />
                </div>
                <Badge variant="primary">{sec.title}</Badge>
                <h3 className="font-bold text-sm text-[#181818]">{sec.fullName}</h3>
                <Text className="text-xs text-slate-600 leading-relaxed">
                  {sec.roleDescription}
                </Text>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
