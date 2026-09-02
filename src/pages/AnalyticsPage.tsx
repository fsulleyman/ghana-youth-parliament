import { useState, type FC } from "react";
import { BarChart3, Download, Users, FileText, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  SectionTitleBlock,
  Text,
  Muted,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";

const REGIONAL_METRICS = [
  { region: "Ashanti Region", mps: 47, coverage: "100%", initiatives: 18 },
  { region: "Greater Accra Region", mps: 27, coverage: "100%", initiatives: 14 },
  { region: "Eastern Region", mps: 33, coverage: "100%", initiatives: 11 },
  { region: "Central Region", mps: 23, coverage: "100%", initiatives: 9 },
  { region: "Western Region", mps: 17, coverage: "100%", initiatives: 8 },
  { region: "Volta Region", mps: 18, coverage: "100%", initiatives: 7 },
  { region: "Northern Region", mps: 18, coverage: "100%", initiatives: 6 },
  { region: "Upper East Region", mps: 15, coverage: "100%", initiatives: 5 },
];

const COMMITTEE_PRODUCTIVITY = [
  { name: "Committee on Youth Employment & Skills", sittings: 14, reports: 6, resolutions: 4 },
  { name: "Committee on Education, Science & Tech", sittings: 12, reports: 5, resolutions: 3 },
  { name: "Committee on Environment & Climate Action", sittings: 10, reports: 4, resolutions: 3 },
  { name: "Committee on Gender, Children & Social Protection", sittings: 9, reports: 4, resolutions: 2 },
  { name: "Committee on Constitutional & Legal Affairs", sittings: 8, reports: 3, resolutions: 2 },
];

export const AnalyticsPage: FC = () => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const triggerExport = (format: string) => {
    setDownloadNotice(`Official 2026 Transparency Report (${format}) exported successfully.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Parliamentary Analytics & Transparency Dashboard"
        description="Empirical metrics on youth representation, regional coverage, parliamentary committee outputs, and civic engagement statistics."
        breadcrumbs={[{ label: "Analytics & Reporting" }]}
        badge={
          <Badge variant="accent" icon={<BarChart3 className="w-3.5 h-3.5" />}>
            Institutional Transparency
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* Export Notification */}
        {downloadNotice && (
          <Alert type="success" title="Report Generated" className="animate-fade-in">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
          </Alert>
        )}

        {/* High-Level KPI Summary Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-[#187B28] space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Constituency Coverage</span>
              <Users className="w-4 h-4 text-[#187B28]" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">275 / 275</div>
            <Muted className="text-xs">100% Parliamentary Coverage</Muted>
          </Card>

          <Card className="p-6 border-l-4 border-l-[#F9C511] space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Gender Representation</span>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">48% F / 52% M</div>
            <Muted className="text-xs">High Gender Equity Ratio</Muted>
          </Card>

          <Card className="p-6 border-l-4 border-l-[#187B28] space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Resolutions Tabled</span>
              <FileText className="w-4 h-4 text-[#187B28]" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">34</div>
            <Muted className="text-xs">Passed in Plenary Sittings</Muted>
          </Card>

          <Card className="p-6 border-l-4 border-l-emerald-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Public Engagement</span>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">14,250+</div>
            <Muted className="text-xs">Digital Petition Signatures</Muted>
          </Card>
        </section>

        {/* Demographic & Gender Representation */}
        <section className="space-y-6">
          <SectionTitleBlock title="Youth MP Demographic & Gender Distribution" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h4 className="font-bold text-sm text-[#187B28]">Gender Breakdown in Chamber</h4>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Female Youth MPs (132 MPs)</span>
                    <span className="font-mono text-[#187B28]">48%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#187B28] w-[48%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Male Youth MPs (143 MPs)</span>
                    <span className="font-mono text-amber-700">52%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F9C511] w-[52%]" />
                  </div>
                </div>
              </div>

              <Text className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                The Ghana Youth Parliament enforces progressive 40%+ minimum gender inclusion rules across all 275 constituency delegations.
              </Text>
            </Card>

            <Card className="p-6 space-y-4">
              <h4 className="font-bold text-sm text-[#187B28]">Age Bracket Breakdown</h4>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>15 - 20 Years (Secondary & Tertiary Students)</span>
                    <span className="font-mono text-slate-800">22%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-700 w-[22%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>21 - 27 Years (Young Professionals & Graduates)</span>
                    <span className="font-mono text-slate-800">54%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#187B28] w-[54%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>28 - 35 Years (Community Leaders & Entrepreneurs)</span>
                    <span className="font-mono text-slate-800">24%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[24%]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Regional Coverage Distribution */}
        <section className="space-y-6">
          <SectionTitleBlock title="Regional Representation & Initiative Distribution" />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Administrative Region</TableHead>
                <TableHead>Youth MPs Count</TableHead>
                <TableHead>Constituency Coverage</TableHead>
                <TableHead className="text-right">Active Ground Initiatives</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REGIONAL_METRICS.map((reg, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-bold text-[#187B28]">{reg.region}</TableCell>
                  <TableCell className="font-mono text-slate-800">{reg.mps} MPs</TableCell>
                  <TableCell><Badge variant="accent">{reg.coverage}</Badge></TableCell>
                  <TableCell className="text-right font-mono font-bold text-slate-900">{reg.initiatives}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Committee Productivity Output */}
        <section className="space-y-6">
          <SectionTitleBlock title="Parliamentary Committee Productivity Index" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {COMMITTEE_PRODUCTIVITY.map((comm, idx) => (
              <Card key={idx} className="p-4 space-y-2 border-t-4 border-t-[#187B28] flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#181818] leading-snug">{comm.name}</h5>
                </div>
                <div className="pt-2 text-[11px] space-y-1 text-slate-600 border-t border-slate-100 font-mono">
                  <div className="flex justify-between"><span>Sittings:</span> <span className="font-bold">{comm.sittings}</span></div>
                  <div className="flex justify-between"><span>Reports:</span> <span className="font-bold">{comm.reports}</span></div>
                  <div className="flex justify-between"><span>Resolutions:</span> <span className="font-bold text-[#187B28]">{comm.resolutions}</span></div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Download Transparency Report Action Bar */}
        <Card className="p-8 bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-[#187B28]">Download Official Institutional Transparency Report</h4>
            <Text className="text-xs text-slate-600">
              Export verified statistical datasets on youth representation, attendance logs, and committee outputs.
            </Text>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => triggerExport("CSV Dataset")}
            >
              Export CSV
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => triggerExport("PDF Report")}
            >
              Export PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
