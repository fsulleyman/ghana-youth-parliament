import { useState, useMemo, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Users,
  MapPin,
  Calendar,
  PlusCircle,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  PageHeaderBanner,
  SearchInput,
  Select,
  Input,
  FormField,
  Text,
  Muted,
} from "@/components/ui";
import {
  MOCK_ACTIVITIES,
  GHANA_REGIONS,
  ACTIVITY_CATEGORIES,
  MOCK_YOUTH_MPS,
} from "@/services/mock-data";

export const ActivitiesPage: FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [activitySubmitted, setActivitySubmitted] = useState(false);

  const filteredActivities = useMemo(() => {
    return MOCK_ACTIVITIES.filter((act) => {
      const matchesRegion =
        selectedRegion === "All Regions" || act.region === selectedRegion;
      const matchesCategory =
        selectedCategory === "All Categories" || act.category === selectedCategory;
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.mpName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.constituency.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRegion && matchesCategory && matchesSearch;
    });
  }, [selectedRegion, selectedCategory, searchQuery]);

  const handleActivitySubmit = (e: FormEvent) => {
    e.preventDefault();
    setActivitySubmitted(true);
    setTimeout(() => {
      setShowSubmitForm(false);
      setActivitySubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Youth MP Activities & Initiatives"
        description="Ground initiatives, skills workshops, civic outreach, and community projects led by Youth Members of Parliament across Ghana."
        breadcrumbs={[{ label: "Activities & Initiatives" }]}
        badge={
          <Badge variant="accent" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Grassroots Outreach
          </Badge>
        }
      />

      <div className="container-custom space-y-10">
        {/* Impact Metrics Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-[#187B28] bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#187B28] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 font-mono">1,250+</div>
              <Muted className="text-xs font-semibold uppercase tracking-wider">Total Youth Reached</Muted>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-[#F9C511] bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 font-mono">14</div>
              <Muted className="text-xs font-semibold uppercase tracking-wider">Workshops Conducted</Muted>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-[#187B28] bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#187B28] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 font-mono">16 Regions</div>
              <Muted className="text-xs font-semibold uppercase tracking-wider">Constituency Coverage</Muted>
            </div>
          </Card>
        </section>

        {/* Filter Controls & MP Submission Trigger */}
        <section className="space-y-6">
          <div className="p-4 bg-white border border-slate-200 rounded-md shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <Select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="sm:w-48"
                >
                  {GHANA_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Select>

                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="sm:w-48"
                >
                  {ACTIVITY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>

                <SearchInput
                  placeholder="Search activity title, MP, or constituency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs w-full"
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                onClick={() => setShowSubmitForm(!showSubmitForm)}
                className="shrink-0"
              >
                {showSubmitForm ? "Close Form" : "Log MP Activity"}
              </Button>
            </div>

            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>
                Showing <span className="font-bold text-slate-900">{filteredActivities.length}</span> initiatives
              </span>
              {(selectedRegion !== "All Regions" || selectedCategory !== "All Categories" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedRegion("All Regions");
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

          {/* MP Log Activity Form */}
          {showSubmitForm && (
            <Card className="p-6 bg-slate-50 border-2 border-[#187B28] space-y-4">
              <h4 className="font-bold text-sm text-[#187B28] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Log New Constituency MP Activity / Project
              </h4>

              {activitySubmitted ? (
                <Alert type="success" title="Activity Logged Successfully">
                  The initiative has been submitted to the Parliamentary Communications Secretariat for verification and publishing.
                </Alert>
              ) : (
                <form onSubmit={handleActivitySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Activity Title" required>
                      <Input required placeholder="e.g. Subin Youth Career Seminar" />
                    </FormField>

                    <FormField label="Reporting Youth MP" required>
                      <Select required>
                        {MOCK_YOUTH_MPS.map((mp) => (
                          <option key={mp.id} value={mp.id}>
                            {mp.fullName} ({mp.constituency})
                          </option>
                        ))}
                      </Select>
                    </FormField>

                    <FormField label="Initiative Category" required>
                      <Select required>
                        {ACTIVITY_CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </FormField>

                    <FormField label="Estimated Youth Reached" required>
                      <Input required placeholder="e.g. 250+" />
                    </FormField>
                  </div>

                  <FormField label="Project Summary & Impact Report" required>
                    <textarea
                      required
                      rows={3}
                      placeholder="Detail the location, agenda items, key outcomes, and partner organizations..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#187B28]"
                    />
                  </FormField>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="sm">
                      Submit Activity Record
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          )}

          {/* Activities Cards Grid */}
          {filteredActivities.length === 0 ? (
            <div className="inst-card p-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No initiatives found</h3>
              <Muted>Try clearing your region or category filters.</Muted>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((act) => (
                <Card key={act.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors border-t-4 border-t-[#187B28]">
                  {act.photoUrl && (
                    <div className="relative h-44 overflow-hidden border-b border-slate-100 bg-slate-100">
                      <img src={act.photoUrl} alt={act.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="accent">{act.category}</Badge>
                      </div>
                    </div>
                  )}

                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <Badge variant="outline">{act.region}</Badge>
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#187B28]" /> {act.date}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#181818] leading-snug">{act.title}</h3>

                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#187B28]" />
                        <span className="font-bold text-slate-900">{act.mpName}</span>
                      </div>
                      <Link to={`/constituencies/${act.constituencyId}`} className="text-[#187B28] font-semibold hover:underline">
                        {act.constituency}
                      </Link>
                    </div>

                    <Text className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {act.description}
                    </Text>
                  </CardContent>

                  <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#187B28] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Reached {act.youthReached} Youth
                    </span>
                    <Link to={`/mps/${act.youthMpId}`}>
                      <Button variant="outline" size="sm">
                        View Youth MP Profile
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
