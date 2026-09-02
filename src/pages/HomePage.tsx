import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  MapPin,
  FileText,
  Vote,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Clock,
  Landmark,
  MessageSquare,
  Award,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  SectionTitleBlock,
  H1,
  H3,
  Lead,
  Text,
  Muted,
} from "@/components/ui";
import {
  MOCK_YOUTH_MPS,
  MOCK_CONSTITUENCIES,
  MOCK_NEWS,
  MOCK_EVENTS,
  MOCK_ACTIVITIES,
  MOCK_RESOURCES,
} from "@/services/mock-data";

export const HomePage: FC = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO OVERVIEW BANNER — Institutional & Official */}
      <section className="bg-[#187B28] text-white py-16 border-b-4 border-[#F9C511] relative overflow-hidden">
        <div className="container-custom relative z-10 space-y-6">
          <div className="max-w-3xl space-y-5">
            <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Official Public Information & Engagement Hub
            </Badge>

            <H1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Ghana Youth Parliament
            </H1>

            <Lead className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              The official digital platform connecting young citizens, Youth Members of Parliament, 275 constituencies, and democratic institutions across Ghana.
            </Lead>

            {/* Hero Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/about">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Learn About Youth Parliament
                </Button>
              </Link>
              <a
                href={SITE_CONFIG.elections.votingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Vote className="w-4 h-4 text-[#F9C511]" />}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5 opacity-80" />}
                >
                  Register / Vote (YPG Vote)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL ELECTION SYSTEM INTEGRATION NOTICE */}
      <section className="container-custom">
        <Alert type="warning" title="Official YPG Election System Integration Notice" className="shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-xs text-amber-900 leading-relaxed max-w-3xl">
              Voter registration, candidate registration, ballot management, and official result calculations are administered directly on the designated YPG Vote platform. This platform provides transparent information access.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={SITE_CONFIG.elections.votingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                  Voting Portal
                </Button>
              </a>
              <a
                href={SITE_CONFIG.elections.resultsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                  View Results
                </Button>
              </a>
            </div>
          </div>
        </Alert>
      </section>

      {/* 3. WHAT IS YOUTH PARLIAMENT? — Institutional Purpose & Mandate */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="What is the Ghana Youth Parliament?"
          subtitle="Understanding our mandate, organizational structure, and role in youth democratic participation."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 border-l-4 border-l-[#187B28]">
            <div className="w-10 h-10 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5 text-[#187B28]" />
            </div>
            <H3 className="text-base font-bold text-[#187B28]">Democratic Representation</H3>
            <Text className="text-slate-600">
              Provides an official parliamentary chamber for young people to simulate legislative processes, debate public policy, and articulate youth priorities across all 275 constituencies.
            </Text>
          </Card>

          <Card className="p-6 space-y-3 border-l-4 border-l-[#F9C511]">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <H3 className="text-base font-bold text-[#181818]">Leadership Development</H3>
            <Text className="text-slate-600">
              Prepares high-potential young leaders through parliamentary procedure training, committee work, public speaking, policy research, and community advocacy.
            </Text>
          </Card>

          <Card className="p-6 space-y-3 border-l-4 border-l-slate-800">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-slate-800" />
            </div>
            <H3 className="text-base font-bold text-[#181818]">Public Voice & Advocacy</H3>
            <Text className="text-slate-600">
              Bridges the gap between young citizens and policymakers, channeling grassroots community insights into formal policy recommendations submitted to national institutions.
            </Text>
          </Card>
        </div>
      </section>

      {/* 4. YOUTH MP DIRECTORY SPOTLIGHT */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="Youth Members of Parliament"
          subtitle="Discover verified representative profiles across parliamentary committees."
          actions={
            <Link to="/mps">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View Full MP Directory
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_YOUTH_MPS.slice(0, 4).map((mp) => (
            <Card key={mp.id} className="overflow-hidden flex flex-col justify-between">
              <div className="relative bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                <img
                  src={mp.photoUrl}
                  alt={mp.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm bg-[#187B28]"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={mp.status === "Current" ? "primary" : "neutral"}>
                    {mp.status} MP
                  </Badge>
                </div>
                {mp.isLeadership && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="accent">{mp.leadershipTitle}</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <div>
                  <h4 className="font-bold text-sm text-[#187B28]">{mp.fullName}</h4>
                  <Muted>{mp.constituency} ({mp.region})</Muted>
                </div>
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-600 block">
                    Committee:
                  </span>
                  <span className="text-[11px] text-slate-800 line-clamp-1">{mp.committee}</span>
                </div>
              </CardContent>
              <CardFooter className="p-3 bg-slate-50">
                <Badge variant="neutral">Verified MP</Badge>
                <Link to={`/mps/${mp.id}`}>
                  <Button variant="ghost" size="sm">Profile</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. CONSTITUENCIES DIRECTORY SPOTLIGHT */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="Constituency Directory Preview"
          subtitle="Explore regional coverage and representation across Ghana."
          actions={
            <Link to="/constituencies">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Browse All Constituencies
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_CONSTITUENCIES.map((c) => (
            <Card key={c.id} className="p-4 space-y-2 hover:border-[#187B28] transition-colors">
              <div className="flex items-center justify-between">
                <Badge variant="primary" icon={<MapPin className="w-3 h-3" />}>
                  {c.region}
                </Badge>
                <Muted>{c.totalYouthPopulation} Youth</Muted>
              </div>
              <h4 className="font-bold text-sm text-[#181818]">{c.name}</h4>
              <p className="text-xs text-slate-600">Rep: <span className="font-medium text-[#187B28]">{c.mpName}</span></p>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. LATEST NEWS & ANNOUNCEMENTS */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="Official News & Announcements"
          subtitle="Editorial updates, parliamentary session reports, and official releases."
          actions={
            <Link to="/news">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Read All News
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_NEWS.map((news) => (
            <Card key={news.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <Badge variant="primary">{news.category}</Badge>
                  <Muted>{news.date}</Muted>
                </div>
                <h4 className="font-bold text-sm text-[#187B28] hover:underline cursor-pointer">
                  {news.title}
                </h4>
                <Text className="text-xs text-slate-600 line-clamp-3">{news.summary}</Text>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <Muted>{news.readTime}</Muted>
                <Link to="/news" className="text-xs font-bold text-[#187B28] hover:underline">
                  Read Article &rarr;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. UPCOMING EVENTS & PROGRAMMES */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="Upcoming Events & Programmes"
          subtitle="Parliamentary sittings, committee hearings, and national youth summits."
          actions={
            <Link to="/events">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View Events Calendar
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((evt) => (
            <Card key={evt.id} className="p-5 space-y-3 border-t-4 border-t-[#187B28]">
              <div className="flex items-center justify-between">
                <Badge variant="accent">{evt.category}</Badge>
                <Badge variant="primary">Upcoming</Badge>
              </div>
              <h4 className="font-bold text-sm text-[#181818]">{evt.title}</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#187B28] shrink-0" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#187B28] shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#187B28] shrink-0" />
                  <span className="line-clamp-1">{evt.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. YOUTH MP ACTIVITIES SPOTLIGHT */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="Youth MP Representation in Action"
          subtitle="Documenting grassroots community projects, workshops, and school engagements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_ACTIVITIES.map((act) => (
            <Card key={act.id} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="neutral">{act.category}</Badge>
                <Muted>{act.date}</Muted>
              </div>
              <h4 className="font-bold text-sm text-[#187B28]">{act.title}</h4>
              <Text className="text-xs text-slate-600">{act.description}</Text>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  {act.mpName} <span className="text-slate-500 font-normal">({act.constituency})</span>
                </span>
                <Link to="/activities" className="text-xs font-bold text-[#187B28] hover:underline">
                  View Activity Details &rarr;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 9. RESOURCE CENTRE QUICK ACCESS */}
      <section className="container-custom space-y-6">
        <SectionTitleBlock
          title="Official Resource Centre"
          subtitle="Access parliamentary standing orders, policy papers, guides, and reports."
          actions={
            <Link to="/resources">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Browse All Documents
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_RESOURCES.map((res) => (
            <Card key={res.id} className="p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded bg-emerald-50 text-[#187B28] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5 text-[#187B28]" />
                </div>
                <Badge variant="accent">{res.category}</Badge>
                <h4 className="font-bold text-sm text-[#181818]">{res.title}</h4>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Muted>{res.fileType} • {res.fileSize}</Muted>
                <Link to="/resources">
                  <Button variant="outline" size="sm">Download</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 10. YOUTH ENGAGEMENT & PARTICIPATION CTA */}
      <section className="container-custom">
        <div className="p-8 bg-[#187B28] text-white rounded-md border-b-4 border-[#F9C511] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <Badge variant="accent" icon={<MessageSquare className="w-3.5 h-3.5" />}>
              Youth Participation Portal
            </Badge>
            <h3 className="text-2xl font-bold text-white">Have a Question or Idea for Youth Parliament?</h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Submit your questions, community suggestions, or public feedback directly to the Youth Parliament moderation team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/engagement">
              <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Submit a Question / Idea
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
