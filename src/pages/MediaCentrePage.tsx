import { useState, type FC, type FormEvent } from "react";
import {
  Camera,
  Video,
  Download,
  Send,
  CheckCircle2,
  Image as ImageIcon,
  Palette,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  PageHeaderBanner,
  Tabs,
  Input,
  FormField,
  Text,
  Muted,
  SectionTitleBlock,
} from "@/components/ui";
import { MOCK_MEDIA_ITEMS } from "@/services/mock-data";

export const MediaCentrePage: FC = () => {
  const [activeMediaTab, setActiveMediaTab] = useState("all");
  const [accreditationSubmitted, setAccreditationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mediaHouse: "",
    email: "",
    phone: "",
    badgeNumber: "",
    purpose: "",
  });

  const mediaTabs = [
    { id: "all", label: "All Media Assets", count: MOCK_MEDIA_ITEMS.length },
    { id: "photo", label: "Photo Archive", count: MOCK_MEDIA_ITEMS.filter((m) => m.type === "photo").length },
    { id: "video", label: "Video Broadcasts", count: MOCK_MEDIA_ITEMS.filter((m) => m.type === "video").length },
    { id: "statement", label: "Press Statements", count: MOCK_MEDIA_ITEMS.filter((m) => m.type === "statement").length },
  ];

  const filteredMedia = MOCK_MEDIA_ITEMS.filter(
    (item) => activeMediaTab === "all" || item.type === activeMediaTab
  );

  const handleAccreditationSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAccreditationSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Official Media Centre"
        description="Central press hub for journalists, media archives, official brand assets, and press accreditation."
        breadcrumbs={[{ label: "Media Centre" }]}
        badge={
          <Badge variant="accent" icon={<Camera className="w-3.5 h-3.5" />}>
            Press & Media Hub
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* Official Brand Assets & Logo Download Section */}
        <section className="space-y-4">
          <SectionTitleBlock title="Official Brand Kit & Press Assets" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Downloads Box */}
            <Card className="p-6 space-y-4 border-t-4 border-t-[#187B28] col-span-1 md:col-span-2 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded p-2 flex items-center justify-center shrink-0 shadow-2xs">
                  <img src="/brand/logo.png" alt="Ghana Youth Parliament Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#181818]">Official Youth Parliament Crest & Logo</h3>
                  <p className="text-xs text-slate-600">High-resolution institutional logo for accredited media publications.</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3 text-xs">
                <a href="/brand/logo.png" download="Ghana_Youth_Parliament_Logo.png">
                  <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download PNG (High-Res)
                  </Button>
                </a>
                <a href="/brand/logo.png" download="Ghana_Youth_Parliament_Logo_Vector.png">
                  <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download Vector Asset
                  </Button>
                </a>
              </div>
            </Card>

            {/* Brand Colors Swatch Box */}
            <Card className="p-6 space-y-3 border-t-4 border-t-[#F9C511]">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#187B28]" /> Official Brand Palette
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#187B28] inline-block border border-slate-300"></span>
                    <span className="font-medium text-slate-800">Primary Green</span>
                  </div>
                  <span className="font-mono font-bold text-[#187B28]">#187B28</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#F9C511] inline-block border border-slate-300"></span>
                    <span className="font-medium text-slate-800">Ghana Gold</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">#F9C511</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#DC0B10] inline-block border border-slate-300"></span>
                    <span className="font-medium text-slate-800">Brand Red</span>
                  </div>
                  <span className="font-mono font-bold text-[#DC0B10]">#DC0B10</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Press Releases & Media Gallery Tabs */}
        <section className="space-y-6">
          <SectionTitleBlock title="Press Releases & Media Gallery" />

          <Tabs
            tabs={mediaTabs}
            activeTab={activeMediaTab}
            onTabChange={(tabId: string) => setActiveMediaTab(tabId)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors border-t-4 border-t-[#187B28]">
                {item.url.startsWith("http") && (
                  <div className="relative h-44 overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="accent" icon={item.type === "photo" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}>
                        {item.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <Badge variant="outline">{item.category}</Badge>
                    <Muted>{item.date}</Muted>
                  </div>

                  <h4 className="font-bold text-sm text-[#181818] leading-snug">{item.title}</h4>

                  {item.description && (
                    <Text className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </Text>
                  )}
                </CardContent>

                <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Muted>{item.type === "video" ? "Video Broadcast" : "High-Res Image"}</Muted>
                  <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Press Accreditation Request Form */}
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <SectionTitleBlock title="Journalist Press Accreditation Request" />

          {accreditationSubmitted ? (
            <Alert type="success" title="Accreditation Application Submitted" className="p-6">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" /> Application Received
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Thank you for submitting your accreditation request. The Parliamentary Communications Bureau will review your credentials and issue press passes prior to the upcoming plenary sitting.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAccreditationSubmitted(false);
                    setFormData({
                      fullName: "",
                      mediaHouse: "",
                      email: "",
                      phone: "",
                      badgeNumber: "",
                      purpose: "",
                    });
                  }}
                  className="mt-2"
                >
                  Submit Another Request
                </Button>
              </div>
            </Alert>
          ) : (
            <Card className="p-8 space-y-6">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-[#187B28]">Media Accreditation Form</h4>
                <Text className="text-xs text-slate-600">
                  Journalists and media representatives seeking official entry credentials to plenary sittings must submit this form.
                </Text>
              </div>

              <form onSubmit={handleAccreditationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Journalist Full Name" required>
                    <Input
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Media Organization / House" required>
                    <Input
                      required
                      placeholder="e.g. Ghana Broadcasting Corporation (GBC)"
                      value={formData.mediaHouse}
                      onChange={(e) => setFormData({ ...formData, mediaHouse: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Official Work Email" required>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. k.mensah@gbc.gh"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Contact Phone Number" required>
                    <Input
                      type="tel"
                      required
                      placeholder="e.g. +233 24 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </FormField>
                </div>

                <FormField label="National Press Badge / License ID Number">
                  <Input
                    placeholder="e.g. GJA-2026-889"
                    value={formData.badgeNumber}
                    onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
                  />
                </FormField>

                <FormField label="Coverage Purpose & Event Request" required>
                  <textarea
                    required
                    rows={3}
                    placeholder="Specify the upcoming plenary sitting or committee hearing you intend to cover..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#187B28]"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  />
                </FormField>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Submit Press Accreditation Request
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};
