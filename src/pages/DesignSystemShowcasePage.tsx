import { useState, type FC } from "react";
import {
  Button,
  H1,
  H2,
  H3,
  Lead,
  Text,
  Muted,
  Input,
  SearchInput,
  Textarea,
  Select,
  FormField,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Dialog,
  Breadcrumbs,
  Tabs,
  PaginationControls,
  PageHeaderBanner,
  SectionTitleBlock,
} from "@/components/ui";
import { Vote, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const DesignSystemShowcasePage: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-10 pb-16">
      <PageHeaderBanner
        title="Institutional Design System"
        description="Comprehensive official UI component library adhering strictly to institutional credibility, accessibility, and human product design principles."
        breadcrumbs={[{ label: "Design System Showcase" }]}
        badge={
          <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Official UI Library — Phase 2
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* Breadcrumbs Navigation Showcase */}
        <section className="space-y-2">
          <SectionTitleBlock
            title="Breadcrumb Navigation"
            subtitle="Standard accessible breadcrumbs for hierarchical page location awareness."
          />
          <div className="p-4 bg-white border border-slate-200 rounded-md">
            <Breadcrumbs
              items={[
                { label: "Parliamentary Directory", href: "/mps" },
                { label: "Youth MPs", href: "/mps" },
                { label: "Hon. Representative Profile" },
              ]}
            />
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Button Variants & Sizes"
            subtitle="Action-oriented institutional buttons with loading states and icon integration."
          />
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Green CTA</Button>
            <Button variant="accent">Ghana Gold Accent</Button>
            <Button variant="secondary">Secondary Slate</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Destructive Red</Button>
            <Button variant="primary" leftIcon={<Vote className="w-4 h-4 text-[#F9C511]" />}>
              With Left Icon
            </Button>
            <Button variant="accent" rightIcon={<ArrowRight className="w-4 h-4" />}>
              With Right Icon
            </Button>
            <Button variant="primary" isLoading>
              Loading State
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="primary" size="sm">Small (Sm)</Button>
            <Button variant="primary" size="md">Medium (Md)</Button>
            <Button variant="primary" size="lg">Large (Lg)</Button>
          </div>
        </section>

        {/* Typography Section */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Typography Hierarchy"
            subtitle="Restrained institutional typography scale for clear reading flow."
          />
          <div className="inst-card p-6 space-y-4">
            <H1>Heading 1 — Ghana Youth Parliament</H1>
            <H2>Heading 2 — Institutional Transparency</H2>
            <H3>Heading 3 — Representative Directory</H3>
            <Lead>
              Lead Paragraph — Serving young leaders, Youth MPs, constituencies, and democratic institutions across Ghana.
            </Lead>
            <Text>
              Body Text — Official public information, engagement, news, documents, and youth participation.
            </Text>
            <Muted>
              Muted Caption — Last updated: 1st September 2026. Official source notice.
            </Muted>
          </div>
        </section>

        {/* Form Controls Section */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Form Controls & Inputs"
            subtitle="Accessible form elements with validation and search filters."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 inst-card p-6">
            <FormField label="Full Name" required helperText="Enter official full name as on national ID.">
              <Input placeholder="e.g. Kwame Mensah" />
            </FormField>

            <FormField label="Constituency Region" required>
              <Select defaultValue="greater_accra">
                <option value="greater_accra">Greater Accra Region</option>
                <option value="ashanti">Ashanti Region</option>
                <option value="western">Western Region</option>
                <option value="northern">Northern Region</option>
              </Select>
            </FormField>

            <FormField label="Global Search Filter" className="md:col-span-2">
              <SearchInput placeholder="Search Youth MPs, constituencies, news, resources..." />
            </FormField>

            <FormField label="Public Feedback Submission" required error="Feedback text must be at least 10 characters." className="md:col-span-2">
              <Textarea placeholder="Share your suggestions or feedback with Youth Parliament..." />
            </FormField>
          </div>
        </section>

        {/* Badges & Status Indicators */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Badges & Status Tags"
            subtitle="Official categorizations and parliamentary status tags."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              Active Youth MP
            </Badge>
            <Badge variant="accent">Ghana Gold Tag</Badge>
            <Badge variant="warning">Pending Review</Badge>
            <Badge variant="error">Archived Statement</Badge>
            <Badge variant="neutral">Constituency #104</Badge>
            <Badge variant="dark">Super Admin</Badge>
            <Badge variant="outline">Document (PDF)</Badge>
          </div>
        </section>

        {/* Callout Alerts Section */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Alerts & Callouts"
            subtitle="Institutional warnings, notices, and external platform integration alerts."
          />
          <div className="space-y-3">
            <Alert type="info" title="Official Notice">
              This platform provides information, communication, representation, and activity tracking for the Ghana Youth Parliament.
            </Alert>
            <Alert type="warning" title="External Election System Notice">
              Election registration, candidate management, and voting are handled exclusively on the official YPG Vote platform.
            </Alert>
            <Alert type="important" title="Security & Authentication">
              Role-based authorization is enforced. Public user submissions undergo moderation before publication.
            </Alert>
            <Alert type="error" title="Input Validation Error">
              Please correct the highlighted fields before submitting your question to Parliament.
            </Alert>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Card Layouts"
            subtitle="Restrained cards for information grouping."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Constituency Hub</CardTitle>
                <CardDescription>Explore representation across regions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Browse regional boundaries, local Youth MPs, and constituency-level parliamentary initiatives.</p>
              </CardContent>
              <CardFooter>
                <Badge variant="primary">275 Constituencies</Badge>
                <Button variant="outline" size="sm">Explore</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Centre</CardTitle>
                <CardDescription>Official publications & rules.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Download parliamentary standing orders, constitution guidelines, policy papers, and annual reports.</p>
              </CardContent>
              <CardFooter>
                <Badge variant="accent">PDF / Docs</Badge>
                <Button variant="outline" size="sm">Access</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Youth MP Directory</CardTitle>
                <CardDescription>Official member profiles.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>View verified representative profiles, biographies, parliamentary committees, and public statements.</p>
              </CardContent>
              <CardFooter>
                <Badge variant="neutral">Verified Profiles</Badge>
                <Button variant="outline" size="sm">View MPs</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Tables & Navigation Section */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Data Tables & Tabs"
            subtitle="Institutional tabular listings and pagination navigation."
          />
          <Tabs
            tabs={[
              { id: "all", label: "All Constituencies", count: 275 },
              { id: "accra", label: "Greater Accra", count: 34 },
              { id: "ashanti", label: "Ashanti", count: 47 },
              { id: "western", label: "Western", count: 17 },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Constituency</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Youth MP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold text-[#187B28]">Ayawaso West Wuogon</TableCell>
                <TableCell>Greater Accra</TableCell>
                <TableCell>Hon. Sample Youth MP 1</TableCell>
                <TableCell><Badge variant="primary">Active</Badge></TableCell>
                <TableCell className="text-right"><Button variant="outline" size="sm">View Profile</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-[#187B28]">Subin</TableCell>
                <TableCell>Ashanti</TableCell>
                <TableCell>Hon. Sample Youth MP 2</TableCell>
                <TableCell><Badge variant="primary">Active</Badge></TableCell>
                <TableCell className="text-right"><Button variant="outline" size="sm">View Profile</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <PaginationControls currentPage={page} totalPages={5} onPageChange={setPage} />
        </section>

        {/* Modal Dialog Interactive Demo */}
        <section className="space-y-4">
          <SectionTitleBlock
            title="Accessible Dialog / Modal"
            subtitle="Interactive modal trigger for confirmation and preview workflows."
          />
          <Button variant="accent" onClick={() => setModalOpen(true)}>
            Open Confirmation Dialog Demo
          </Button>

          <Dialog
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Official Submission Review"
            description="Please confirm your question submission before sending to the Youth Parliament moderation workflow."
            footer={
              <>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Confirm & Submit
                </Button>
              </>
            }
          >
            <p>
              Your submission will be queued securely in the moderation workflow for administrative approval. Email addresses and private metadata will not be published publicly.
            </p>
          </Dialog>
        </section>
      </div>
    </div>
  );
};
