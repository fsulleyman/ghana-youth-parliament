import type { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft, Video } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
  Muted,
} from "@/components/ui";
import { getEventById, MOCK_EVENTS } from "@/services/mock-data";

export const EventDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? getEventById(id) : undefined;
  const relatedEvents = MOCK_EVENTS.filter((e) => e.id !== id).slice(0, 3);

  if (!event) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Event Not Found</h2>
        <p className="text-xs text-slate-600">The requested event record does not exist or has passed.</p>
        <Link to="/events">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to Events Calendar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title={event.title}
        description={`Scheduled for ${event.date} • ${event.location}`}
        breadcrumbs={[
          { label: "Events & Programmes", href: "/events" },
          { label: event.category },
        ]}
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="accent">{event.category}</Badge>
            <Badge
              variant={
                event.status === "upcoming"
                  ? "primary"
                  : event.status === "ongoing"
                  ? "warning"
                  : "neutral"
              }
            >
              {event.status === "upcoming" ? "Upcoming Event" : event.status === "ongoing" ? "Ongoing" : "Completed"}
            </Badge>
          </div>
        }
      />

      <div className="container-custom space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Metadata Card */}
            <Card className="p-6 space-y-4 border-l-4 border-l-[#187B28]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#187B28] shrink-0 mt-0.5" />
                  <div>
                    <Muted>Date</Muted>
                    <span className="font-bold text-slate-900">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#187B28] shrink-0 mt-0.5" />
                  <div>
                    <Muted>Time</Muted>
                    <span className="font-bold text-slate-900">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#187B28] shrink-0 mt-0.5" />
                  <div>
                    <Muted>Location</Muted>
                    <span className="font-bold text-slate-900">{event.location}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Event Description & Overview */}
            <section className="space-y-3">
              <SectionTitleBlock title="Event Description & Overview" />
              <Card className="p-6 space-y-3">
                <Text className="text-slate-700 leading-relaxed font-medium">
                  {event.description}
                </Text>
                <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <Muted>Organizer</Muted>
                    <span className="font-bold text-slate-900">{event.organizer}</span>
                  </div>
                  <div>
                    <Muted>Target Audience</Muted>
                    <span className="font-bold text-slate-900">{event.targetAudience}</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* Timetable Agenda (if available) */}
            {event.agenda && event.agenda.length > 0 && (
              <section className="space-y-3">
                <SectionTitleBlock title="Event Program & Timetable Agenda" />
                <Card className="p-6 space-y-4">
                  <div className="space-y-3">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 bg-slate-50 border border-slate-200 rounded text-xs">
                        <span className="font-bold text-[#187B28] font-mono shrink-0 w-20">
                          {item.time}
                        </span>
                        <span className="font-medium text-slate-800">{item.item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            )}

            {/* Participation Guidance Alert */}
            <Alert type="info" title="Attendance & Registration Guidance">
              <p className="text-xs text-slate-700 leading-relaxed">
                {event.registrationNote}
              </p>
            </Alert>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Live Stream / Registration Action Box */}
            <Card className="p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Event Access Portal
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Video className="w-4 h-4 text-[#187B28] shrink-0" />
                  <span className="font-medium">Live Stream Available on Official Channels</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href="https://ypgvote.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      YPG Official Platform
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            {/* Related Events */}
            <Card className="p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Other Upcoming Events
              </h4>
              <div className="space-y-4">
                {relatedEvents.map((rel) => (
                  <div key={rel.id} className="space-y-1 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <Badge variant="neutral">{rel.category}</Badge>
                    <h5 className="font-bold text-xs text-[#181818] hover:text-[#187B28] leading-snug">
                      <Link to={`/events/${rel.id}`}>{rel.title}</Link>
                    </h5>
                    <Muted className="text-[10px]">{rel.date}</Muted>
                  </div>
                ))}
              </div>
            </Card>

            <Link to="/events" className="block">
              <Button variant="outline" size="sm" className="w-full" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Back to All Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
