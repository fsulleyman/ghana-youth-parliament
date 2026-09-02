import { useState, useMemo, type FC } from "react";
import { FileText, Download, Grid, List, CheckCircle2, ShieldCheck } from "lucide-react";
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
  Tabs,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  Text,
  Muted,
} from "@/components/ui";
import {
  MOCK_RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_FILE_TYPES,
} from "@/services/mock-data";

export const ResourceCentrePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [selectedFileType, setSelectedFileType] = useState("All File Types");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const featuredResources = MOCK_RESOURCES.filter((r) => r.featured);

  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter((res) => {
      const matchesSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All Categories" || res.category === activeCategory;
      const matchesFileType =
        selectedFileType === "All File Types" || res.fileType === selectedFileType;

      return matchesSearch && matchesCategory && matchesFileType;
    });
  }, [searchQuery, activeCategory, selectedFileType]);

  const categoryTabs = RESOURCE_CATEGORIES.map((cat) => ({
    id: cat,
    label: cat,
    count:
      cat === "All Categories"
        ? MOCK_RESOURCES.length
        : MOCK_RESOURCES.filter((r) => r.category === cat).length,
  }));

  const handleDownload = (resourceTitle: string) => {
    setDownloadNotification(`Preparing download: "${resourceTitle}"`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Official Resource Centre"
        description="Access parliamentary standing orders, election guides, policy papers, annual reports, and official forms."
        breadcrumbs={[{ label: "Resource Centre" }]}
        badge={
          <Badge variant="accent" icon={<FileText className="w-3.5 h-3.5" />}>
            Document Library
          </Badge>
        }
      />

      <div className="container-custom space-y-10">
        {/* Download Notification Callout */}
        {downloadNotification && (
          <Alert type="success" title="Download Triggered" className="animate-fade-in shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{downloadNotification}</span>
            </div>
          </Alert>
        )}

        {/* Featured Documents Spotlight */}
        {featuredResources.length > 0 && !searchQuery && activeCategory === "All Categories" && (
          <section className="space-y-4">
            <h3 className="text-base font-bold text-[#187B28] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#187B28]" /> Featured Official Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredResources.map((res) => (
                <Card key={res.id} className="p-6 space-y-4 border-l-4 border-l-[#187B28] bg-slate-50/60">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">{res.category}</Badge>
                    <span className="text-xs font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {res.version}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-[#181818]">{res.title}</h4>
                    <Text className="text-xs text-slate-600 leading-relaxed">
                      {res.description}
                    </Text>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <Muted>{res.fileType} • {res.fileSize} • {res.publishDate}</Muted>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                      onClick={() => handleDownload(res.title)}
                    >
                      Download PDF
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Category Tabs, File Type Select, Search & View Toggle */}
        <section className="space-y-6">
          <div className="p-4 bg-white border border-slate-200 rounded-md shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <Tabs
                tabs={categoryTabs}
                activeTab={activeCategory}
                onTabChange={(tabId: string) => setActiveCategory(tabId)}
                className="border-b-0"
              />

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Select
                  value={selectedFileType}
                  onChange={(e) => setSelectedFileType(e.target.value)}
                  className="sm:w-48"
                >
                  {RESOURCE_FILE_TYPES.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </Select>

                <SearchInput
                  placeholder="Search document title or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs w-full"
                />

                <div className="flex items-center gap-1 border border-slate-200 rounded p-1 bg-slate-50 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded text-xs cursor-pointer transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#187B28] text-white font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded text-xs cursor-pointer transition-colors ${
                      viewMode === "table"
                        ? "bg-[#187B28] text-white font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="Table View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>
                Showing <span className="font-bold text-slate-900">{filteredResources.length}</span> documents
              </span>
              {(activeCategory !== "All Categories" || selectedFileType !== "All File Types" || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory("All Categories");
                    setSelectedFileType("All File Types");
                    setSearchQuery("");
                  }}
                  className="text-[#187B28] font-bold hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* View Mode 1: Grid Cards */}
          {viewMode === "grid" && (
            <div>
              {filteredResources.length === 0 ? (
                <div className="inst-card p-12 text-center space-y-3">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No documents found</h3>
                  <Muted>Try adjusting your search query or format filter.</Muted>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((res) => (
                    <Card key={res.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors border-t-4 border-t-[#187B28]">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="accent">{res.category}</Badge>
                          <span className="text-[11px] font-mono text-slate-500 font-semibold">{res.version}</span>
                        </div>

                        <h3 className="font-bold text-base text-[#181818] leading-snug">{res.title}</h3>

                        <Text className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {res.description}
                        </Text>
                      </CardContent>

                      <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                        <Muted>{res.fileType} • {res.fileSize}</Muted>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Download className="w-3.5 h-3.5" />}
                          onClick={() => handleDownload(res.title)}
                        >
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* View Mode 2: Data Table */}
          {viewMode === "table" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.length === 0 ? (
                  <TableEmpty colSpan={6}>
                    No document resources found matching your search.
                  </TableEmpty>
                ) : (
                  filteredResources.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="font-bold text-[#187B28]">{res.title}</TableCell>
                      <TableCell><Badge variant="outline">{res.category}</Badge></TableCell>
                      <TableCell className="text-xs text-slate-600">{res.fileType}</TableCell>
                      <TableCell className="text-xs font-mono text-slate-600">{res.fileSize}</TableCell>
                      <TableCell className="text-xs text-slate-600">{res.publishDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Download className="w-3.5 h-3.5" />}
                          onClick={() => handleDownload(res.title)}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </section>
      </div>
    </div>
  );
};
