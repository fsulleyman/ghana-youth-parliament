import { useState, type FC, type FormEvent } from "react";
import {
  PlusCircle,
  Trash2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  Tabs,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Input,
  Select,
  FormField,
  Muted,
} from "@/components/ui";
import {
  MOCK_NEWS,
  MOCK_EVENTS,
  MOCK_RESOURCES,
  MOCK_PETITIONS,
  NEWS_CATEGORIES,
  EVENT_CATEGORIES,
  RESOURCE_CATEGORIES,
  type MockNewsArticle,
  type MockEvent,
  type MockResource,
  type MockPetition,
} from "@/services/mock-data";
import { useAuth } from "@/context/AuthContext";

export const AdminCmsPage: FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("news");

  // CMS Datasets
  const [newsList, setNewsList] = useState<MockNewsArticle[]>(MOCK_NEWS);
  const [eventsList, setEventsList] = useState<MockEvent[]>(MOCK_EVENTS);
  const [resourcesList, setResourcesList] = useState<MockResource[]>(MOCK_RESOURCES);
  const [petitionsList, setPetitionsList] = useState<MockPetition[]>(MOCK_PETITIONS);

  // Form States
  const [newsForm, setNewsForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Parliamentary Sessions",
    author: "Secretariat Desk",
    imageUrl: "",
    featured: false,
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    category: "Parliamentary Plenary",
    date: "",
    time: "10:00 AM - 02:00 PM",
    location: "Main Chamber, Parliament House",
    status: "upcoming" as const,
    description: "",
    organizer: "Parliamentary Secretariat",
    targetAudience: "All Youth MPs & Public Observers",
    registrationNote: "Official attendance registration required.",
  });

  const [resourceForm, setResourceForm] = useState({
    title: "",
    category: "Standing Orders & Rules",
    fileType: "PDF Document",
    fileSize: "2.1 MB",
    version: "v2026.1",
    description: "",
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handlers
  const handleAddNews = (e: FormEvent) => {
    e.preventDefault();
    const newArticle: MockNewsArticle = {
      id: `news-${Date.now()}`,
      title: newsForm.title,
      summary: newsForm.summary,
      content: newsForm.content,
      category: newsForm.category,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      readTime: "3 min read",
      author: newsForm.author,
      imageUrl: newsForm.imageUrl || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800",
      featured: newsForm.featured,
    };
    setNewsList([newArticle, ...newsList]);
    setNewsForm({
      title: "",
      summary: "",
      content: "",
      category: "Parliamentary Sessions",
      author: "Secretariat Desk",
      imageUrl: "",
      featured: false,
    });
    showFeedback("News article published successfully to public feed.");
  };

  const handleDeleteNews = (id: string) => {
    setNewsList(newsList.filter((n) => n.id !== id));
    showFeedback("News article removed.");
  };

  const handleAddEvent = (e: FormEvent) => {
    e.preventDefault();
    const newEvt: MockEvent = {
      id: `event-${Date.now()}`,
      ...eventForm,
    };
    setEventsList([newEvt, ...eventsList]);
    setEventForm({
      title: "",
      category: "Parliamentary Plenary",
      date: "",
      time: "10:00 AM - 02:00 PM",
      location: "Main Chamber, Parliament House",
      status: "upcoming",
      description: "",
      organizer: "Parliamentary Secretariat",
      targetAudience: "All Youth MPs & Public Observers",
      registrationNote: "Official attendance registration required.",
    });
    showFeedback("New event published to Parliamentary Calendar.");
  };

  const handleDeleteEvent = (id: string) => {
    setEventsList(eventsList.filter((e) => e.id !== id));
    showFeedback("Event removed.");
  };

  const handleAddResource = (e: FormEvent) => {
    e.preventDefault();
    const newRes: MockResource = {
      id: `res-${Date.now()}`,
      ...resourceForm,
      publishDate: new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    };
    setResourcesList([newRes, ...resourcesList]);
    setResourceForm({
      title: "",
      category: "Standing Orders & Rules",
      fileType: "PDF Document",
      fileSize: "2.1 MB",
      version: "v2026.1",
      description: "",
    });
    showFeedback("Resource document uploaded to Resource Centre library.");
  };

  const handleDeleteResource = (id: string) => {
    setResourcesList(resourcesList.filter((r) => r.id !== id));
    showFeedback("Resource document removed.");
  };

  const handlePetitionStatusChange = (id: string, newStatus: MockPetition["status"]) => {
    setPetitionsList(
      petitionsList.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    showFeedback(`Petition status updated to: ${newStatus}`);
  };

  const cmsTabs = [
    { id: "news", label: "News CMS", count: newsList.length },
    { id: "events", label: "Events CMS", count: eventsList.length },
    { id: "resources", label: "Resources CMS", count: resourcesList.length },
    { id: "petitions", label: "Petitions Moderation", count: petitionsList.length },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Parliamentary Secretariat Admin CMS"
        description="Central administrative dashboard for publishing news, managing events, uploading official resources, and moderating public petitions."
        breadcrumbs={[{ label: "Admin CMS" }]}
        badge={
          <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Authenticated: {user?.title || "Secretariat Staff"}
          </Badge>
        }
      />

      <div className="container-custom space-y-10">
        {/* Feedback Alert */}
        {notification && (
          <Alert type="success" title="CMS Action Processed" className="animate-fade-in shadow-xs">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{notification}</span>
            </div>
          </Alert>
        )}

        {/* Dashboard Metrics Overview */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 space-y-1 border-l-4 border-l-[#187B28]">
            <Muted className="text-xs uppercase font-semibold">News Articles</Muted>
            <div className="text-2xl font-bold text-slate-900 font-mono">{newsList.length}</div>
          </Card>

          <Card className="p-5 space-y-1 border-l-4 border-l-[#F9C511]">
            <Muted className="text-xs uppercase font-semibold">Calendar Events</Muted>
            <div className="text-2xl font-bold text-slate-900 font-mono">{eventsList.length}</div>
          </Card>

          <Card className="p-5 space-y-1 border-l-4 border-l-[#187B28]">
            <Muted className="text-xs uppercase font-semibold">Library Documents</Muted>
            <div className="text-2xl font-bold text-slate-900 font-mono">{resourcesList.length}</div>
          </Card>

          <Card className="p-5 space-y-1 border-l-4 border-l-amber-600">
            <Muted className="text-xs uppercase font-semibold">Public Petitions</Muted>
            <div className="text-2xl font-bold text-slate-900 font-mono">{petitionsList.length}</div>
          </Card>
        </section>

        {/* Sub-Navigation Tabs */}
        <section className="space-y-6">
          <Tabs
            tabs={cmsTabs}
            activeTab={activeTab}
            onTabChange={(tabId: string) => setActiveTab(tabId)}
          />

          {/* TAB 1: NEWS ARTICLES CMS */}
          {activeTab === "news" && (
            <div className="space-y-8">
              <Card className="p-6 bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-[#187B28] flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" /> Publish New News Article
                </h4>

                <form onSubmit={handleAddNews} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Article Title" required>
                      <Input
                        required
                        placeholder="e.g. Plenary Passes Resolution on TVET Grants"
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      />
                    </FormField>

                    <FormField label="News Category" required>
                      <Select
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      >
                        {NEWS_CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Author / Secretariat Bureau">
                      <Input
                        placeholder="e.g. Communications Bureau"
                        value={newsForm.author}
                        onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Cover Image URL">
                      <Input
                        placeholder="https://images.unsplash.com/photo-..."
                        value={newsForm.imageUrl}
                        onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                      />
                    </FormField>
                  </div>

                  <FormField label="Short Summary Snippet" required>
                    <textarea
                      required
                      rows={2}
                      placeholder="Brief headline summary for card preview..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white"
                      value={newsForm.summary}
                      onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Full Article Body Content" required>
                    <textarea
                      required
                      rows={4}
                      placeholder="Full editorial text content..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white"
                      value={newsForm.content}
                      onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    />
                  </FormField>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsForm.featured}
                        onChange={(e) => setNewsForm({ ...newsForm, featured: e.target.checked })}
                        className="accent-[#187B28]"
                      />
                      <span>Mark as Featured Lead Story</span>
                    </label>

                    <Button type="submit" variant="primary" size="sm">
                      Publish Article
                    </Button>
                  </div>
                </form>
              </Card>

              {/* News Articles Management Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newsList.map((art) => (
                    <TableRow key={art.id}>
                      <TableCell className="font-bold text-[#187B28]">
                        {art.title} {art.featured && <Badge variant="accent" className="ml-2">Featured</Badge>}
                      </TableCell>
                      <TableCell><Badge variant="outline">{art.category}</Badge></TableCell>
                      <TableCell className="text-xs text-slate-600">{art.author}</TableCell>
                      <TableCell className="text-xs text-slate-[#181818]">{art.date}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="danger"
                          size="sm"
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                          onClick={() => handleDeleteNews(art.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* TAB 2: EVENTS CMS */}
          {activeTab === "events" && (
            <div className="space-y-8">
              <Card className="p-6 bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-[#187B28] flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" /> Add Event to Parliamentary Calendar
                </h4>

                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Event Title" required>
                      <Input
                        required
                        placeholder="e.g. 2026 Fourth Quarter Plenary Sitting"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Event Category" required>
                      <Select
                        value={eventForm.category}
                        onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      >
                        {EVENT_CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField label="Event Date" required>
                      <Input
                        required
                        placeholder="e.g. 18 November 2026"
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Time Schedule">
                      <Input
                        value={eventForm.time}
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Event Status">
                      <Select
                        value={eventForm.status}
                        onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </Select>
                    </FormField>
                  </div>

                  <FormField label="Location / Chamber Venue" required>
                    <Input
                      required
                      placeholder="e.g. Main Chamber, Parliament House, Accra"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Event Description" required>
                    <textarea
                      required
                      rows={3}
                      placeholder="Summary of agenda items and objectives..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white"
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    />
                  </FormField>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="sm">
                      Publish Calendar Event
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Events Management Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsList.map((evt) => (
                    <TableRow key={evt.id}>
                      <TableCell className="font-bold text-[#181818]">{evt.title}</TableCell>
                      <TableCell><Badge variant="accent">{evt.category}</Badge></TableCell>
                      <TableCell className="text-xs text-slate-600">{evt.date}</TableCell>
                      <TableCell className="text-xs text-slate-600">{evt.location}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="danger"
                          size="sm"
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                          onClick={() => handleDeleteEvent(evt.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* TAB 3: RESOURCES CMS */}
          {activeTab === "resources" && (
            <div className="space-y-8">
              <Card className="p-6 bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-[#187B28] flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" /> Upload Resource Document
                </h4>

                <form onSubmit={handleAddResource} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Document Title" required>
                      <Input
                        required
                        placeholder="e.g. Standing Orders Amendment 2026"
                        value={resourceForm.title}
                        onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Category" required>
                      <Select
                        value={resourceForm.category}
                        onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
                      >
                        {RESOURCE_CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField label="File Format">
                      <Input
                        value={resourceForm.fileType}
                        onChange={(e) => setResourceForm({ ...resourceForm, fileType: e.target.value })}
                      />
                    </FormField>

                    <FormField label="File Size">
                      <Input
                        value={resourceForm.fileSize}
                        onChange={(e) => setResourceForm({ ...resourceForm, fileSize: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Version Code">
                      <Input
                        value={resourceForm.version}
                        onChange={(e) => setResourceForm({ ...resourceForm, version: e.target.value })}
                      />
                    </FormField>
                  </div>

                  <FormField label="Document Description" required>
                    <textarea
                      required
                      rows={2}
                      placeholder="Brief overview of document scope..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white"
                      value={resourceForm.description}
                      onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                    />
                  </FormField>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="sm">
                      Upload Document Record
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Resources Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resourcesList.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="font-bold text-[#187B28]">{res.title}</TableCell>
                      <TableCell><Badge variant="outline">{res.category}</Badge></TableCell>
                      <TableCell className="text-xs text-slate-600">{res.fileType}</TableCell>
                      <TableCell className="text-xs font-mono text-slate-600">{res.version}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="danger"
                          size="sm"
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                          onClick={() => handleDeleteResource(res.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* TAB 4: PETITIONS MODERATION */}
          {activeTab === "petitions" && (
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Petition Title</TableHead>
                    <TableHead>Target Committee</TableHead>
                    <TableHead>Signatures</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Moderation Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {petitionsList.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell className="font-bold text-[#181818]">{pet.title}</TableCell>
                      <TableCell><Badge variant="accent">{pet.committee}</Badge></TableCell>
                      <TableCell className="text-xs font-mono text-slate-600 font-bold">
                        {pet.signaturesCount.toLocaleString()} / {pet.targetSignatures.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={pet.status === "Open for Support" ? "primary" : pet.status === "Adopted" ? "accent" : "warning"}>
                          {pet.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {pet.status !== "Open for Support" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePetitionStatusChange(pet.id, "Open for Support")}
                          >
                            Open for Voting
                          </Button>
                        )}
                        {pet.status !== "Under Committee Review" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handlePetitionStatusChange(pet.id, "Under Committee Review")}
                          >
                            Refer to Committee
                          </Button>
                        )}
                        {pet.status !== "Adopted" && (
                          <Button
                            variant="accent"
                            size="sm"
                            onClick={() => handlePetitionStatusChange(pet.id, "Adopted")}
                          >
                            Adopt Resolution
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
