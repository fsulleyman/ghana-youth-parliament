import { useState, useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { Users, ArrowRight, Grid, List, ShieldCheck } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  PageHeaderBanner,
  SearchInput,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  Muted,
  Alert,
} from "@/components/ui";
import {
  MOCK_YOUTH_MPS,
  GHANA_REGIONS,
  PARLIAMENTARY_COMMITTEES,
} from "@/services/mock-data";

export const YouthMpsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedCommittee, setSelectedCommittee] = useState("All Committees");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Current" | "Past">("All");
  const [onlyLeadership, setOnlyLeadership] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredMps = useMemo(() => {
    return MOCK_YOUTH_MPS.filter((mp) => {
      const matchesSearch =
        mp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mp.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mp.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === "All Regions" || mp.region === selectedRegion;
      const matchesCommittee =
        selectedCommittee === "All Committees" || mp.committee === selectedCommittee;
      const matchesStatus =
        selectedStatus === "All" || mp.status === selectedStatus;
      const matchesLeadership = !onlyLeadership || Boolean(mp.isLeadership);

      return matchesSearch && matchesRegion && matchesCommittee && matchesStatus && matchesLeadership;
    });
  }, [searchQuery, selectedRegion, selectedCommittee, selectedStatus, onlyLeadership]);

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Youth Members of Parliament"
        description="Directory of verified Current and Past Youth MPs representing constituencies across all 16 regions of Ghana."
        breadcrumbs={[{ label: "Youth MPs" }]}
        badge={
          <Badge variant="accent" icon={<Users className="w-3.5 h-3.5" />}>
            Parliamentary Assembly (16 Members)
          </Badge>
        }
      />

      <div className="container-custom space-y-6">
        {/* Sample Content Disclaimer Notice */}
        <Alert type="info" title="Sample Content — For Development & Demonstration Only">
          <p className="text-xs text-slate-700 leading-relaxed">
            All profile records below feature invented names, fictional constituency assignments, and brand-colored initials-based avatar placeholders to prevent pairing real individuals' likenesses with fabricated parliamentary biographies.
          </p>
        </Alert>

        {/* Search, Status, Region, Committee, and View Toggle Controls */}
        <div className="p-4 bg-white border border-slate-200 rounded-md shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <SearchInput
                placeholder="Search MP by name, constituency, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as "All" | "Current" | "Past")}
                className="sm:w-36"
              >
                <option value="All">All Statuses</option>
                <option value="Current">Current MPs (12)</option>
                <option value="Past">Past MPs (4)</option>
              </Select>
              <Select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="sm:w-44"
              >
                {GHANA_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
              <Select
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
                className="sm:w-52"
              >
                {PARLIAMENTARY_COMMITTEES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyLeadership}
                  onChange={(e) => setOnlyLeadership(e.target.checked)}
                  className="rounded border-slate-300 text-[#187B28] focus:ring-[#187B28]"
                />
                <span>Leadership Only</span>
              </label>

              <div className="flex items-center gap-1 border border-slate-200 rounded p-1 bg-slate-50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer transition-colors ${
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
                  className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer transition-colors ${
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

          <div className="text-xs text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>
              Showing <span className="font-bold text-slate-900">{filteredMps.length}</span> Youth MPs
            </span>
            {(selectedRegion !== "All Regions" || selectedCommittee !== "All Committees" || selectedStatus !== "All" || searchQuery || onlyLeadership) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("All Regions");
                  setSelectedCommittee("All Committees");
                  setSelectedStatus("All");
                  setOnlyLeadership(false);
                }}
                className="text-[#187B28] font-bold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* View Mode 1: Grid Cards View */}
        {viewMode === "grid" && (
          <div>
            {filteredMps.length === 0 ? (
              <div className="inst-card p-12 text-center space-y-3">
                <Users className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Youth MPs found</h3>
                <Muted>Try adjusting your search query or filter criteria.</Muted>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMps.map((mp) => (
                  <Card key={mp.id} className="overflow-hidden flex flex-col justify-between hover:border-[#187B28] transition-colors">
                    <div className="relative bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                      {/* Initials-based avatar graphic placeholder */}
                      <img
                        src={mp.photoUrl}
                        alt={mp.fullName}
                        className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-sm bg-[#187B28]"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                        {mp.status === "Current" ? (
                          <Badge variant="primary">Current MP</Badge>
                        ) : (
                          <Badge variant="neutral">Past MP</Badge>
                        )}
                      </div>
                      {mp.isLeadership && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="accent">{mp.leadershipTitle}</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div>
                        <h3 className="font-bold text-sm text-[#187B28]">{mp.fullName}</h3>
                        <p className="text-xs font-semibold text-slate-800">
                          {mp.constituency}
                        </p>
                        <Muted className="text-[11px]">{mp.region} Region</Muted>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Committee Assignment:
                        </span>
                        <span className="text-[11px] text-slate-800 line-clamp-1">{mp.committee}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 bg-slate-50 border-t border-slate-100">
                      <Badge variant="neutral" icon={<ShieldCheck className="w-3 h-3 text-[#187B28]" />}>
                        Verified MP
                      </Badge>
                      <Link to={`/mps/${mp.id}`}>
                        <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Profile
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Data Table View */}
        {viewMode === "table" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Youth MP Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Constituency</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Committee Assignment</TableHead>
                <TableHead>Leadership</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMps.length === 0 ? (
                <TableEmpty colSpan={7}>
                  No Youth MPs found matching your filter criteria.
                </TableEmpty>
              ) : (
                filteredMps.map((mp) => (
                  <TableRow key={mp.id}>
                    <TableCell className="font-bold text-[#187B28]">{mp.fullName}</TableCell>
                    <TableCell>
                      {mp.status === "Current" ? (
                        <Badge variant="primary">Current</Badge>
                      ) : (
                        <Badge variant="neutral">Past</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{mp.constituency}</TableCell>
                    <TableCell><Badge variant="outline">{mp.region}</Badge></TableCell>
                    <TableCell className="text-slate-700 text-xs">{mp.committee}</TableCell>
                    <TableCell>
                      {mp.isLeadership ? (
                        <Badge variant="accent">{mp.leadershipTitle}</Badge>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/mps/${mp.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};
