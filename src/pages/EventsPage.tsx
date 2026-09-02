import { useState, useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, UserCheck } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  PageHeaderBanner,
  SearchInput,
  Select,
  Tabs,
  Text,
  Muted,
} from "@/components/ui";
import { MOCK_EVENTS, EVENT_CATEGORIES } from "@/services/mock-data";

export const EventsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const statusTabs = [
    { id: "all", label: "All Events", count: MOCK_EVENTS.length },
    { id: "upcoming", label: "Upcoming", count: MOCK_EVENTS.filter((e) => e.status === "upcoming").length },
    { id: "ongoing", label: "Ongoing", count: MOCK_EVENTS.filter((e) => e.status === "ongoing").length },
    { id: "completed", label: "Completed", count: MOCK_EVENTS.filter((e) => e.status === "completed").length },
  ];

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        activeStatus === "all" || evt.status === activeStatus;
      const matchesCategory =
        selectedCategory === "All Categories" || evt.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, activeStatus, selectedCategory]);

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Events & Programmes"
        description="Official sittings, committee hearings, leadership summits, and regional youth forums."
        breadcrumbs={[{ label: "Events & Programmes" }]}
        badge={
          <Badge variant="accent" icon={<Calendar className="w-3.5 h-3.5" />}>
            Parliamentary Calendar
          </Badge>
        }
      />

      <div className="container-custom space-y-8">
        {/* Status Tabs, Category Select, and Search Bar */}
        <div className="p-4 bg-white border border-slate-200 rounded-md shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <Tabs
              tabs={statusTabs}
              activeTab={activeStatus}
              onTabChange={(tabId: string) => setActiveStatus(tabId)}
              className="border-b-0"
            />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="sm:w-56"
              >
                {EVENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              <SearchInput
                placeholder="Search events by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs w-full"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>
              Showing <span className="font-bold text-slate-900">{filteredEvents.length}</span> events
            </span>
            {(activeStatus !== "all" || selectedCategory !== "All Categories" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveStatus("all");
                  setSelectedCategory("All Categories");
                  setSearchQuery("");
                }}
                className="text-[#187B28] font-bold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="inst-card p-12 text-center space-y-3">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No events found</h3>
            <Muted>Try adjusting your search criteria or status filter.</Muted>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <Card key={evt.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors border-t-4 border-t-[#187B28]">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">{evt.category}</Badge>
                    <Badge
                      variant={
                        evt.status === "upcoming"
                          ? "primary"
                          : evt.status === "ongoing"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {evt.status === "upcoming"
                        ? "Upcoming"
                        : evt.status === "ongoing"
                        ? "Ongoing"
                        : "Completed"}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-base text-[#181818] leading-snug">
                    <Link to={`/events/${evt.id}`} className="hover:text-[#187B28]">
                      {evt.title}
                    </Link>
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#187B28] shrink-0" />
                      <span className="font-medium text-slate-800">{evt.date}</span>
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

                  <Text className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {evt.description}
                  </Text>
                </CardContent>

                <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-[#187B28]" /> {evt.organizer}
                  </span>
                  <Link to={`/events/${evt.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
